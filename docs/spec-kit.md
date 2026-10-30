# Spec Kit: instalação e continuidade

## Estado desta entrega
Specify CLI **1.2.5** instalado em `.tools/bin/specify`. Após falhas iniciais de
proxy no sandbox, a instalação de `specify-cli` pelo PyPI funcionou com a execução
de rede autorizada. Os diretórios de ferramenta/cache são locais e não devem
ser versionados.

A inicialização oficial foi executada no repositório:

```bash
.tools/bin/specify init --here --force --integration codex \
  --integration-options=--skills --ignore-agent-tools --non-interactive
```

Ela instalou os scripts, templates, workflow e a integração Codex em
`.agents/skills/speckit-*`, preservando a constituição existente. Versão e opções
estão registradas em `.specify/init-options.json` e `.specify/integration.json`.
Os artefatos de produto em `specs/001-demo-embarque/` foram escritos pelo agente;
não são a saída de uma execução automática de todos os comandos SDD.

## Instalação em outro checkout
Consultar [instalação oficial](https://github.github.io/spec-kit/installation.html)
e [projetos existentes](https://github.github.io/spec-kit/guides/existing-projects.html).
O README consultado recomenda:

```bash
uv tool install specify-cli==1.2.5
specify --version
```

As skills e a infraestrutura do projeto já estão versionadas. Não é necessário
reinicializar o checkout para usá-las. Para futuras atualizações, consultar a
ajuda da versão instalada e revisar alterações na constituição e nas specs.

## Fluxo de agente
Os comandos de SDD são invocados no chat do agente, conforme sintaxe da integração,
e não como comandos de terminal: constitution → specify → plan → tasks → implement
→ converge. Clarificações devem resolver somente decisões que alterem escopo;
as recomendações de baixo risco já estão registradas em `research.md`.

No Codex com skills, usar `$speckit-constitution`, `$speckit-specify`,
`$speckit-plan`, `$speckit-tasks`, `$speckit-implement` e `$speckit-converge`.
Para verificar os artefatos desta feature a partir da raiz do projeto:

```bash
SPECIFY_FEATURE_DIRECTORY="$PWD/specs/001-demo-embarque" \
  .specify/scripts/bash/check-prerequisites.sh \
  --json --require-spec --require-tasks --include-tasks
```

Fonte: [README github/spec-kit](https://github.com/github/spec-kit/blob/main/README.md),
consultado em 2026-10-30. Assessment é extensão opcional, não fase obrigatória.
