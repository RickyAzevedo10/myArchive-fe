# Biblioteca Pessoal

Uma aplicação web para gestão de colecção literária pessoal, construída com **React 19** e **Vite 8**. Permite adicionar, organizar e acompanhar livros lidos, em leitura e por ler, com suporte para notas, citações e reviews.

## Funcionalidades

- **Dashboard** — Estatísticas de leitura, distribuição por géneros, progresso mensal e livros recentes
- **Biblioteca** — CRUD completo com pesquisa, filtros (estado, género, rating) e vista em grid
- **Detalhe do Livro** — Hero com capa, mudança de estado, tabs (informação, notas, citações), edição e remoção
- **Perfil** — Estatísticas do utilizador e top livros mais bem avaliados
- **Dark/Light Mode** — Toggle com persistência em localStorage
- **Multi-idioma** — Português (PT) e Inglês (EN) com toggle na sidebar
- **Dados Persistentes** — Tudo guardado em localStorage via camada de API mock

## Stack

| Tecnologia | Versão |
|---|---|
| React | 19.2 |
| Vite | 8.0 |
| ESLint | 9.39 |

## Estrutura do Projeto

```
src/
├── main.jsx                          # Entry point — monta o <App /> no DOM
├── App.jsx                           # Componente raiz — providers, router, toast layer
│
├── context/
│   └── AppContext.jsx                # Estado global via React Context
│                                     # Gerencia: user, books, loading, toasts, darkMode, locale
│                                     # Expõe: login, register, logout, addBook, updateBook, deleteBook
│
├── i18n/
│   ├── translations.js               # Dicionários de tradução (PT + EN)
│   │                                 # ~150 chaves: UI labels, toasts, status, meses
│   └── useTranslation.js             # Hook { t, locale, setLocale }
│                                     # t("chave", { param: valor }) → texto traduzido
│                                     # Persiste idioma em localStorage (chave plb_locale)
│
├── hooks/
│   └── useRouter.js                  # Hash-based router personalizado
│                                     # Lê window.location.hash e expõe { route, navigate }
│
├── services/
│   ├── storage.js                    # Wrapper síncrono para localStorage
│   │                                 # Chaves: plb_books, plb_user
│   ├── booksApi.js                   # CRUD assíncrono de livros (simula latência de rede)
│   │                                 # Métodos: getAll, getById, create, update, delete
│   └── authApi.js                    # Auth mock (qualquer email + 3+ chars de password)
│                                     # Métodos: login, register, logout, getSession
│
├── utils/
│   └── constants.js                  # Dados estáticos e seed
│                                     # GENRES (15 géneros), STATUS_LABELS, STATUS_COLORS
│                                     # MOCK_BOOKS (8 livros seed), MOCK_USER
│
├── components/
│   ├── ui/                           # Componentes base reutilizáveis
│   │   ├── Icon.jsx                  # Mapa de emojis como ícones
│   │   ├── Spinner.jsx               # Loading spinner animado
│   │   ├── StarRating.jsx            # Rating interativo (1-5 estrelas)
│   │   ├── Toast.jsx                 # Notificações com animação
│   │   ├── Modal.jsx                 # Modal com backdrop e fecho por Escape
│   │   ├── Badge.jsx                 # Badge de estado do livro
│   │   └── SkeletonCard.jsx          # Placeholder de loading para livros
│   │
│   ├── layout/
│   │   ├── Sidebar.jsx               # Navegação lateral com links, user info e toggles
│   │   └── Layout.jsx                # Wrapper com sidebar + mobile header
│   │
│   └── BookForm.jsx                  # Formulário de criação/edição de livro
│                                     # Campos: título, autor, ano, género, estado,
│                                     # capa, resumo, notas, citações, rating, review
│
├── pages/
│   ├── LoginPage.jsx                 # Página de login com blobs decorativos
│   ├── RegisterPage.jsx              # Página de registo com validação
│   ├── DashboardPage.jsx             # Dashboard com stats, gráficos de barras e lista recente
│   ├── LibraryPage.jsx               # Catálogo com pesquisa, filtros e grid responsivo
│   ├── BookDetailPage.jsx            # Vista detalhada com hero, tabs e ações
│   └── ProfilePage.jsx               # Perfil do utilizador com stats e top livros
│
└── styles/
    └── global.css                    # Design system completo
                                      # CSS variables (dark/light themes),
                                      # componentes (btns, inputs, cards, modals, toasts),
                                      # animações, responsive breakpoints
```

## Arquitetura

### Padrão de Dados
```
UI (Pages/Components)
    ↓ usa
Context (AppContext) ← useState + useCallback
    ↓ chama
Services (booksApi, authApi) ← async com mock delay
    ↓ usa
Storage (storage.js) ← localStorage
```

### Routing
Router baseado em **hash** (`#/dashboard`, `#/library`, `#/book/1`). Sem dependências externas — hook `useRouter` nativo com `window.location.hash` e `hashchange` event.

### Temas
Sistema de **CSS custom properties** com duas variantes: dark (default) e light. O toggle atualiza a classe `light` no `<body>` e persiste em `localStorage` (chave `plb_dark`).

### Multi-idioma
Sistema de tradução **próprio, sem dependências externas**. Dicionários PT/EN em `i18n/translations.js`, consumidos via hook `useTranslation()`. O toggle na sidebar alterna entre PT e EN, persistindo em `localStorage` (chave `plb_locale`).

**Como usar:**
```jsx
const { t, locale, setLocale } = useTranslation();

t("app.title")                          // → "Biblioteca Pessoal" ou "Personal Library"
t("dashboard.greeting", { name: "Ricardo" })  // → "Olá, Ricardo 👋"
setLocale(locale === "pt" ? "en" : "pt")      // → alterna idioma
```

## Comandos

```bash
npm run dev       # Dev server com HMR
npm run build     # Build de produção
npm run preview   # Preview do build
npm run lint      # ESLint
```

## Dados em localStorage

| Chave | Conteúdo |
|---|---|
| `plb_books` | Array de livros (JSON) |
| `plb_user` | Sessão do utilizador (JSON) |
| `plb_dark` | Preferência de tema (`"true"` ou `"false"`) |
| `plb_locale` | Preferência de idioma (`"pt"` ou `"en"`) |
