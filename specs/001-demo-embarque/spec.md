# Especificação — Sorria, seu caminho começa aqui

Status: especificação da demo · Data: 2026-10-30

## Problema e objetivo
Demonstrar como um passageiro poderia administrar uma credencial de embarque
associada ao rosto sem depender de portar cartão físico. A demo permite explorar
cadastro, delegação e revogação com dados fictícios e um validador simulado.
Ela não prova viabilidade biométrica nem compatibilidade com ônibus reais.

## Histórias e critérios de aceite

### US1 — Gerenciar minha credencial (P1)
Como titular, quero ativar e desativar minha credencial para controlar seu uso.
- Dado um titular ativo, embarque em qualquer linha do catálogo pode ser aprovado
  se houver saldo e o cenário de identidade simulado for válido.
- Ao desativar o acesso, a tentativa seguinte é negada, sem débito.
- O cadastro pede apenas nome de personagem fictício e cria estado utilizável.

### US2 — Autorizar um convidado (P1)
Como titular, quero cadastrar um convidado e escolher suas linhas.
- Um convidado só embarca nas linhas expressamente selecionadas.
- Sem linha autorizada, ou após revogação, o embarque é negado sem débito.
- Editar permissões é refletido na próxima validação, sem recarregar a página.

### US3 — Demonstrar o validador (P1)
Como apresentador, quero selecionar passageiro, linha e resultado simulado de
identidade para mostrar aprovação e negação de embarque.
- Aprovação desconta exatamente uma tarifa fictícia do saldo compartilhado.
- Saldo insuficiente, identidade não confirmada ou presença simulada inválida
  nega a tentativa sem alterar saldo.
- Cada resultado informa seu motivo e está identificado como simulação.
- Reiniciar a demo restaura os personagens, permissões e saldo iniciais.

### US4 — Experimentar a câmera sem biometria (P2)
Como apresentador, quero uma prévia opcional para contextualizar o cenário.
- Permissão negada, dispositivo ausente ou API indisponível exibe orientação.
- A demonstração funciona sem câmera; prévia não determina identidade.
- Fechar/sair da prévia interrompe as faixas de mídia.
- Não há captura persistida nem upload de imagem.

## Requisitos funcionais
- FR01: aplicativo responsivo em português com identificação persistente de demo.
- FR02: cadastro de personagens fictícios e distinção titular/convidado.
- FR03: ativação, desativação e permissões por linha para convidados.
- FR04: catálogo inclui a linha 5104 citada na ideia; catálogo e tarifa são exemplos.
- FR05: validador testa as regras atuais e mostra resultado acessível.
- FR06: saldo em reais com arredondamento de duas casas no débito; recarga e débito exclusivamente fictícios.
- FR07: resultados rejeitados não alteram o saldo; sem múltiplos débitos involuntários
  durante uma mesma operação de validação.
- FR08: permitir reinício e explicar cartão/QR como alternativa conceitual.
- FR09: o laboratório gera um artigo em Markdown da sessão atual, com ou sem testes
  registrados, e permite copiar ou baixar o arquivo. O texto identifica a
  demonstração e não apresenta o resultado como reconhecimento facial real.

## Fora do escopo
Reconhecimento facial, prova de vida real, CPF, menores, pagamentos, emissão de
QR válido, integração Tacom/Transfácil, backend autenticado, gestão de vale-transporte,
controle de jornada, abertura de catraca e sincronização entre dispositivos.

## Decisões assumidas
Saldo compartilhado da conta para titular e convidados; tarifa única fictícia;
permissões por linha, não por veículo; uso empresarial fica para fase posterior.
Se persistência local for usada, armazena apenas estado fictício e permite reset.

## Sucesso verificável
Uma apresentação consegue cadastrar convidado, aprovar na 5104, negar em outra
linha, revogar, negar novamente e restaurar a demo. O mesmo fluxo opera sem câmera
e em viewport móvel, sem transmissão de imagens ou uso de dados pessoais reais.
A mesma sessão gera um artigo do case que pode ser copiado ou baixado, com a
simulação explícita.
