
import { Button } from '@/components/ui/button';
import getImageUrl from '../utils/imageService';

export interface Book {
  id?: number;
  title: string;
  author: string;
  cover: string;
  category: string;
  status: 'Disponível' | 'Troca';
  description?: string;
}

interface BookCardProps {
  book: Book;
  onRequest?: (book: Book) => void;
}

const BookCard = ({ book, onRequest }: BookCardProps) => {
  const handleRequest = () => {
    if (onRequest) {
      onRequest(book);
    }
  };

  return (
    <div className="book-card border rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg">
      <div className="book-image relative h-60 overflow-hidden">
        <img 
          src={getImageUrl(book.cover)} 
          alt={book.title} 
          className="w-full h-full object-cover"
        />
        <span className="book-category absolute top-2 right-2 bg-primary/80 text-white px-2 py-1 rounded-md text-xs">
          {book.category}
        </span>
      </div>
      <div className="book-info p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{book.title}</h3>
        <p className="book-author text-sm text-gray-600 mb-2">{book.author}</p>
        <div className="book-status mb-3">
          <span className={`px-2 py-1 text-xs rounded-full ${book.status === 'Disponível' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
            {book.status}
          </span>
        </div>
        <Button onClick={handleRequest} className="w-full" size="sm">Solicitar</Button>
      </div>
    </div>
  );
};

export default BookCard;
