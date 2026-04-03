import { MOCK_BOOKS, MOCK_USER } from '../utils/constants';

const StorageService = {
  getBooks: () => { try { const d = localStorage.getItem("plb_books"); return d ? JSON.parse(d) : MOCK_BOOKS; } catch { return MOCK_BOOKS; } },
  saveBooks: (books) => { try { localStorage.setItem("plb_books", JSON.stringify(books)); } catch {} },
  getUser: () => { try { const d = localStorage.getItem("plb_user"); return d ? JSON.parse(d) : null; } catch { return null; } },
  saveUser: (user) => { try { localStorage.setItem("plb_user", JSON.stringify(user)); } catch {} },
  removeUser: () => { try { localStorage.removeItem("plb_user"); } catch {} },
};

export default StorageService;
