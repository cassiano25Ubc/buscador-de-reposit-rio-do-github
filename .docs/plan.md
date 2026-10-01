# PRD: Buscador de repositórios do GitHub

## Visão do produto

Uma página que permite pesquisar repositórios públicos do GitHub por meio de um termo e consultar uma lista dos resultados mais populares.

## Funcionalidades

- A pessoa informa um termo no campo de busca e inicia a pesquisa pressionando Enter.
- A busca deve acontecer somente ao pressionar Enter.
- Enquanto os resultados são carregados, a página exibe um estado de carregamento.
- Para cada repositório, a página exibe:
	- Nome e foto do autor.
	- Nome do repositório.
	- Descrição do repositório.
	- Linguagem principal, quando disponível.
	- Número de estrelas.
	- Link direto para o repositório.
- Se a busca não encontrar resultados, a página exibe um estado vazio.
- Se ocorrer um erro durante a busca, a página exibe uma mensagem amigável.

## Decisões técnicas

- Consultar a API de busca de repositórios do GitHub:
	`https://api.github.com/search/repositories?q={TERMO}&sort=stars&per_page=10`
- Fazer a requisição com `fetch`, usando `async/await` dentro de um bloco `try/catch`.
- Verificar se a resposta HTTP foi bem-sucedida antes de processar os dados.
- Definir os eventos de interação em JavaScript; não usar manipuladores de evento diretamente no HTML.

## Diretrizes visuais e responsividade

- Centralizar o conteúdo da página e limitar sua largura a 700 px.
- Usar um card com bordas arredondadas para o campo de busca e outro para os resultados.
- Usar um fundo um pouco mais escuro que os cards para destacá-los, sem deixar a página muito escura.
- Adaptar o layout para aparelhos móveis.

## Critérios de aceite

- A pesquisa é iniciada ao pressionar Enter e não por outros eventos de interação.
- A lista apresenta até 10 repositórios ordenados por estrelas e exibe as informações definidas neste PRD.
- Os estados de carregamento, busca sem resultados e erro são apresentados adequadamente.
- O conteúdo permanece centralizado, limitado a 700 px em telas maiores e utilizável em telas móveis.