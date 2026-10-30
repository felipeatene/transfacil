# Plano técnico

## Arquitetura
SPA Vite + React + TypeScript. Componentes para conta, pessoas, permissões,
saldo e simulador. Módulo de domínio puro centraliza autorização e débito para
impedir divergência entre interface e validador. Estado de demonstração fica
no navegador; não há servidor, chave de API ou serviço biométrico.

## Modelo de dados
- Conta: saldo em reais com arredondamento de duas casas no débito e coleção de passageiros fictícios.
- Passageiro: id sintético, nome fictício, papel titular/convidado, ativo,
  conjunto de linhas autorizadas.
- Linha: identificador e rótulo de exemplo.
- Tentativa: passageiro, linha, confirmação de identidade e presença simuladas.
- Resultado: aprovado/negado, motivo e saldo resultante.

## Regra de validação
Verificar pessoa existente e ativa; verificar permissão da linha para convidado;
verificar identidade/presença simuladas; verificar saldo. Somente aprovação
produz débito de uma tarifa. O resultado deve ser calculado a partir do estado
mais recente. Trocas de contexto devem limpar resultados antigos da interface.

## Sequência de entrega
1. Estrutura e tokens visuais acessíveis.
2. Domínio e testes de cenários autorizados/negados.
3. Cadastro e gestão de permissões.
4. Simulador e saldo fictício.
5. Prévia opcional de câmera e alternativa sem câmera.
6. Verificação, roteiro público e limites conhecidos.

## Verificação
Testes: titular em linhas diferentes; convidado autorizado/não autorizado;
revogação; identidade/presença simuladas inválidas; saldo exato/insuficiente;
nenhum débito nas rejeições. Executar typecheck e build. Revisar em desktop e
móvel os fluxos de cadastro, permissão, resultado e câmera negada.

## Porta para pesquisa futura
Interface de identidade pode ser substituída futuramente por um adaptador,
mediante arquitetura própria de segurança. Não entregar um adaptador de câmera
como se fosse mecanismo de identidade. Integração real aguarda inventário Tacom,
autorização da operadora e avaliação de precisão, fraude, privacidade e operação.

## Constituição
Conforme: dados fictícios, simulação declarada, câmera opcional, regras testáveis,
sem cobrança real, sem marca oficial copiada e sem HTML autenticado no produto.
