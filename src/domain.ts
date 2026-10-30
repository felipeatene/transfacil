/** Regras de uma demonstração: nenhuma identidade ou presença é aferida aqui. */
export interface Person {
  id: string;
  name: string;
  role: 'holder' | 'guest';
  enabled: boolean;
  lines: string[];
}

export interface Account {
  enabled: boolean;
  balance: number;
  people: Person[];
}

export interface ValidationInput {
  personId: string;
  line: string;
  identity: 'match' | 'mismatch' | 'unavailable';
  presence: boolean;
}

export type ReasonCode = 'approved' | 'account-disabled' | 'person-not-found' |
  'person-disabled' | 'unknown-line' | 'line-not-authorized' |
  'identity-unavailable' | 'identity-mismatch' | 'presence-required' | 'insufficient-balance';

export interface ValidationResult {
  approved: boolean;
  reason: string;
  reasonCode: ReasonCode;
}

export const fare = 5;
export const lines = ['5104', '4102', '8207'] as const;

export const initialAccount: Account = {
  enabled: true,
  balance: 35,
  people: [
    { id: 'holder-demo', name: 'Alex Demo', role: 'holder', enabled: true, lines: [] },
    { id: 'guest-demo', name: 'Jo Demo', role: 'guest', enabled: true, lines: ['5104'] },
  ],
};

const deny = (reasonCode: ReasonCode, reason: string): ValidationResult => ({
  approved: false, reasonCode, reason,
});

export function validateRide(account: Account, input: ValidationInput): ValidationResult {
  if (!account.enabled) return deny('account-disabled', 'Embarque facial desativado nesta conta.');
  const person = account.people.find(({ id }) => id === input.personId);
  if (!person) return deny('person-not-found', 'Perfil não encontrado. Selecione um perfil cadastrado.');
  if (!person.enabled) return deny('person-disabled', 'A autorização deste perfil foi revogada.');
  if (!(lines as readonly string[]).includes(input.line)) return deny('unknown-line', 'Linha indisponível nesta demonstração.');
  if (person.role === 'guest' && !person.lines.includes(input.line)) {
    return deny('line-not-authorized', 'Este convidado não tem autorização para esta linha.');
  }
  if (input.identity === 'unavailable') return deny('identity-unavailable', 'Identificação indisponível. Use uma alternativa de embarque.');
  if (input.identity !== 'match') return deny('identity-mismatch', 'Identidade não confirmada na simulação.');
  if (!input.presence) return deny('presence-required', 'Presença não confirmada na simulação.');
  if (!Number.isFinite(account.balance) || account.balance < fare) return deny('insufficient-balance', 'Saldo fictício insuficiente. Adicione créditos de demonstração.');
  return { approved: true, reasonCode: 'approved', reason: 'Embarque simulado autorizado. Tarifa fictícia de R$ 5,00.' };
}

export function authorizeRide(account: Account, input: ValidationInput): ValidationResult & { account: Account } {
  const result = validateRide(account, input);
  return {
    ...result,
    account: {
      ...account,
      balance: result.approved ? Math.round((account.balance - fare) * 100) / 100 : account.balance,
      people: account.people.map(person => ({ ...person, lines: [...person.lines] })),
    },
  };
}
