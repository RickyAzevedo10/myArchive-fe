import StorageService from './storage';

const mockDelay = (ms = 400) => new Promise(res => setTimeout(res, ms));

const BooksAPI = {
  getAll: async () => { await mockDelay(); return StorageService.getBooks(); },
  getById: async (id) => { await mockDelay(200); return StorageService.getBooks().find(b => b.id === id) || null; },
  create: async (book) => { await mockDelay(600); const books = StorageService.getBooks(); const newBook = { ...book, id: Date.now().toString(), addedAt: new Date().toISOString().split("T")[0] }; StorageService.saveBooks([...books, newBook]); return newBook; },
  update: async (id, data) => { await mockDelay(500); const books = StorageService.getBooks(); const updated = books.map(b => b.id === id ? { ...b, ...data } : b); StorageService.saveBooks(updated); return updated.find(b => b.id === id); },
  delete: async (id) => { await mockDelay(400); const books = StorageService.getBooks().filter(b => b.id !== id); StorageService.saveBooks(books); return true; },
};

export default BooksAPI;
