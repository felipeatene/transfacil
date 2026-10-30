# Plano — réplica das referências

## Abordagem
Preservar React/TypeScript/Vite e domínio puro da feature 001. Substituir apenas a
apresentação anterior por superfícies explícitas: app de referência, tela LGPD,
acréscimo facial e representação do totem físico. Estado de conta e decisão de
embarque são compartilhados pela demonstração; câmera não determina aprovação.

## Separação
- App de referência: header, banner, grade, rodapé e navegação local LGPD/facial/QR.
- Totem: gabinete CSS e tela em proporção fixa, com zonas da foto frontal.
- Controles da demo: gestão de pessoas/permissões/saldo e cenário simulado existentes.
- Apresentação: estado de enquadramento normal/app/totem; Fullscreen é melhoria
  progressiva, nunca requisito para retornar à navegação.

## Sequência
1. Registrar spec e spike; manter workflows existentes, especialmente Pages.
2. Reproduzir app/LGPD e totem a partir das descrições, sem inventar nova direção.
3. Conectar opções facial/QR e manter regras funcionais anteriores.
4. Acrescentar modos gravação e tratamento de câmera/saída.
5. Verificar domínio, TypeScript/build e fluxos de interface.
6. Capturar desktop/móvel; revisar composição com limite de evidência explícito.
7. Atualizar documentação e publicar PR ligada à issue de réplica.

## Validação
Testes de regras da feature 001 devem continuar passando. E2E deve percorrer
home → LGPD → voltar, facial/QR, permissão de convidado, revogação, troca de modo
e saída, falha de câmera e reset. Conferir nomes longos, foco e overflow móvel.
Preservar workflow Pages sem alterações incidentais.
