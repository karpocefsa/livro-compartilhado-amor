
import { useState } from "react";
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
  const navigate = useNavigate();

  // Simulação de autenticação básica
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    if (!isLogin && !name) {
      toast.error("Por favor, informe seu nome para cadastro.");
      return;
    }

    // Em um app real, aqui seria a integração com sistema de autenticação
    if (isLogin) {
      // Simula login bem-sucedido
      localStorage.setItem("user", JSON.stringify({ email, name: "Usuário" }));
      toast.success("Login realizado com sucesso!");
    } else {
      // Simula cadastro bem-sucedido
      localStorage.setItem("user", JSON.stringify({ email, name }));
      toast.success("Cadastro realizado com sucesso!");
    }
    
    // Redireciona para página inicial após autenticação
    navigate("/");
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
            <Button onClick={handleAuth} className="w-full">
              {isLogin ? "Entrar" : "Cadastrar"}
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
