# Spike — limites da réplica e do validador

Data: 2026-10-30

## Perguntas
Como reproduzir as superfícies pedidas sem alterar o desenho existente? Quais
partes da foto são suficientes para representar um validador e quais exigiriam
hardware/documentação? Como gravar a demo sem confundir simulação com serviço real?

## Evidência disponível
Descrições das capturas app home/LGPD com dimensão 739×1600 e foto frontal do totem
576×1024, encaminhadas pelo agente principal. Nenhum arquivo de imagem está no
checkout; os agentes desta implementação não executaram comparação visual direta
com os originais. Não existe acesso a SDK/câmera do equipamento real.

## Mapa visual da referência
- Home: fundo #efedf2; header #ef511d; assinatura BHBUS+ branca; banner roxo;
  atalhos brancos arredondados em três colunas; ícones roxo escuro; versão 3.9.3.
- LGPD: header roxo com voltar; cartão branco sobre cinza; botão roxo; email público
  lgpd@transfacil.com.br; assinatura transfácil / movendo pessoas.
- Totem frontal: gabinete cinza de topo arqueado; abertura circular acima da tela;
  moldura preta espessa. Tela aproximada x112..466, y220..860 na foto 576×1024:
  354×640, razão 0,553. Header escuro y220..262; QR y262..365, cerca de 16% da tela;
  área azul y365..706, cerca de 53%; tarifa/instrução y706..829; marca/status y829..860.
- Header fotografado: 66-01 EST. VILARINH e 29.10.26 -15:47; QR com faixa amarelo
  limão #cced32 → vermelho rosado #d65c65; área azul contém marcas e cartões;
  tarifa R$ 6,25 e APRESENTE SEU CARTÃO; chevrons ciano e TACOM ao rodapé.

## Decisões
1. Reproduzir estrutura, proporção, cores e texto descritos, sem alegar fidelidade
   pixel a pixel ou inspeção dos arquivos originais.
2. Desenhar gabinete e zonas por CSS; não embutir fotografia com terceiros.
3. Usar nome Demo. Marcas e versão pertencem ao contexto da referência; a demo
   permanece identificada como independente.
4. Manter taxa do domínio como crédito fictício da demo. A tarifa R$ 6,25 da foto
   deve ser distinguida de tarifa oficial atual e de eventual débito simulado.
5. Modos gravação removem chrome externo desnecessário do enquadramento; mantêm
   identificação de simulação e controle de saída. Não exigem API Fullscreen.
6. QR é opção visual/conceitual sem emissão válida. Facial usa cenário explícito,
   sem inferência de identidade/presença a partir da câmera.

## Limites técnicos e próximas evidências
Fotografia não comprova acesso programático à câmera, capacidade de instalar
software, SDK/API, latência, operação offline ou aceitação tarifária. Antes de
piloto real, obter modelo exato e documentação oficial Tacom, autorização da
operadora, avaliação biométrica/prova de vida e análise da proteção de dados.
Detecção de sorriso isolada não comprova presença nem identidade.

## Critério de fechamento
Fluxos e enquadramentos funcionais, domínio preservado, build/testes reais
registrados e nenhuma afirmação de integração ou comparação visual não realizada.
