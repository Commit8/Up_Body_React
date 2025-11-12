# Up Body React – Front‑End  
Interface do cliente da aplicação Up Body (frontend build em React/TypeScript)

## Descrição  
A parte front‑end do sistema Up Body é construída com React + TypeScript, consumindo a API REST desenvolvida com NestJS no back‑end. O objetivo é oferecer uma interface moderna e responsiva para gerenciar usuários, categorias de serviços, serviços oferecidos, bem‑estar e treinos.  
A aplicação permite que os usuários visualizem, cadastrem, atualizem e naveguem por serviços, categorias, perfis de usuário, e mais.

## Tecnologias  
- React  
- TypeScript  
- Vite 
- TailwindCSS (ou outra biblioteca de estilos)  
- React Router (para roteamento de páginas)  
- Axios (para comunicação com a API)  
- Context API (se for usado para estado global)  

## Funcionalidades Principais  
- Interface de login/registro de usuários (autenticação via JWT proveniente do back‑end)  
- Dashboard para visualização/resumo dos serviços e categorias  
- CRUD de categorias de serviços (listar, criar, editar, excluir)  
- CRUD de serviços (listar, criar, editar, visualizar por ID, filtrar por plano ou categoria)  
- Perfil de usuário (visualizar dados, editar)  
- Visualização responsiva para diferentes dispositivos (desktop, tablet, mobile)  
- Comunicação segura com a API, tratamento de erros e feedback visual ao usuário  

## Começando  
### Pré‑requisitos  
- Node.js 
- npm ou yarn  

### Instalação  
1. Clone este repositório:  
   ```bash
   git clone https://github.com/Commit8/Up_Body_React.git
   ```  
2. Acesse a pasta do projeto:  
   ```bash
   cd Up_Body_React
   ```  
3. Instale as dependências:  
   ```bash
   npm install
   ```  
   ou  
   ```bash
   yarn
   ```  
4. Crie ou edite o arquivo de variáveis de ambiente (ex: `.env.local`) com a URL da API:  
   ```
   VITE_API_URL=http://localhost:4000
   ```  
   (ajuste conforme o que o seu projeto usará)

5. Inicie o servidor de desenvolvimento:  
   ```bash
   npm run dev
   ```  
   ou  
   ```bash
   yarn dev
   ```  
6. Abra no navegador o endereço indicado (geralmente `http://localhost:5173`) para ver a aplicação em funcionamento.

## Uso  
- Faça login ou registre‑se para acessar o dashboard.  
- Acesse o menu para gerenciar categorias de serviços.  
- Visualize a lista de serviços, detalhe por serviço, filtrar por categoria/plano.  
- Crie ou edite seu perfil de usuário, visualize histórico ou outras funcionalidades (se implementadas).  
- Quando pronto para produção, execute o build e mova para ambiente de hospedagem.

## Estrutura do Projeto  
```
├── public/                # Arquivos públicos estáticos  
├── src/                   # Código‑fonte principal  
│   ├── components/        # Componentes reutilizáveis UI  
│   ├── pages/             # Páginas da aplicação (ex: Login, Dashboard, Serviços, Categorias)  
│   ├── services/          # Integração com API (ex: api.ts, endpoints)  
│   ├── context/           # Contextos de estado global (se aplicável)  
│   ├── styles/            # Estilos globais ou temas  
│   └── utils/             # Funções utilitárias, formatos, constantes  
├── .gitignore  
├── package.json  
├── tsconfig.json  
├── vite.config.ts        
└── README.md  
```


## Responsividade e Acessibilidade  
- Layout responsivo usando TailwindCSS.

## Contribuição  
Se você quiser contribuir com o front‑end:  
1. Crie um fork deste repositório.  
2. Crie uma branch para sua feature ou correção (`git checkout ‑b feature/foo`).  
3. Faça as alterações e commit (`git commit ‑m "Add foo feature"`).  
4. Envie sua branch para o seu fork (`git push origin feature/foo`).  
5. Abra um Pull Request e aguarde revisão.  

## Back-end disponível:
([github.com](https://github.com/Commit8/up_body))  

## Licença  
Este projeto está licenciado sob a licença MIT — consulte o arquivo `LICENSE` para mais detalhes. ([github.com](https://github.com/Commit8/up_body))  

## Autores  
- Akanni Silva  
- Dandara Nascimento  
- Gabriel Messias  
- Gabriella Parra  
- Janielle Oliveira  
- Laish Rodrigues  
- Pedro Emanuel  
- Vitor Hugo 

## Contato  
Equipe Commit8 —  ([github.com](https://github.com/Commit8/))
Projeto desenvolvido no âmbito do coletivo Commit8 como parte da iniciativa Up Body.
