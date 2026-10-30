# Publicação no GitHub Pages

O workflow `.github/workflows/pages.yml` executa testes, gera o build do Vite e publica o diretório `dist` no GitHub Pages em atualizações na branch `main`. Pull requests também recebem uma prévia após os testes e o build.

O endereço público usa o domínio `felipeatene.github.io` e o nome do repositório. O workflow configura caminhos relativos para servir os assets corretamente em URLs de projeto.
