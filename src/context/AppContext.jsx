import { useState, useEffect, useContext, createContext, useCallback } from "react";
import BooksAPI from "../services/booksApi";
import AuthAPI from "../services/authApi";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => AuthAPI.getSession());
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("plb_dark") !== "false");
  const [locale, setLocaleState] = useState(() => localStorage.getItem("plb_locale") || "pt");

  const setLocale = useCallback((l) => {
    setLocaleState(l);
    localStorage.setItem("plb_locale", l);
  }, []);

  const addToast = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  const loadBooks = useCallback(async () => {
    setLoading(true);
    try { const data = await BooksAPI.getAll(); setBooks(data); } finally { setLoading(false); }
  }, []);

  useEffect(() => { if (user) loadBooks(); }, [user]);
  useEffect(() => { localStorage.setItem("plb_dark", darkMode); }, [darkMode]);

  const login = async (email, pwd) => { const u = await AuthAPI.login(email, pwd); setUser(u); addToast({ key: "toast.welcome", params: { name: u.name } }); };
  const register = async (name, email, pwd) => { const u = await AuthAPI.register(name, email, pwd); setUser(u); addToast({ key: "toast.accountCreated", params: { name: u.name } }); };
  const logout = async () => { await AuthAPI.logout(); setUser(null); setBooks([]); };

  const addBook = async (data) => { setLoading(true); try { const b = await BooksAPI.create(data); setBooks(prev => [...prev, b]); addToast({ key: "toast.bookAdded" }); return b; } finally { setLoading(false); } };
  const updateBook = async (id, data) => { const b = await BooksAPI.update(id, data); setBooks(prev => prev.map(x => x.id === id ? b : x)); addToast({ key: "toast.bookUpdated" }); return b; };
  const deleteBook = async (id) => { await BooksAPI.delete(id); setBooks(prev => prev.filter(x => x.id !== id)); addToast({ key: "toast.bookRemoved", type: "info" }); };

  return (
    <AppContext.Provider value={{ user, books, loading, toasts, darkMode, setDarkMode, locale, setLocale, login, register, logout, addBook, updateBook, deleteBook, loadBooks, addToast }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

export default AppContext;
