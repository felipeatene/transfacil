import { describe, expect, it } from 'vitest';
import { initialAccount, type Account } from './domain';
import { composeCaseArticle, type RideRecord } from './article';

const date = new Date('2026-10-30T15:00:00.000Z');

describe('artigo do case', () => {
  it('publica o case mesmo sem testes e deixa a simulação explícita', () => {
    const article = composeCaseArticle({ account: structuredClone(initialAccount), history: [], date });
    expect(article).toContain('# Case: embarque facial sem cartão físico');
    expect(article).toContain('30/10/2026');
    expect(article).toContain('Esta sessão ainda não registrou embarques');
    expect(article).toContain('não descreve reconhecimento facial real');
    expect(article).toContain('Alex Demo (titular, ativo)');
    expect(article).toContain('Jo Demo (convidado, ativo): linhas 5104');
    expect(article).toContain('R$ 35,00');
  });

  it('registra aprovações, negativas e revogação da sessão', () => {
    const account: Account = structuredClone(initialAccount);
    account.people[1].enabled = false;
    account.balance = 30;
    const history: RideRecord[] = [
      { name: 'Jo Demo', line: '5104', approved: false, reason: 'A autorização deste perfil foi revogada.' },
      { name: 'Alex Demo', line: '5104', approved: true, reason: 'Embarque simulado autorizado. Tarifa fictícia de R$ 5,00.' },
    ];
    const article = composeCaseArticle({ account, history, date });
    expect(article).toContain('1. Jo Demo · linha 5104 — negado. A autorização deste perfil foi revogada.');
    expect(article).toContain('2. Alex Demo · linha 5104 — aprovado. Embarque simulado autorizado.');
    expect(article).toContain('Jo Demo (convidado, revogado)');
    expect(article).toContain('R$ 30,00');
    expect(article).not.toContain('ainda não registrou embarques');
  });
});
