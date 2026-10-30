import { lines, type Account } from './domain';

/** Registro de um teste de embarque já exibido no laboratório. */
export interface RideRecord {
  name: string;
  line: string;
  approved: boolean;
  reason: string;
}

export interface CaseArticleInput {
  account: Account;
  history: RideRecord[];
  date: Date;
}

const money = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/\u00a0/g, ' ');

const script = [
  'Simular um embarque do titular em qualquer linha do catálogo.',
  'Selecionar um convidado em uma linha ainda não autorizada e observar a negativa sem débito.',
  'Autorizar essa linha e repetir o teste.',
  'Revogar a autorização ou desligar a conta e conferir a negativa imediata.',
  'Testar identidade diferente, presença ausente e saldo insuficiente.',
];

function profileLine(person: Account['people'][number]): string {
  const role = person.role === 'holder' ? 'titular' : 'convidado';
  const status = person.enabled ? 'ativo' : 'revogado';
  const access = person.role === 'holder'
    ? 'todas as linhas da demonstração'
    : person.lines.length > 0
      ? `linhas ${person.lines.join(', ')}`
      : 'nenhuma linha autorizada';
  return `- ${person.name} (${role}, ${status}): ${access}.`;
}

function historySection(history: RideRecord[]): string {
  if (history.length === 0) {
    const steps = script.map((step, index) => `${index + 1}. ${step}`).join('\n');
    return [
      '## Testes registrados',
      '',
      'Esta sessão ainda não registrou embarques. O roteiro sugerido para o case é:',
      '',
      steps,
    ].join('\n');
  }
  const items = history.map((ride, index) => {
    const outcome = ride.approved ? 'aprovado' : 'negado';
    return `${index + 1}. ${ride.name} · linha ${ride.line} — ${outcome}. ${ride.reason}`;
  });
  return ['## Testes registrados', '', ...items].join('\n');
}

/** Monta o artigo do case em Markdown a partir do estado fictício da sessão. */
export function composeCaseArticle({ account, history, date }: CaseArticleInput): string {
  const when = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  const facial = account.enabled ? 'disponível' : 'desativado';
  return [
    '# Case: embarque facial sem cartão físico',
    '',
    `Publicado em ${when} a partir de uma sessão de demonstração.`,
    '',
    '> Demonstração independente. Identidade, presença e tarifa são simuladas. Sem vínculo oficial com Transfácil ou Tacom. Nenhuma biometria é processada e este texto não descreve reconhecimento facial real.',
    '',
    '## Contexto',
    '',
    'O case explora uma proposta de embarque associada ao rosto, para o passageiro não depender de portar um cartão físico. Os personagens, as permissões e os créditos existem só nesta demonstração. A câmera, quando ligada, mostra apenas uma prévia local e não analisa imagem.',
    '',
    '## O que a sessão mostrou',
    '',
    `- Embarque facial da conta: ${facial}.`,
    `- Saldo fictício ao gerar o artigo: ${money(account.balance)}.`,
    `- Catálogo de exemplo: ${lines.join(', ')}. Tarifa ilustrativa de R$ 5,00 por embarque autorizado.`,
    '',
    ...account.people.map(profileLine),
    '',
    historySection(history),
    '',
    '## O que este case não prova',
    '',
    'A identidade confirmada, a presença e a prova de vida são escolhas da simulação. Um sorriso na prévia da câmera não identifica ninguém. O protótipo não emite bilhete, não cobra valor real e não abre catraca. Cartão ou QR code permanecem alternativas conceituais em um serviço real.',
    '',
  ].join('\n');
}
