
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBox = ({ onSearch, placeholder = "Buscar livros...", className = "" }: SearchBoxProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  // Fecha a barra de pesquisa ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchContainerRef} className={`search-container relative ${className}`}>
      {isOpen ? (
        <form onSubmit={handleSubmit} className="flex items-center">
          <Input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full md:w-64 mr-2"
            autoFocus
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-5 w-5" />
          </Button>
        </form>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)} 
          variant="ghost" 
          size="icon" 
          className="search-btn"
          aria-label="Abrir busca"
        >
          <Search className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default SearchBox;
