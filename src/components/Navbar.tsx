import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 cosmic-glow">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">RP Pagos</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground/80 hover:text-secondary transition-colors">
              Inicio
            </Link>
            <Link to="/dashboard" className="text-foreground/80 hover:text-secondary transition-colors">
              Dashboard
            </Link>
            <Link to="/docs" className="text-foreground/80 hover:text-secondary transition-colors">
              Documentación
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="outline" className="cosmic-border">
                Iniciar Sesión
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 cosmic-glow">
                Comenzar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
