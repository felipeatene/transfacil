import { describe, expect, it } from 'vitest';
import { authorizeRide, initialAccount, validateRide, type Account, type ValidationInput } from './domain';

const account = (): Account => structuredClone(initialAccount);
const input = (overrides: Partial<ValidationInput> = {}): ValidationInput => ({
  personId: 'holder-demo', line: '5104', identity: 'match', presence: true, ...overrides,
});

describe('regras do embarque de demonstração', () => {
  it('permite titular em todas as linhas conhecidas sem lista individual', () => {
    for (const line of ['5104', '4102', '8207']) {
      expect(validateRide(account(), input({ line })).approved).toBe(true);
    }
  });

  it('limita convidado à linha autorizada', () => {
    expect(validateRide(account(), input({ personId: 'guest-demo' })).approved).toBe(true);
    expect(validateRide(account(), input({ personId: 'guest-demo', line: '4102' })).reasonCode).toBe('line-not-authorized');
  });

  it('aplica revogação imediatamente, inclusive ao titular', () => {
    const revoked = account();
    revoked.people[0].enabled = false;
    expect(validateRide(revoked, input()).reasonCode).toBe('person-disabled');
  });

  it('bloqueia todos os perfis quando a conta está desativada', () => {
    const disabled = { ...account(), enabled: false };
    for (const personId of ['holder-demo', 'guest-demo']) {
      expect(validateRide(disabled, input({ personId })).reasonCode).toBe('account-disabled');
    }
  });

  it('rejeita perfil ou linha desconhecidos', () => {
    expect(validateRide(account(), input({ personId: 'missing' })).reasonCode).toBe('person-not-found');
    expect(validateRide(account(), input({ line: '9999' })).reasonCode).toBe('unknown-line');
  });

  it.each([
    [{ identity: 'mismatch' }, 'identity-mismatch'],
    [{ identity: 'unavailable' }, 'identity-unavailable'],
    [{ presence: false }, 'presence-required'],
  ] as const)('nega identidade/presença não confirmada: %j', (override, reasonCode) => {
    expect(validateRide(account(), input(override)).reasonCode).toBe(reasonCode);
  });

  it('aceita saldo exato e nega saldo insuficiente ou inválido', () => {
    expect(authorizeRide({ ...account(), balance: 5 }, input()).account.balance).toBe(0);
    for (const balance of [4.99, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(validateRide({ ...account(), balance }, input()).reasonCode).toBe('insufficient-balance');
    }
  });

  it('debita uma tarifa fictícia somente em aprovação, sem mutar a conta', () => {
    const original = account();
    const before = structuredClone(original);
    const success = authorizeRide(original, input());
    expect(success.account.balance).toBe(30);
    expect(original).toEqual(before);
    success.account.people[0].lines.push('4102');
    expect(original).toEqual(before);
    const denied = authorizeRide(original, input({ identity: 'mismatch' }));
    expect(denied.account.balance).toBe(35);
  });
});
