
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
import getImageUrl from '../utils/imageService';

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
      <section className="hero-section bg-slate-50 py-16">
        <div className="container">
          <div className="hero-content flex flex-col md:flex-row items-center gap-8">
            <div className="hero-text md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Bem-vindo ao LivroCompartilhado</h1>
              <p className="text-xl mb-8">Compartilhe histórias, espalhe conhecimento</p>
              <div className="hero-buttons flex flex-wrap gap-4">
                <Button onClick={handleDonate} size="lg">Doe um livro</Button>
                <Button variant="outline" onClick={() => navigate('/catalogo')} size="lg">Encontre um livro</Button>
              </div>
            </div>
            <div className="hero-image md:w-1/2">
              <img 
                src={getImageUrl("/images/hero-books.jpg")} 
                alt="Pilha de livros" 
                className="rounded-lg shadow-lg w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section py-16">
        <div className="container">
          <h2 className="section-title text-3xl font-bold text-center mb-12">Sobre o Projeto</h2>
          <div className="about-content flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="about-text md:w-1/2">
              <p className="mb-4 text-lg">O LivroCompartilhado é uma plataforma sem fins lucrativos que conecta leitores para troca e doação de livros, promovendo a leitura e a sustentabilidade através do reaproveitamento de materiais.</p>
              <p className="mb-6 text-lg">Nossa missão é fazer com que a literatura chegue a todos, independentemente de condição social ou localização geográfica, criando uma comunidade de leitores engajados e conscientes.</p>
              <Button onClick={() => navigate('/catalogo')}>Saiba mais</Button>
            </div>
            <div className="about-image md:w-1/2">
              <img 
                src={getImageUrl("/images/readers-sharing.jpg")} 
                alt="Leitores compartilhando livros" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section id="catalog" className="section featured-books-section bg-slate-50 py-16">
        <div className="container">
          <h2 className="section-title text-3xl font-bold text-center mb-12">Livros em Destaque</h2>
          <div className="books-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
      <section className="section how-it-works-section py-16">
        <div className="container">
          <h2 className="section-title text-3xl font-bold text-center mb-12">Como Funciona</h2>
          <div className="steps-container grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="step text-center p-6 bg-white rounded-lg shadow-md">
              <div className="step-icon w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">Cadastre seu livro</h3>
              <p>Fotografe e cadastre os livros que você deseja doar ou trocar.</p>
            </div>
            <div className="step text-center p-6 bg-white rounded-lg shadow-md">
              <div className="step-icon w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">Escolha um livro</h3>
              <p>Navegue pelo catálogo e encontre o livro que você deseja ler.</p>
            </div>
            <div className="step text-center p-6 bg-white rounded-lg shadow-md">
              <div className="step-icon w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Combine a troca</h3>
              <p>Converse com o outro usuário e combine a entrega do livro.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button onClick={handleDonate} size="lg">Quero doar um livro</Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section bg-slate-50 py-16">
        <div className="container">
          <h2 className="section-title text-3xl font-bold text-center mb-12">O que dizem os leitores</h2>
          <div className="testimonials-container grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="section blog-section py-16">
        <div className="container">
          <h2 className="section-title text-3xl font-bold text-center mb-12">Blog e Dicas de Leitura</h2>
          <div className="blog-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <BlogCard key={index} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="section contact-section bg-slate-50 py-16">
        <div className="container">
          <h2 className="section-title text-3xl font-bold text-center mb-12">Entre em Contato</h2>
          <div className="contact-content grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="contact-info">
              <h3 className="text-xl font-semibold mb-4">Fale Conosco</h3>
              <p className="mb-4">Tem alguma dúvida ou sugestão? Entre em contato conosco.</p>
              <div className="contact-details space-y-2">
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
