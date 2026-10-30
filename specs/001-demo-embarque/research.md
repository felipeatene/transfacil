# Pesquisa e decisões

## Fontes e grau de certeza
1. Transcrição fornecida pelo usuário em 2026-10-30: fonte da ideia, da linha 5104,
   do cadastro de convidados e do desafio de sorriso. É intenção de produto,
   não evidência de capacidade de hardware ou regras da operadora.
2. [Spec Kit — README atual](https://github.com/github/spec-kit/blob/main/README.md),
   consultado via conector GitHub em 2026-10-30: instalação com `uv tool install
   specify-cli`; inicialização com `--integration`; fluxo SDD constitution,
   specify, plan, tasks, implement e converge.

## Decisões
| Questão | Decisão da demo | Motivo |
| --- | --- | --- |
| Identificação | Cenário explicitamente simulado | Sem backend ou avaliação biométrica |
| Câmera | Prévia local opcional | Demonstra contexto sem coletar biometria |
| CPF | Omitido | Identificador não autentica e não é necessário na demo |
| Convidados | Permissão por linha | Reflete a ideia sem depender de veículo físico |
| Titular | Todas as linhas quando ativo | Recomendação alinhada à transcrição |
| Saldo | Compartilhado e fictício | Permite demonstrar débito e negação |
| Vale-transporte | Pesquisa futura | Regras legais e tarifárias não foram verificadas |

## Limitações ainda não resolvidas
- Modelo e versão do equipamento Tacom; lente, resolução e acesso à câmera.
- SDK, API, credenciais, conectividade, atualização remota e homologação.
- Políticas tarifárias reais e possibilidade de compartilhar créditos.
- Precisão em ônibus em movimento, contraluz, noite e diferentes usuários.
- Resistência a foto, vídeo, replay e máscaras; sorriso sozinho não resolve isso.
- Requisitos de LGPD para dados biométricos sensíveis, retenção, exclusão,
  base legal e alternativas acessíveis. Não são avaliados por esta demo.

## Próxima investigação de hardware
Obter foto sem pessoas nem identificadores sensíveis e identificação do modelo;
pedir documentação oficial e acesso autorizado de teste à operadora/fornecedor;
validar câmera e orçamento de processamento; medir latência e comportamento
offline; só então projetar piloto controlado. Não assumir câmera de QR acessível.
