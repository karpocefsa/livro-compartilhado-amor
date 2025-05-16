
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ContactForm = () => {
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
    <form className="contact-form" onSubmit={handleSubmit}>
      {formError && <div className="form-error">{formError}</div>}
      {formSuccess && <div className="form-success">Mensagem enviada com sucesso!</div>}
      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <Input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Seu nome completo" 
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <Input 
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
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        ></textarea>
      </div>
      <Button type="submit">Enviar mensagem</Button>
    </form>
  );
};

export default ContactForm;
