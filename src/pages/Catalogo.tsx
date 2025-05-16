
import { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard, { Book } from '../components/BookCard';
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useNavigate, useSearchParams } from "react-router-dom";

// Combina os livros cadastrados pelo usuário com os exemplos predefinidos
const Catalogo = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Função para solicitar um livro
  const handleBookRequest = (book: Book) => {
    // Verifica se usuário está logado
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Você precisa estar logado para solicitar um livro");
      navigate("/login");
      return;
    }

    toast.success(`Solicitação para "${book.title}" enviada com sucesso!`);
  };

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);

      // Recupera os livros dos exemplos predefinidos (isso viria do backend em um app real)
      const predefinedBooks: Book[] = [
        {
          title: "O Pequeno Príncipe",
          author: "Antoine de Saint-Exupéry",
          cover: "/images/pequeno-principe.jpg",
          category: "Ficção",
          status: "Disponível"
        },
        {
          title: "O Alquimista",
          author: "Paulo Coelho",
          cover: "/images/alquimista.jpg",
          category: "Ficção",
          status: "Troca"
        },
        {
          title: "Harry Potter e a Pedra Filosofal",
          author: "J.K. Rowling",
          cover: "/images/harry-potter.jpg",
          category: "Fantasia",
          status: "Disponível"
        },
        {
          title: "A Cabana",
          author: "William P. Young",
          cover: "/images/a-cabana.jpg",
          category: "Drama",
          status: "Troca"
        },
        {
          title: "O Senhor dos Anéis",
          author: "J.R.R. Tolkien",
          cover: "/images/senhor-dos-aneis.jpg",
          category: "Fantasia",
          status: "Disponível"
        },
        {
          title: "Dom Quixote",
          author: "Miguel de Cervantes",
          cover: "/images/dom-quixote.jpg",
          category: "Clássico",
          status: "Troca"
        }
      ];

      // Recupera os livros doados (se houver)
      const donatedBooksJSON = localStorage.getItem("donatedBooks");
      const donatedBooks = donatedBooksJSON ? JSON.parse(donatedBooksJSON) : [];
      
      // Combina todos os livros
      const allBooks = [...predefinedBooks, ...donatedBooks];
      setBooks(allBooks);
      setFilteredBooks(allBooks);
      
      // Verifica se há um termo de busca na URL
      const searchFromUrl = searchParams.get('search');
      if (searchFromUrl) {
        setSearchTerm(searchFromUrl);
      }
      
      setLoading(false);
    };

    loadBooks();
  }, [searchParams]);

  // Filtra os livros com base nos critérios de pesquisa
  useEffect(() => {
    if (books.length === 0) return;
    
    let filtered = [...books];
    
    // Filtra por termo de pesquisa
    if (searchTerm) {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtra por categoria
    if (categoryFilter) {
      filtered = filtered.filter(book => book.category === categoryFilter);
    }
    
    // Filtra por status
    if (statusFilter) {
      filtered = filtered.filter(book => book.status === statusFilter);
    }
    
    setFilteredBooks(filtered);
  }, [searchTerm, categoryFilter, statusFilter, books]);

  // Extrai categorias únicas para o filtro
  const uniqueCategories = Array.from(new Set(books.map(book => book.category)));

  const handleClearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setStatusFilter("");
    navigate('/catalogo');
  };

  return (
    <div className="site-container flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-grow py-12">
        <div className="container">
          <h1 className="text-3xl font-bold mb-8">Catálogo de Livros</h1>
          
          {/* Filtros */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                type="text"
                placeholder="Buscar por título, autor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas as categorias</SelectItem>
                {uniqueCategories.map((category, index) => (
                  <SelectItem key={index} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por disponibilidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas as disponibilidades</SelectItem>
                <SelectItem value="Disponível">Disponível</SelectItem>
                <SelectItem value="Troca">Troca</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Lista de livros */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book, index) => (
                <BookCard key={index} book={book} onRequest={handleBookRequest} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">Nenhum livro encontrado com os filtros selecionados.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={handleClearFilters}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalogo;
