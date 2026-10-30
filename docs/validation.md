# Validação da entrega

Verificação realizada em 2026-10-30, nesta implementação.

- `npm test`: 10 testes de domínio passaram. Cobrem titular, linhas de convidados,
  revogação, conta desativada, identificadores desconhecidos, identidade/presença
  simuladas, saldo exato/insuficiente/inválido e débito somente em aprovação.
- `npm run build`: TypeScript e build Vite passaram.
- `npm run test:e2e`: 4 testes Playwright passaram com Chromium local indicado
  por `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. O download de um novo navegador
  encontrou restrição de rede; o navegador já disponível funcionou nos testes.
- Fluxo de interface conferido: débito, autorização por linha, revogação,
  cadastro, reinício e desativação global.
- Prévia de câmera negada foi simulada no navegador: aviso exibido e embarque
  simulado continuou disponível.
- Layouts em 1440×1100 e 390×844 foram capturados e conferidos sem overflow.
  A revisão corrigiu overflow de apelido longo e rótulos dos controles.
- Cadastro por teclado foi verificado com Enter, incluindo apelido de 32 caracteres.

As capturas de revisão ficam em `.impeccable/review/`. A infraestrutura Spec Kit
1.2.5 passou no script oficial `check-prerequisites.sh` com spec e tasks exigidos.

## Limites desta evidência
Não é auditoria completa de acessibilidade, teste em aparelho físico, prova de
vida ou validação biométrica. Câmera real e equipamentos Tacom não foram
homologados. Os resultados não demonstram autorização para operar bilhetagem real.
O fechamento foi revisado pelo agente; não representa execução automática do
comando `$speckit-converge`.

## Réplica BHBUS+ / totem — feature 002

- `npm test`: 10 testes de domínio aprovados, regras preservadas.
- `npm run test:e2e`: 8 testes aprovados com Chromium local. Incluem navegação home/LGPD, gestão facial, saldo/permissões/revogação, cartão/QR/facial no totem, entrada/saída gravação, câmera negada e nomes longos.
- `npm run build`: TypeScript e Vite aprovados.
- Capturas desktop 1440 e móvel 390 conferidas; sem overflow horizontal nos testes. Capturas específicas do app em gravação, LGPD e totem em gravação disponíveis localmente em `.impeccable/review/`, não versionadas.
- Revisão independente: SHIP no escopo de composição, navegação e legibilidade, sem correções obrigatórias.
- As imagens originais não estão no filesystem desta execução: logos, cartões e banner são aproximações CSS/tipográficas. Não houve comparação pixel a pixel, e não se afirma réplica exata.
- Workflow Pages e configuração Vite existentes foram preservados. Débito fictício R$ 5 permanece no domínio; R$ 6,25 é texto da referência física, distinção indicada no painel.
