# Transfácil · Laboratório de embarque

Demonstração independente de uma proposta de embarque facial. Não há vínculo oficial com Transfácil ou Tacom, biometria real, cobrança ou abertura de catraca.

## Executar

Requer Node.js 22.12+ (ou 24) e npm.

```sh
npm install
npm run dev
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

O app mantém apenas dados fictícios em memória. Recarregar ou reiniciar restaura a demonstração. A prévia opcional da câmera usa `getUserMedia` em localhost/HTTPS; não captura, armazena nem envia imagens. Identidade e presença são escolhas explícitas de simulação, independentes da câmera.

## Explorar

1. Simule um embarque do titular em qualquer linha.
2. Selecione Jo Demo na linha 4102 e confira a negativa.
3. Autorize 4102 para Jo e repita o teste.
4. Revogue a autorização ou desligue a conta e confira a negativa imediata.
5. Teste identidade diferente, presença ausente e saldo insuficiente.
6. Cadastre um apelido fictício ou adicione R$ 20 de créditos de demonstração.

A tarifa de R$ 5 é ilustrativa e o saldo é compartilhado pelos perfis. Não use dados reais.

## Planejamento

- [Constituição](.specify/memory/constitution.md)
- [Especificação](specs/001-demo-embarque/spec.md)
- [Plano técnico](specs/001-demo-embarque/plan.md)
- [Tarefas](specs/001-demo-embarque/tasks.md)
- [Limitações e pesquisa](specs/001-demo-embarque/research.md)
- [Status da instalação do Spec Kit](docs/spec-kit.md)
- [Roteiro da demonstração](docs/demo.md)

## Limitações

Sorrir não comprova identidade ou presença real. A compatibilidade do equipamento Tacom, APIs, políticas tarifárias, requisitos biométricos e operação offline dependem de pesquisa e autorização do fornecedor antes de qualquer piloto real. Cartão/QR code devem permanecer alternativas em um produto real; esta demo não os emite.

Para usar um Chromium já instalado, defina `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium` ao executar os testes de interface.

## Réplica BHBUS+ e validador

A interface inicial segue as composições descritas das referências do BHBUS+ e do equipamento Tacom. O novo tile **Embarque facial** abre os controles fictícios existentes. LGPD abre uma tela de referência; os demais serviços exibem avisos de demonstração.

Use **Gravar app** ou **Gravar totem** para ocultar os controles de apresentação. Os links diretos funcionam no GitHub Pages:

- `?view=app&record=1`: app isolado, largura adaptada ao celular.
- `?view=totem&record=1`: equipamento isolado, ajustado à altura da tela.

No totem, **TOQUE AQUI** abre QR Code e **EMBARQUE FACIAL** abre a simulação. Configure perfil, linha e cenários antes de entrar no modo gravação. A câmera pode ser ativada antes da gravação; continua sendo apenas prévia local.

A tarifa impressa de R$ 6,25 reproduz a referência visual. O domínio da demo mantém débito fictício de R$ 5, informado nos controles. Não há leitura de cartão/QR real nem liberação de catraca. As imagens originais não foram incorporadas ao repositório: a reprodução segue as descrições e proporções fornecidas, sem comparação pixel a pixel ou assets oficiais.

Planejamento adicional: [spec](specs/002-replica-bhbus/spec.md), [plano](specs/002-replica-bhbus/plan.md), [tarefas](specs/002-replica-bhbus/tasks.md) e [spike](specs/002-replica-bhbus/spike.md).
