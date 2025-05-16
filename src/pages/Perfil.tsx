
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookCard, { Book } from "../components/BookCard";

interface User {
  name: string;
  email: string;
}

const Perfil = () => {
  const [user, setUser] = useState<User | null>(null);
  const [donatedBooks, setDonatedBooks] = useState<Book[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o usuário está logado
    const userData = localStorage.getItem("user");
    
    if (!userData) {
      toast.error("Você precisa estar logado para acessar seu perfil");
      navigate("/login");
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setFormData(prev => ({
      ...prev,
      name: parsedUser.name || "",
      email: parsedUser.email || ""
    }));

    // Recupera os livros doados pelo usuário (em um app real isso viria do backend)
    const donatedBooksJSON = localStorage.getItem("donatedBooks");
    if (donatedBooksJSON) {
      setDonatedBooks(JSON.parse(donatedBooksJSON));
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || !formData.email) {
      toast.error("Nome e email são obrigatórios");
      return;
    }
    
    // Simula atualização bem-sucedida
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email
    };
    
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast.success("Perfil atualizado com sucesso!");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error("Todos os campos de senha são obrigatórios");
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    
    // Simulação de alteração bem-sucedida
    toast.success("Senha alterada com sucesso!");
    
    // Limpa campos de senha
    setFormData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  // Se não há usuário, não renderiza o conteúdo
  if (!user) return null;

  return (
    <div className="site-container flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-grow py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>
          
          <Tabs defaultValue="profile">
            <TabsList className="mb-8">
              <TabsTrigger value="profile">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="books">Meus Livros</TabsTrigger>
              <TabsTrigger value="password">Alterar Senha</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>
                    Atualize suas informações de perfil
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Seu nome completo"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        type="email"
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="destructive" onClick={handleLogout}>
                    Sair da Conta
                  </Button>
                  <Button onClick={handleProfileUpdate}>Salvar Alterações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="books">
              <Card>
                <CardHeader>
                  <CardTitle>Meus Livros Doados</CardTitle>
                  <CardDescription>
                    Livros que você disponibilizou para doação ou troca
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {donatedBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {donatedBooks.map((book, index) => (
                        <BookCard key={index} book={book} onRequest={() => {}} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        Você ainda não doou nenhum livro.
                      </p>
                      <Button onClick={() => navigate("/doar")}>
                        Doar um Livro
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Alterar Senha</CardTitle>
                  <CardDescription>
                    Mantenha sua senha segura alterando-a periodicamente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Senha Atual</Label>
                      <Input 
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nova Senha</Label>
                      <Input 
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                      <Input 
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button onClick={handlePasswordChange}>Alterar Senha</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Perfil;
