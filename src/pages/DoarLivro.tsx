
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const DoarLivro = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    status: "Disponível",
    cover: ""
  });
  const navigate = useNavigate();
  
  // Verifica se usuário está logado
  const checkAuth = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("Você precisa estar logado para doar um livro");
      navigate("/login");
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Em um app real, aqui seria o upload da imagem para um servidor
      // Aqui estamos apenas simulando com um FileReader para preview local
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, cover: event.target?.result as string }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkAuth()) return;
    
    // Validação básica
    if (!formData.title || !formData.author || !formData.category) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Em um app real, aqui enviaria os dados para o backend
    // Aqui estamos apenas simulando o sucesso
    
    // Recuperamos os livros existentes (se houver)
    const existingBooksJSON = localStorage.getItem("donatedBooks");
    const existingBooks = existingBooksJSON ? JSON.parse(existingBooksJSON) : [];
    
    // Adicionamos o novo livro
    const newBook = {
      ...formData,
      id: Date.now(), // Simples ID único baseado no timestamp
      cover: formData.cover || "/images/book-placeholder.jpg" // Imagem padrão se não foi enviada
    };
    
    const updatedBooks = [...existingBooks, newBook];
    localStorage.setItem("donatedBooks", JSON.stringify(updatedBooks));
    
    toast.success("Livro cadastrado com sucesso!");
    navigate("/");
  };

  return (
    <div className="site-container flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-grow py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Doar um Livro</CardTitle>
              <CardDescription>
                Compartilhe conhecimento doando um livro para outra pessoa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título do Livro *</Label>
                    <Input 
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Ex: Dom Quixote"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="author">Autor *</Label>
                    <Input 
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="Ex: Miguel de Cervantes"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria *</Label>
                    <Select 
                      value={formData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ficção">Ficção</SelectItem>
                        <SelectItem value="Não-Ficção">Não-Ficção</SelectItem>
                        <SelectItem value="Fantasia">Fantasia</SelectItem>
                        <SelectItem value="Romance">Romance</SelectItem>
                        <SelectItem value="Técnico">Técnico</SelectItem>
                        <SelectItem value="Infantil">Infantil</SelectItem>
                        <SelectItem value="Biografia">Biografia</SelectItem>
                        <SelectItem value="História">História</SelectItem>
                        <SelectItem value="Aventura">Aventura</SelectItem>
                        <SelectItem value="Drama">Drama</SelectItem>
                        <SelectItem value="Terror">Terror</SelectItem>
                        <SelectItem value="Clássico">Clássico</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Tipo de Doação *</Label>
                    <Select 
                      value={formData.status}
                      onValueChange={(value) => handleSelectChange("status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Disponível">Disponível (Doação)</SelectItem>
                        <SelectItem value="Troca">Troca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição do Livro</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Conte um pouco sobre o livro, estado de conservação, etc."
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cover">Capa do Livro</Label>
                  <Input 
                    id="cover"
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                  />
                  {formData.cover && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                      <img 
                        src={formData.cover} 
                        alt="Preview da capa" 
                        className="h-40 object-contain"
                      />
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => navigate("/")}>Cancelar</Button>
              <Button onClick={handleSubmit}>Cadastrar Livro</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DoarLivro;
