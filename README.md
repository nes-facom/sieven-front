# SIEVEN: Front-end

## Estrutura do documento

- [Descrição do projeto](#descri%C3%A7%C3%A3o-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Primeiros passos](#primeiros-passos)
- [Autores](#autores)

## Descrição do projeto
Este repositório contém o código-fonte do front-end do projeto SIEVEN. O SIEVEN é uma plataforma para gerenciamento de eventos e atividades.

## Funcionalidades
- [x] Interface do usuário para visualização de eventos e atividades
- [x] Formulários para criação, atualização e exclusão de eventos e atividades
- [x] Navegação entre páginas e visualização de detalhes de eventos e atividades

## Estrutura de pacotes
- /public - Definiçoes gerais do HTML e dados publicamente visiveis ao browser
- /src - Dados gerais do projeto
    - /assets - Arquivos de mídia gerais
    - /layout - Arquivos de layout gerais
    - /pages - Páginas do projeto
        - /paginaX - Uma página do projeto
            - /components - Componentes de responsábilidade menor ou reutilizaveis da página
            - index.vue - Responsável por declarar todo o escopo métodos e chamadas do projeto
    - /router - Indexa as rotas as páginas
    - /store - Mantem dados em estado no navegador
    - /test - Arquivos codificados de teste da aplicação
    - App.vue - Arquivo main principal do projeto
    - main.js - Inicializador globar JS do projeto
- Dockerfile - Define parâmetros para replicar um container no ambiente atual para a aplicação
- package.json - Todas as libs e dependencias do projeto
- vue.config.js - Definições de configurações gerais para inicialização do Vue


## Requisitos
Requisitos mínimos necessários para executar a aplicação

- Node.js (versão 8.x ou superior)
- npm (gerenciador de pacotes do Node.js)

## Instalação
1. Clone este repositório: `git clone https://github.com/seu-usuario/seu-projeto.git`.
2. Abra o diretório do projeto: `cd seu-projeto`.
3. Execute o comando `npm install` para instalar as dependências do projeto.

## Primeiros-passos
1. Após clonar o repositório e instalar as dependencias, execute no seu terminal `npm run serve` para executar a aplicação na sua máquina local.
2. Abra seu navegador e acessa a URL `http://localhost:8080`

## Testes
1. Comando para rodar os testes `npm run test`.

## Autores 
Esta parte do sistema foi desenvolvido pela seguinte equipe:
- [David Gama](https://github.com/davidgamaserrate1) 
- [Lucas Borth](https://github.com/LucasBorth) 
- [Vinicius Mugarte](https://github.com/mugarte-lab) 
 
