# Especificação — réplica BHBUS+ e validador Tacom

Data: 2026-10-30 · Estado: implementação em andamento

## Objetivo
Reproduzir a composição visual das referências fornecidas pelo usuário e inserir
uma proposta de embarque facial no padrão existente. Esta feature substitui a
direção visual original da demo, mantendo suas regras de negócio. Não é um redesign
da marca ou do aplicativo e não representa um aplicativo oficial.

## Evidência e limite de fidelidade
O usuário forneceu capturas de home e LGPD do app e fotografia frontal do validador.
Neste checkout, os arquivos das imagens não estão disponíveis: as medidas, cores
e textos abaixo derivam da descrição encaminhada pelo agente principal. A entrega
pode ser comparada estruturalmente com essa descrição, mas não deve ser apresentada
como comparação pixel a pixel ou como reprodução de assets oficiais extraídos.
Usar `Demo` em lugar do nome pessoal visível na referência. Não incorporar fotos
com terceiros, dados pessoais, links autenticados ou código do app oficial.

## Histórias e critérios de aceite

### US1 — Explorar o app no padrão da referência (P1)
- Home móvel tem cabeçalho laranja com BHBUS+ branco à esquerda e Demo à direita,
  fundo cinza claro, banner roxo e grade de três colunas.
- Preservar a ordem dos doze atalhos: QR Code, Favoritos, Cartões de crédito;
  Pontos de recarga, Linhas e estações, Rotas; Pontos de ônibus, Perguntas frequentes,
  Fale conosco; LGPD, Política de privacidade, Termos de uso.
- Acrescentar Embarque facial como atalho no mesmo padrão, sem reorganizar os doze.
- Rodapé apresenta símbolo t laranja e versão de referência 3.9.3.
- Atalhos não implementados identificam seu caráter demonstrativo, sem ações reais.

### US2 — Consultar a tela LGPD (P1)
- Abrir LGPD mostra cabeçalho roxo com voltar, conteúdo em cartão branco sobre cinza,
  texto informativo e endereço público lgpd@transfacil.com.br.
- Preservar botão Portal da privacidade e assinatura transfácil / movendo pessoas.
- O retorno à home é acessível por teclado e toque. Não enviar e-mail ou formulário.

### US3 — Gravar a apresentação do totem (P1)
- Gabinete cinza vertical com topo arqueado, moldura preta espessa e abertura circular
  acima da tela; tela com razão largura/altura próxima de 0,553.
- Tela preserva header de linha/estação, faixa QR com chamada TOQUE AQUI, área azul,
  tarifa de referência R$ 6,25, APRESENTE SEU CARTÃO, chevrons e assinatura TACOM.
- Acrescentar opção facial ao lado/na continuidade da opção QR sem apagar o fluxo QR.
- Oferecer modo gravação que prioriza somente app ou somente totem, com saída clara.
- A interface funciona em modo de apresentação mesmo se a API Fullscreen não existir.

### US4 — Manter a demonstração funcional (P1)
- Preservar titular em todas as linhas, convidado por linhas selecionadas, ativação,
  revogação imediata, saldo compartilhado fictício e ausência de débito na negativa.
- O resultado de identidade/presença continua sendo explicitamente simulado.
- Câmera é prévia local opcional; negar permissão permite continuar sem câmera.
- Sair da prévia/reiniciar interrompe a mídia e não captura ou transmite imagens.
- Os controles de gestão permanecem acessíveis fora do enquadramento de gravação.

## Requisitos
- FR201: composição home/LGPD conforme referência descrita; nova ação facial acrescida.
- FR202: gabinete e tela do totem respeitam proporções e zonas da foto frontal.
- FR203: modos apresentação app/totem com saída acessível e sem depender de Fullscreen.
- FR204: mecanismos da spec 001 permanecem operantes e testados.
- FR205: marca de demonstração independente permanece visível, inclusive em gravação.
- FR206: versão, data, textos de estação e tarifa da foto são dados de referência,
  não promessa de atualidade, preço oficial ou integração real.

## Fora do escopo
Biometria real, prova de vida, cobrança, catraca, QR válido, autenticação oficial,
backend, envio de dados e comprovação de compatibilidade com equipamento Tacom.

## Sucesso verificável
Abrir home, consultar LGPD, voltar, abrir embarque facial, cadastrar convidado,
validar/recusar conforme linhas, revogar e repetir. Alternar enquadramento app/totem,
abrir opção QR/facial e retornar sem perder estado. Build, testes de domínio e
fluxos de interface passam; capturas desktop/móvel não apresentam overflow.
