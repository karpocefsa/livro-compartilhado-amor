
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SearchBox from './SearchBox';

const Header = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (query: string) => {
    // Filter books based on search query
    const results = featuredBooks.filter(book => 
      book.title.toLowerCase().includes(query.toLowerCase()) || 
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.category.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results);
    // You could also navigate to a search results page
    console.log('Resultados da busca:', results);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/"><h1>LivroCompartilhado</h1></Link>
          </div>
          
          <button 
            className="md:hidden text-text-color"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          
          <nav className={`main-nav ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            <ul>
              <li><a href="#" className="active">Início</a></li>
              <li><a href="#about">Sobre</a></li>
              <li><a href="#catalog">Catálogo</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contact">Contato</a></li>
            </ul>
          </nav>
          
          <div className="header-buttons">
            <SearchBox onSearch={handleSearch} />
            <Button className="login-btn">Entrar</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Sample data for featured books
const featuredBooks = [
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

export default Header;
