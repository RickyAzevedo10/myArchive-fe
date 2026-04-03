/**
 * @typedef {'want_to_read'|'reading'|'read'} BookStatus
 * @typedef {{ id: string, title: string, author: string, genre: string, year: number, cover: string, status: BookStatus, rating: number, review: string, summary: string, notes: string, quotes: string[], addedAt: string }} Book
 * @typedef {{ id: string, name: string, email: string, avatar: string, joinedAt: string }} User
 */

export const GENRES = ["Fiction","Non-Fiction","Science Fiction","Fantasy","Mystery","Thriller","Romance","Biography","History","Self-Help","Science","Poetry","Horror","Literary Fiction","Graphic Novel"];

export const STATUS_LABELS = { want_to_read: "Quero Ler", reading: "A Ler", read: "Lido" };
export const STATUS_COLORS = { want_to_read: "#6366f1", reading: "#f59e0b", read: "#10b981" };

export const MOCK_BOOKS = [
  { id:"1", title:"O Nome do Vento", author:"Patrick Rothfuss", genre:"Fantasy", year:2007, cover:"https://covers.openlibrary.org/b/id/8739161-L.jpg", status:"read", rating:5, review:"Uma obra-prima absoluta da fantasia moderna.", summary:"A história de Kvothe, narrada por ele próprio.", notes:"Reler o capítulo 20.", quotes:["Existem três tipos de silêncio."], addedAt:"2024-01-15" },
  { id:"2", title:"Duna", author:"Frank Herbert", genre:"Science Fiction", year:1965, cover:"https://covers.openlibrary.org/b/id/8267395-L.jpg", status:"read", rating:5, review:"Um clássico intemporal da ficção científica.", summary:"Paul Atreides e o planeta Arrakis.", notes:"Explorar a filosofia de Muad'Dib.", quotes:["O medo é o assassino da mente."], addedAt:"2024-02-10" },
  { id:"3", title:"1984", author:"George Orwell", genre:"Fiction", year:1949, cover:"https://covers.openlibrary.org/b/id/8575708-L.jpg", status:"read", rating:5, review:"Distopia que se torna mais relevante a cada ano.", summary:"Winston Smith vive num estado totalitário.", notes:"", quotes:["Big Brother está a ver-te."], addedAt:"2024-02-20" },
  { id:"4", title:"O Apanhador no Campo de Centeio", author:"J.D. Salinger", genre:"Literary Fiction", year:1951, cover:"https://covers.openlibrary.org/b/id/8231856-L.jpg", status:"reading", rating:4, review:"", summary:"Holden Caulfield e a sua visão do mundo.", notes:"A linguagem é incrível.", quotes:[], addedAt:"2024-03-01" },
  { id:"5", title:"Sapiens", author:"Yuval Noah Harari", genre:"History", year:2011, cover:"https://covers.openlibrary.org/b/id/10494578-L.jpg", status:"reading", rating:4, review:"", summary:"Uma breve história da humanidade.", notes:"", quotes:["A imaginação é o que nos tornou humanos."], addedAt:"2024-03-05" },
  { id:"6", title:"O Senhor dos Anéis", author:"J.R.R. Tolkien", genre:"Fantasy", year:1954, cover:"https://covers.openlibrary.org/b/id/8406786-L.jpg", status:"want_to_read", rating:0, review:"", summary:"A jornada de Frodo para destruir o Um Anel.", notes:"", quotes:[], addedAt:"2024-03-10" },
  { id:"7", title:"Fundação", author:"Isaac Asimov", genre:"Science Fiction", year:1951, cover:"https://covers.openlibrary.org/b/id/7522432-L.jpg", status:"want_to_read", rating:0, review:"", summary:"Hari Seldon e a Fundação do futuro.", notes:"", quotes:[], addedAt:"2024-03-12" },
  { id:"8", title:"O Código Da Vinci", author:"Dan Brown", genre:"Thriller", year:2003, cover:"https://covers.openlibrary.org/b/id/8267953-L.jpg", status:"read", rating:3, review:"Entretenimento garantido, mas superficial.", summary:"Robert Langdon investiga um assassinato no Louvre.", notes:"", quotes:[], addedAt:"2024-01-20" },
];

export const MOCK_USER = { id:"1", name:"Alexandre Costa", email:"alex@biblioteca.pt", avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandre", joinedAt:"2024-01-01" };
