import StorageService from './storage';
import { MOCK_USER } from '../utils/constants';

const mockDelay = (ms = 400) => new Promise(res => setTimeout(res, ms));

const AuthAPI = {
  login: async (email, password) => { await mockDelay(800); if (email && password.length >= 3) { StorageService.saveUser(MOCK_USER); return MOCK_USER; } throw new Error("Credenciais inválidas"); },
  register: async (name, email, password) => { await mockDelay(1000); const user = { ...MOCK_USER, id: Date.now().toString(), name, email, joinedAt: new Date().toISOString().split("T")[0] }; StorageService.saveUser(user); return user; },
  logout: async () => { await mockDelay(200); StorageService.removeUser(); },
  getSession: () => StorageService.getUser(),
};

export default AuthAPI;
