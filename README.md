# buscador-de-repositorio-do-github
# 🔍 Buscador de Repositórios GitHub

> Uma aplicação web moderna e responsiva para pesquisar repositórios públicos no GitHub de forma rápida, intuitiva e direta ao ponto, consumindo a API oficial da plataforma.

[![Status do Projeto](https://img.shields.io/badge/status-concluído-brightgreen.svg)]()
[![Licença](https://img.shields.io/badge/license-MIT-blue.svg)]()

---

## 🔗 Demonstração

* **Acesse o projeto online:** [🔗 file:///c%3A/js-buscador-reposit%C3%B3rio/assets/index.html](#) 

---

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando tecnologias web modernas, sem dependências de frameworks pesados (Vanilla JavaScript puro):

* **HTML5** (Semântico e acessível)
* **CSS3** (Variáveis CSS, Flexbox, Grid e animações fluidas)
* **JavaScript (ES6+)** (Manipulação de DOM e requisições assíncronas)
* **API REST do GitHub** (`/search/repositories`)

---

## ✨ Funcionalidades

* **Busca em Tempo Real:** Pesquisa otimizada acionada pressionando a tecla `Enter`.
* **Exibição Rica de Dados:** Cada resultado apresenta o avatar do autor, nome do repositório, descrição oficial, linguagem de programação predominante e contagem formatada de estrelas.
* **Links Diretos:** Redirecionamento seguro para a página oficial de cada repositório no GitHub (`target="_blank"` com `noopener noreferrer`).
* **Tratamento de Estados (UX Avançada):**
  * **Estado Inicial:** Instruções claras antes da primeira busca.
  * **Estado de Carregamento (*Loading*):** Indicador visual (*spinner*) elegante durante a requisição.
  * **Estados de Erro e Vazio:** Mensagens amigáveis para buscas sem resultados ou falhas de conexão/limite da API.

---

## 🧠 Decisões Técnicas e Arquitetura

* **Consulta à API:** Utilização do endpoint de busca avançada ordenado por estrelas:
  ```text
  [https://api.github.com/search/repositories?q=](https://api.github.com/search/repositories?q=){TERMO}&sort=stars&per_page=10
