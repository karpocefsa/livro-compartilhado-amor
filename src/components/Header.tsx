
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SearchBox from './SearchBox';
import { User, LogIn, Search, Menu, X } from 'lucide-react';

const Header = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();

  // Verifica se o usuário está logado ao carregar o componente
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Erro ao parsear dados do usuário:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleSearch = (query: string) => {
    // Redireciona para a página de catálogo com o termo de busca
    navigate(`/catalogo?search=${encodeURIComponent(query)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="header sticky top-0 bg-white z-50 shadow-sm">
      <div className="container">
        <div className="header-content py-4 flex items-center justify-between">
          <div className="logo">
            <Link to="/"><h1 className="text-xl font-bold">LivroCompartilhado</h1></Link>
          </div>
          
          <button 
            className="md:hidden text-text-color"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          
          <nav className={`main-nav ${mobileMenuOpen ? 'mobile-menu-open' : ''} md:block ${mobileMenuOpen ? 'block' : 'hidden'} absolute md:relative top-full left-0 right-0 bg-white md:bg-transparent shadow md:shadow-none`}>
            <ul className="flex flex-col md:flex-row gap-1 md:gap-2 p-4 md:p-0">
              <li><Link to="/" className="block px-4 py-2 hover:bg-accent rounded-md">Início</Link></li>
              <li><Link to="/catalogo" className="block px-4 py-2 hover:bg-accent rounded-md">Catálogo</Link></li>
              <li><Link to="/doar" className="block px-4 py-2 hover:bg-accent rounded-md">Doar</Link></li>
              <li><a href="/#about" className="block px-4 py-2 hover:bg-accent rounded-md">Sobre</a></li>
              <li><a href="/#blog" className="block px-4 py-2 hover:bg-accent rounded-md">Blog</a></li>
              <li><a href="/#contact" className="block px-4 py-2 hover:bg-accent rounded-md">Contato</a></li>
            </ul>
          </nav>
          
          <div className="header-buttons flex items-center gap-2">
            <SearchBox onSearch={handleSearch} />
            
            {user ? (
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  className="hidden md:flex items-center gap-2"
                  onClick={() => navigate('/perfil')}
                >
                  <User size={18} />
                  <span className="hidden lg:inline">{user.name}</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="hidden md:block"
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </div>
            ) : (
              <Button 
                variant="default"
                onClick={() => navigate('/login')}
                className="flex items-center gap-2"
              >
                <LogIn size={18} />
                <span>Entrar</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
