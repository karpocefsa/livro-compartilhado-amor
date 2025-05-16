
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Verifica se já está logado
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/');
    }
  }, [navigate]);

  // Função para buscar usuários existentes
  const getRegisteredUsers = () => {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  };

  // Função para registrar um novo usuário
  const registerUser = (newUser: { name: string; email: string; password: string }) => {
    const users = getRegisteredUsers();
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  // Função para verificar login
  const checkLogin = (email: string, password: string) => {
    const users = getRegisteredUsers();
    return users.find(user => user.email === email && user.password === password);
  };

  // Manipulador de autenticação
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    if (!isLogin && !name) {
      toast.error("Por favor, informe seu nome para cadastro.");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      if (isLogin) {
        // Processo de login
        const user = checkLogin(email, password);
        if (user) {
          const userData = { email, name: user.name };
          localStorage.setItem("user", JSON.stringify(userData));
          toast.success("Login realizado com sucesso!");
          navigate("/");
        } else {
          toast.error("Email ou senha incorretos.");
        }
      } else {
        // Processo de cadastro
        const users = getRegisteredUsers();
        const existingUser = users.find(user => user.email === email);
        
        if (existingUser) {
          toast.error("Este email já está cadastrado.");
        } else {
          registerUser({ name, email, password });
          localStorage.setItem("user", JSON.stringify({ email, name }));
          toast.success("Cadastro realizado com sucesso!");
          navigate("/");
        }
      }
      setLoading(false);
    }, 800); // Simula tempo de resposta do servidor
  };

  return (
    <div className="site-container flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{isLogin ? "Entrar" : "Cadastrar"}</CardTitle>
            <CardDescription>
              {isLogin 
                ? "Entre com sua conta para acessar o LivroCompartilhado"
                : "Crie sua conta para fazer parte da comunidade"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              onClick={handleAuth} 
              className="w-full" 
              disabled={loading}
            >
              {loading ? "Processando..." : isLogin ? "Entrar" : "Cadastrar"}
            </Button>
            <p className="text-center text-sm">
              {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)}
                className="underline text-primary hover:text-primary/80"
              >
                {isLogin ? "Cadastre-se" : "Faça login"}
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
