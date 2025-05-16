
import { useState } from 'react';

const Index = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple form validation
    if (!name || !email || !message) {
      setFormError('Por favor, preencha todos os campos');
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      setFormError('Por favor, insira um email válido');
      return;
    }
    
    // Form submission would go here in a real application
    console.log('Form submitted:', { name, email, message });
    setFormSuccess(true);
    setFormError('');
    setName('');
    setEmail('');
    setMessage('');
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setFormSuccess(false);
    }, 3000);
  };

  return (
    <div className="site-container">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <a href="#"><h1>LivroCompartilhado</h1></a>
            </div>
            <nav className="main-nav">
              <ul>
                <li><a href="#" className="active">Início</a></li>
                <li><a href="#about">Sobre</a></li>
                <li><a href="#catalog">Catálogo</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contact">Contato</a></li>
              </ul>
            </nav>
            <div className="header-buttons">
              <button className="search-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="btn login-btn">Entrar</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Bem-vindo ao LivroCompartilhado</h1>
              <p>Compartilhe histórias, espalhe conhecimento</p>
              <div className="hero-buttons">
                <button className="btn">Doe um livro</button>
                <button className="btn btn-outline">Encontre um livro</button>
              </div>
            </div>
            <div className="hero-image">
              <img src="https://via.placeholder.com/500x400" alt="Pilha de livros" />
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
              <button className="btn">Saiba mais</button>
            </div>
            <div className="about-image">
              <img src="https://via.placeholder.com/400x300" alt="Leitores compartilhando livros" />
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
              <div className="book-card card" key={index}>
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
                  <button className="btn btn-sm">Solicitar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="section how-it-works-section">
        <div className="container">
          <h2 className="section-title">Como Funciona</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-icon">1</div>
              <h3>Cadastre seu livro</h3>
              <p>Fotografe e cadastre os livros que você deseja doar ou trocar.</p>
            </div>
            <div className="step">
              <div className="step-icon">2</div>
              <h3>Escolha um livro</h3>
              <p>Navegue pelo catálogo e encontre o livro que você deseja ler.</p>
            </div>
            <div className="step">
              <div className="step-icon">3</div>
              <h3>Combine a troca</h3>
              <p>Converse com o outro usuário e combine a entrega do livro.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">O que dizem os leitores</h2>
          <div className="testimonials-container">
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-card card" key={index}>
                <div className="testimonial-avatar">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <h4 className="testimonial-name">{testimonial.name}</h4>
                <p className="testimonial-role">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="section blog-section">
        <div className="container">
          <h2 className="section-title">Blog e Dicas de Leitura</h2>
          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <div className="blog-card card" key={index}>
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blog-content">
                  <div className="blog-date">{post.date}</div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <a href="#" className="blog-link">Leia mais</a>
                </div>
              </div>
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
              <h3>Fale Conosco</h3>
              <p>Tem alguma dúvida ou sugestão? Entre em contato conosco.</p>
              <div className="contact-details">
                <p><strong>Email:</strong> contato@livrocompartilhado.com</p>
                <p><strong>Telefone:</strong> (11) 9999-9999</p>
                <p><strong>Horário:</strong> Segunda a Sexta, 9h às 18h</p>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              {formError && <div className="form-error">{formError}</div>}
              {formSuccess && <div className="form-success">Mensagem enviada com sucesso!</div>}
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input 
                  type="text" 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Seu nome completo" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="seu.email@exemplo.com" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensagem</label>
                <textarea 
                  id="message" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Escreva sua mensagem..." 
                  rows={5}
                ></textarea>
              </div>
              <button type="submit" className="btn">Enviar mensagem</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h2>LivroCompartilhado</h2>
              <p>Compartilhe histórias, espalhe conhecimento</p>
            </div>
            <div className="footer-links">
              <h3>Links</h3>
              <ul>
                <li><a href="#">Início</a></li>
                <li><a href="#about">Sobre</a></li>
                <li><a href="#catalog">Catálogo</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contact">Contato</a></li>
              </ul>
            </div>
            <div className="footer-legal">
              <h3>Legal</h3>
              <ul>
                <li><a href="#">Termos de Uso</a></li>
                <li><a href="#">Política de Privacidade</a></li>
                <li><a href="#">Perguntas Frequentes</a></li>
              </ul>
            </div>
            <div className="footer-newsletter">
              <h3>Newsletter</h3>
              <p>Inscreva-se para receber novidades</p>
              <div className="newsletter-form">
                <input type="email" placeholder="seu.email@exemplo.com" />
                <button className="btn btn-sm">Inscrever</button>
              </div>
              <div className="footer-social">
                <a href="#"><div className="social-icon">F</div></a>
                <a href="#"><div className="social-icon">I</div></a>
                <a href="#"><div className="social-icon">T</div></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 LivroCompartilhado. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Sample data for the books
const featuredBooks = [
  {
    title: "O Pequeno Príncipe",
    author: "Antoine de Saint-Exupéry",
    cover: "https://via.placeholder.com/200x300",
    category: "Ficção",
    status: "Disponível"
  },
  {
    title: "O Alquimista",
    author: "Paulo Coelho",
    cover: "https://via.placeholder.com/200x300",
    category: "Ficção",
    status: "Troca"
  },
  {
    title: "Harry Potter e a Pedra Filosofal",
    author: "J.K. Rowling",
    cover: "https://via.placeholder.com/200x300",
    category: "Fantasia",
    status: "Disponível"
  },
  {
    title: "A Cabana",
    author: "William P. Young",
    cover: "https://via.placeholder.com/200x300",
    category: "Drama",
    status: "Troca"
  },
  {
    title: "O Senhor dos Anéis",
    author: "J.R.R. Tolkien",
    cover: "https://via.placeholder.com/200x300",
    category: "Fantasia",
    status: "Disponível"
  },
  {
    title: "Dom Quixote",
    author: "Miguel de Cervantes",
    cover: "https://via.placeholder.com/200x300",
    category: "Clássico",
    status: "Troca"
  }
];

// Sample data for testimonials
const testimonials = [
  {
    name: "Maria Silva",
    role: "Professora",
    avatar: "https://via.placeholder.com/100",
    text: "O LivroCompartilhado me ajudou a renovar minha biblioteca pessoal e a encontrar títulos que eu procurava há anos!"
  },
  {
    name: "João Santos",
    role: "Estudante",
    avatar: "https://via.placeholder.com/100",
    text: "Como estudante, conseguir livros acadêmicos através do site facilitou demais minha vida universitária."
  },
  {
    name: "Ana Costa",
    role: "Escritora",
    avatar: "https://via.placeholder.com/100",
    text: "Adoro a comunidade que se forma aqui. Já fiz amizades e descobri novos autores incríveis através das trocas."
  }
];

// Sample data for blog posts
const blogPosts = [
  {
    title: "Como organizar sua estante de livros",
    date: "10 de Maio, 2025",
    image: "https://via.placeholder.com/400x250",
    excerpt: "Dicas práticas para organizar sua coleção de livros de forma funcional e visualmente atraente."
  },
  {
    title: "Os 10 livros mais trocados do ano",
    date: "5 de Maio, 2025",
    image: "https://via.placeholder.com/400x250",
    excerpt: "Confira a lista dos livros mais populares entre os usuários da nossa plataforma nos últimos meses."
  },
  {
    title: "Por que doar livros é importante?",
    date: "28 de Abril, 2025",
    image: "https://via.placeholder.com/400x250",
    excerpt: "Entenda como a doação de livros pode impactar positivamente a vida de pessoas e comunidades."
  }
];

export default Index;
