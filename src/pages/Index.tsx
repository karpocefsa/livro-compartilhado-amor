
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BookCard, { Book } from '../components/BookCard';
import TestimonialCard from '../components/TestimonialCard';
import BlogCard from '../components/BlogCard';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Verifica se o usuário está logado ao carregar a página
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);
  
  // Função para solicitar um livro
  const handleBookRequest = (book: Book) => {
    if (!isLoggedIn) {
      toast.error('Você precisa estar logado para solicitar um livro');
      navigate('/login');
      return;
    }
    
    toast.success(`Solicitação para "${book.title}" enviada com sucesso!`);
  };
  
  // Redireciona para a página de doação
  const handleDonate = () => {
    if (!isLoggedIn) {
      toast.error('Você precisa estar logado para doar um livro');
      navigate('/login');
      return;
    }
    
    navigate('/doar');
  };

  return (
    <div className="site-container">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Bem-vindo ao LivroCompartilhado</h1>
              <p>Compartilhe histórias, espalhe conhecimento</p>
              <div className="hero-buttons">
                <Button onClick={handleDonate}>Doe um livro</Button>
                <Button variant="outline" onClick={() => navigate('/catalogo')} className="btn-outline">Encontre um livro</Button>
              </div>
            </div>
            <div className="hero-image">
              <img src="/images/hero-books.jpg" alt="Pilha de livros" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <h2 className="section-title">Sobre o Projeto</h2>
          <div className="about-content">
            <div className="about-text">
              <p>O LivroCompartilhado é uma plataforma sem fins lucrativos que conecta leitores para troca e doação de livros, promovendo a leitura e a sustentabilidade através do reaproveitamento de materiais.</p>
              <p>Nossa missão é fazer com que a literatura chegue a todos, independentemente de condição social ou localização geográfica, criando uma comunidade de leitores engajados e conscientes.</p>
              <Button onClick={() => navigate('/catalogo')}>Saiba mais</Button>
            </div>
            <div className="about-image">
              <img src="/images/readers-sharing.jpg" alt="Leitores compartilhando livros" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section id="catalog" className="section featured-books-section">
        <div className="container">
          <h2 className="section-title">Livros em Destaque</h2>
          <div className="books-grid">
            {featuredBooks.map((book, index) => (
              <BookCard key={index} book={book} onRequest={handleBookRequest} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button onClick={() => navigate('/catalogo')} variant="outline">Ver todos os livros</Button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="section how-it-works-section bg-slate-50">
        <div className="container">
          <h2 className="section-title">Como Funciona</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-icon">1</div>
              <h3 className="text-xl font-semibold mb-3">Cadastre seu livro</h3>
              <p>Fotografe e cadastre os livros que você deseja doar ou trocar.</p>
            </div>
            <div className="step">
              <div className="step-icon">2</div>
              <h3 className="text-xl font-semibold mb-3">Escolha um livro</h3>
              <p>Navegue pelo catálogo e encontre o livro que você deseja ler.</p>
            </div>
            <div className="step">
              <div className="step-icon">3</div>
              <h3 className="text-xl font-semibold mb-3">Combine a troca</h3>
              <p>Converse com o outro usuário e combine a entrega do livro.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button onClick={handleDonate}>Quero doar um livro</Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">O que dizem os leitores</h2>
          <div className="testimonials-container">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="section blog-section bg-slate-50">
        <div className="container">
          <h2 className="section-title">Blog e Dicas de Leitura</h2>
          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <BlogCard key={index} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <h2 className="section-title">Entre em Contato</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3 className="text-xl font-semibold mb-4">Fale Conosco</h3>
              <p>Tem alguma dúvida ou sugestão? Entre em contato conosco.</p>
              <div className="contact-details">
                <p><strong>Email:</strong> contato@livrocompartilhado.com</p>
                <p><strong>Telefone:</strong> (11) 9999-9999</p>
                <p><strong>Horário:</strong> Segunda a Sexta, 9h às 18h</p>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Sample data for the books
const featuredBooks: Book[] = [
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

// Sample data for testimonials
const testimonials = [
  {
    name: "Maria Silva",
    role: "Professora",
    avatar: "/images/avatar-maria.jpg",
    text: "O LivroCompartilhado me ajudou a renovar minha biblioteca pessoal e a encontrar títulos que eu procurava há anos!"
  },
  {
    name: "João Santos",
    role: "Estudante",
    avatar: "/images/avatar-joao.jpg",
    text: "Como estudante, conseguir livros acadêmicos através do site facilitou demais minha vida universitária."
  },
  {
    name: "Ana Costa",
    role: "Escritora",
    avatar: "/images/avatar-ana.jpg",
    text: "Adoro a comunidade que se forma aqui. Já fiz amizades e descobri novos autores incríveis através das trocas."
  }
];

// Sample data for blog posts
const blogPosts = [
  {
    title: "Como organizar sua estante de livros",
    date: "10 de Maio, 2025",
    image: "/images/blog-estante.jpg",
    excerpt: "Dicas práticas para organizar sua coleção de livros de forma funcional e visualmente atraente."
  },
  {
    title: "Os 10 livros mais trocados do ano",
    date: "5 de Maio, 2025",
    image: "/images/blog-top10.jpg",
    excerpt: "Confira a lista dos livros mais populares entre os usuários da nossa plataforma nos últimos meses."
  },
  {
    title: "Por que doar livros é importante?",
    date: "28 de Abril, 2025",
    image: "/images/blog-doacao.jpg",
    excerpt: "Entenda como a doação de livros pode impactar positivamente a vida de pessoas e comunidades."
  }
];

export default Index;
