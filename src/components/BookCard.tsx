
import { Button } from '@/components/ui/button';

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
    <div className="book-card card">
      <div className="book-image">
        <img src={book.cover} alt={book.title} />
        <span className="book-category">{book.category}</span>
      </div>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <div className="book-status">
          <span className={book.status === 'Disponível' ? 'status-available' : 'status-exchange'}>
            {book.status}
          </span>
        </div>
        <Button onClick={handleRequest} className="btn-sm">Solicitar</Button>
      </div>
    </div>
  );
};

export default BookCard;
