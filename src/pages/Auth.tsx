import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CosmosParticles from '@/components/CosmosParticles';
import { Rocket, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulated auth - replace with actual Supabase auth
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Bienvenido de vuelta!",
        description: "Iniciando sesión...",
      });
    }, 1500);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Cuenta creada!",
        description: "Configurando tu espacio...",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 py-12">
      <CosmosParticles />
      
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 group z-10">
        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 cosmic-glow">
          <Rocket className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold gradient-text">RP Pagos</span>
      </Link>

      <Card className="w-full max-w-md glass-card cosmic-border relative z-10">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">
            <span className="gradient-text">Bienvenido</span>
          </CardTitle>
          <CardDescription>
            Conecta tu cuenta para gestionar integraciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="signup">Registrarse</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      placeholder="tu@email.com"
                      type="email"
                      className="pl-10 glass-card"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type="password"
                      className="pl-10 glass-card"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 cosmic-glow"
                  disabled={isLoading}
                >
                  {isLoading ? "Iniciando..." : "Iniciar Sesión"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    className="glass-card"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      placeholder="tu@email.com"
                      type="email"
                      className="pl-10 glass-card"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      placeholder="••••••••"
                      type="password"
                      className="pl-10 glass-card"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 cosmic-glow"
                  disabled={isLoading}
                >
                  {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Al continuar, aceptas nuestros términos y condiciones
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
