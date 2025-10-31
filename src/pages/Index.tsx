import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CosmosParticles from '@/components/CosmosParticles';
import Navbar from '@/components/Navbar';
import { 
  Rocket, 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  Globe,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Integración Automática",
      description: "Conecta GoHighLevel y Mercado Pago en minutos con OAuth 2.0 seguro"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Pagos Seguros",
      description: "Procesa pagos con la seguridad de Mercado Pago y sincronización automática"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Reconciliación Diaria",
      description: "Reportes automáticos y reconciliación financiera sin esfuerzo"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-Cliente",
      description: "Gestiona múltiples subcuentas desde un solo panel administrativo"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Webhooks en Tiempo Real",
      description: "Actualizaciones instantáneas del estado de pagos en GHL"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Instalación Privada",
      description: "App exclusiva por invitación, lista para comercializar"
    }
  ];

  const benefits = [
    "Autorización OAuth segura para GHL y Mercado Pago",
    "Generación de links de pago desde citas y contactos",
    "Actualización automática de estados en GHL",
    "Panel administrativo con métricas en tiempo real",
    "Exportación de reportes en CSV/JSON",
    "Webhooks automáticos y reintentos inteligentes"
  ];

  return (
    <div className="min-h-screen relative">
      <CosmosParticles />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/50 text-purple-300 text-sm font-medium cosmic-glow">
                🚀 Integración GHL ↔ Mercado Pago
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="gradient-text">Pagos Automatizados</span>
              <br />
              <span className="text-foreground">para GoHighLevel</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Transforma tu workflow de pagos con nuestra integración completa.
              Conecta, procesa y reconcilia pagos automáticamente.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 cosmic-glow text-lg px-8 py-6">
                  Comenzar Ahora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button size="lg" variant="outline" className="cosmic-border text-lg px-8 py-6">
                  Ver Documentación
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Características</span> Potentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Todo lo que necesitas para integrar pagos profesionales
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="glass-card hover:cosmic-glow transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white cosmic-glow">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-secondary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Por qué <span className="gradient-text">RP Pagos</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 p-4 rounded-lg glass-card hover:border-purple-500/50 transition-all"
              >
                <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <p className="text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="glass-card cosmic-glow">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Listo para <span className="gradient-text">Despegar</span>?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Únete a agencias y empresas que ya están automatizando sus pagos
                con nuestra plataforma de integración profesional.
              </p>
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 cosmic-glow text-lg px-8 py-6">
                  Instalar App Privada
                  <Rocket className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-border/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">RP Pagos</span>
            </div>
            <p className="text-muted-foreground text-center">
              © 2025 RP Pagos. Integración GHL ↔ Mercado Pago
            </p>
            <div className="flex gap-6">
              <Link to="/docs" className="text-muted-foreground hover:text-secondary transition-colors">
                Documentación
              </Link>
              <Link to="/dashboard" className="text-muted-foreground hover:text-secondary transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
