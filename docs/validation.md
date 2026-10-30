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
