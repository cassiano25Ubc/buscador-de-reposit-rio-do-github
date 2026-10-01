const searchInput = document.querySelector("#search-input");
const resultsContainer = document.querySelector("#results");
const resultCount = document.querySelector("#results-count");

searchInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }

  event.preventDefault();
  searchRepositories(searchInput.value.trim());
});

async function searchRepositories(term) {
  resultCount.hidden = true;

  if (!term) {
    showMessage("Digite um termo para pesquisar.");
    return;
  }

  resultsContainer.setAttribute("aria-busy", "true");
  resultsContainer.replaceChildren(createLoadingState());

  const query = new URLSearchParams({
    q: term,
    sort: "stars",
    per_page: "10",
  });

  try {
    const response = await fetch(`https://api.github.com/search/repositories?${query}`);

    if (!response.ok) {
      throw new Error(`A API respondeu com o status ${response.status}.`);
    }

    const data = await response.json();

    if (data.items.length === 0) {
      showMessage("Nenhum repositório encontrado. Tente outro termo de busca.");
      return;
    }

    showRepositories(data.items);
  } catch (error) {
    showMessage("Não foi possível buscar repositórios agora. Verifique sua conexão e tente novamente.", true);
  } finally {
    resultsContainer.setAttribute("aria-busy", "false");
  }
}

function showRepositories(repositories) {
  const list = document.createElement("ul");
  list.className = "repository-list";

  repositories.forEach((repository) => {
    list.append(createRepositoryItem(repository));
  });

  resultsContainer.replaceChildren(list);
  resultCount.textContent = `${repositories.length} ${repositories.length === 1 ? "resultado" : "resultados"}`;
  resultCount.hidden = false;
}

function createRepositoryItem(repository) {
  const item = document.createElement("li");
  item.className = "repository-item";

  const avatar = document.createElement("img");
  avatar.className = "owner-avatar";
  avatar.src = repository.owner.avatar_url;
  avatar.alt = `Foto de ${repository.owner.login}`;
  avatar.loading = "lazy";

  const content = document.createElement("div");
  content.className = "repository-content";

  const owner = document.createElement("p");
  owner.className = "repository-owner";
  owner.textContent = repository.owner.login;

  const name = document.createElement("a");
  name.className = "repository-name";
  name.href = repository.html_url;
  name.target = "_blank";
  name.rel = "noopener noreferrer";
  name.textContent = repository.name;

  const description = document.createElement("p");
  description.className = "repository-description";
  description.textContent = repository.description || "Sem descrição disponível.";
  if (!repository.description) {
    description.classList.add("is-empty");
  }

  const metadata = document.createElement("div");
  metadata.className = "repository-meta";

  if (repository.language) {
    const language = document.createElement("span");
    language.className = "meta-item";

    const languageDot = document.createElement("span");
    languageDot.className = "language-dot";
    languageDot.setAttribute("aria-hidden", "true");

    language.append(languageDot, document.createTextNode(repository.language));
    metadata.append(language);
  }

  const stars = document.createElement("span");
  stars.className = "meta-item";

  const starMark = document.createElement("span");
  starMark.className = "star-mark";
  starMark.setAttribute("aria-hidden", "true");
  starMark.textContent = "★";

  const starCount = new Intl.NumberFormat("pt-BR").format(repository.stargazers_count);
  stars.append(starMark, document.createTextNode(`${starCount} estrelas`));
  metadata.append(stars);

  content.append(owner, name, description, metadata);
  item.append(avatar, content);

  return item;
}

function createLoadingState() {
  const loading = document.createElement("div");
  loading.className = "loading-state";
  loading.setAttribute("role", "status");

  const spinner = document.createElement("span");
  spinner.className = "spinner";
  spinner.setAttribute("aria-hidden", "true");

  const message = document.createElement("span");
  message.textContent = "Buscando repositórios...";

  loading.append(spinner, message);
  return loading;
}

function showMessage(message, isError = false) {
  const state = document.createElement("div");
  state.className = isError ? "empty-state error-state" : "empty-state";

  const symbol = document.createElement("span");
  symbol.className = "state-symbol";
  symbol.setAttribute("aria-hidden", "true");

  const text = document.createElement("p");
  text.textContent = message;

  state.append(symbol, text);
  resultsContainer.replaceChildren(state);
  resultCount.hidden = true;
}
