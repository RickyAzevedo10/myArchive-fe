# Personal Library

A web application for managing your personal book collection, built with **React 19** and **Vite 8**. Add, organize, and track books you've read, are reading, or plan to read — with support for notes, quotes, and reviews.

## Features

- **Dashboard** — Reading statistics, genre distribution, monthly progress, and recent books
- **Library** — Full CRUD with search, filters (status, genre, rating), and grid view
- **Book Detail** — Cover hero, status management, tabs (info, notes, quotes), edit and delete
- **Profile** — User statistics and top-rated books
- **Dark/Light Mode** — Toggle with localStorage persistence
- **Multi-language** — Portuguese (PT) and English (EN) with sidebar toggle
- **Persistent Data** — Everything stored in localStorage via a mock API layer

## Tech Stack

| Technology | Version |
|---|---|
| React | 19.2 |
| Vite | 8.0 |
| ESLint | 9.39 |

## Project Structure

```
src/
├── main.jsx                          # Entry point — mounts <App /> to the DOM
├── App.jsx                           # Root component — providers, router, toast layer
│
├── context/
│   └── AppContext.jsx                # Global state via React Context
│                                     # Manages: user, books, loading, toasts, darkMode, locale
│                                     # Exposes: login, register, logout, addBook, updateBook, deleteBook
│
├── i18n/
│   ├── translations.js               # Translation dictionaries (PT + EN)
│   │                                 # ~150 keys: UI labels, toasts, statuses, months
│   └── useTranslation.js             # Hook { t, locale, setLocale }
│                                     # t("key", { param: value }) → translated text
│                                     # Persists language in localStorage (key: plb_locale)
│
├── hooks/
│   └── useRouter.js                  # Custom hash-based router
│                                     # Reads window.location.hash and exposes { route, navigate }
│
├── services/
│   ├── storage.js                    # Synchronous localStorage wrapper
│   │                                 # Keys: plb_books, plb_user
│   ├── booksApi.js                   # Async book CRUD (simulates network latency)
│   │                                 # Methods: getAll, getById, create, update, delete
│   └── authApi.js                    # Mock auth (any email + 3+ char password)
│                                     # Methods: login, register, logout, getSession
│
├── utils/
│   └── constants.js                  # Static data and seed
│                                     # GENRES (15 genres), STATUS_LABELS, STATUS_COLORS
│                                     # MOCK_BOOKS (8 seed books), MOCK_USER
│
├── components/
│   ├── ui/                           # Reusable base components
│   │   ├── Icon.jsx                  # Emoji icon map
│   │   ├── Spinner.jsx               # Animated loading spinner
│   │   ├── StarRating.jsx            # Interactive rating (1-5 stars)
│   │   ├── Toast.jsx                 # Notifications with animation
│   │   ├── Modal.jsx                 # Modal with backdrop and Escape close
│   │   ├── Badge.jsx                 # Book status badge
│   │   └── SkeletonCard.jsx          # Loading placeholder for books
│   │
│   ├── layout/
│   │   ├── Sidebar.jsx               # Side navigation with links, user info, and toggles
│   │   └── Layout.jsx                # Wrapper with sidebar + mobile header
│   │
│   └── BookForm.jsx                  # Book creation/editing form
│                                     # Fields: title, author, year, genre, status,
│                                     # cover, summary, notes, quotes, rating, review
│
├── pages/
│   ├── LoginPage.jsx                 # Login page with decorative blobs
│   ├── RegisterPage.jsx              # Registration page with validation
│   ├── DashboardPage.jsx             # Dashboard with stats, bar charts, and recent list
│   ├── LibraryPage.jsx               # Catalog with search, filters, and responsive grid
│   ├── BookDetailPage.jsx            # Detailed view with hero, tabs, and actions
│   └── ProfilePage.jsx               # User profile with stats and top books
│
└── styles/
    └── global.css                    # Complete design system
                                      # CSS variables (dark/light themes),
                                      # components (buttons, inputs, cards, modals, toasts),
                                      # animations, responsive breakpoints
```

## Architecture

### Data Flow
```
UI (Pages/Components)
    ↓ consumes
Context (AppContext) ← useState + useCallback
    ↓ calls
Services (booksApi, authApi) ← async with mock delay
    ↓ uses
Storage (storage.js) ← localStorage
```

### Routing
**Hash-based** router (`#/dashboard`, `#/library`, `#/book/1`). Zero external dependencies — custom `useRouter` hook using `window.location.hash` and `hashchange` event.

### Themes
**CSS custom properties** system with two variants: dark (default) and light. Toggle updates the `light` class on `<body>` and persists to `localStorage` (key: `plb_dark`).

### Multi-language
**Custom translation system**, no external dependencies. PT/EN dictionaries in `i18n/translations.js`, consumed via `useTranslation()` hook. Sidebar toggle switches between PT and EN, persisting to `localStorage` (key: `plb_locale`).

**Usage:**
```jsx
const { t, locale, setLocale } = useTranslation();

t("app.title")                          // → "Personal Library" or "Biblioteca Pessoal"
t("dashboard.greeting", { name: "Ricardo" })  // → "Hello, Ricardo 👋"
setLocale(locale === "pt" ? "en" : "pt")      // → toggle language
```

## Commands

```bash
npm run dev       # Dev server with HMR
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## localStorage Keys

| Key | Content |
|---|---|
| `plb_books` | Array of books (JSON) |
| `plb_user` | User session (JSON) |
| `plb_dark` | Theme preference (`"true"` or `"false"`) |
| `plb_locale` | Language preference (`"pt"` or `"en"`) |

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open the app in your browser
