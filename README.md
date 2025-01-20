# Lima Dojo - Gerenciamento de Projetos

Uma aplicação web para gerenciamento de projetos e colaboração em equipe construída com React, Vite e Firebase.

## Funcionalidades

- Autenticação de usuários (login/cadastro)
- Criação e gerenciamento de projetos
- Atribuição de projetos a usuários
- Comentários em projetos
- Filtros por categoria de projeto
- Status online/offline dos usuários
- Upload de avatar do usuário

## Tecnologias Utilizadas

- React 18
- Vite
- Firebase 8.10.0
  - Authentication
  - Firestore
  - Storage
- React Router v6
- date-fns
- react-select

## Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente no arquivo .env:
VITE_API_KEY=sua_api_key
VITE_AUTH_DOMAIN=seu_dominio
VITE_PROJECT_ID=seu_project_id
VITE_STORAGE_BUCKET=seu_storage_bucket
VITE_MESSAGING_SENDER_ID=seu_sender_id
VITE_APP_ID=seu_app_id

Execute o projeto:
yarn or NPM run dev

Scripts Disponíveis
npm run dev - Inicia o servidor de desenvolvimento
npm run build - Cria a build de produção
npm run preview - Visualiza a build localmente
