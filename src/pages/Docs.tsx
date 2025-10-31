import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CosmosParticles from '@/components/CosmosParticles';
import Navbar from '@/components/Navbar';
import { Code, Zap, Shield, CheckCircle, Book } from 'lucide-react';

const Docs = () => {
  return (
    <div className="min-h-screen relative">
      <CosmosParticles />
      <Navbar />
      
      <main className="relative pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-4xl space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold">
              <span className="gradient-text">Documentación</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Guía completa de instalación y configuración
            </p>
          </div>

          {/* Quick Start */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-2xl">Inicio Rápido</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Registra tu App en GHL</h3>
                    <p className="text-sm text-muted-foreground">
                      Ve a developers.gohighlevel.com y crea una nueva "Private App"
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Configura OAuth</h3>
                    <p className="text-sm text-muted-foreground">
                      Añade tus URLs de callback y scopes necesarios
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Conecta Mercado Pago</h3>
                    <p className="text-sm text-muted-foreground">
                      Autoriza tu cuenta de Mercado Pago mediante OAuth 2.0
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500 text-white font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Comienza a Procesar Pagos</h3>
                    <p className="text-sm text-muted-foreground">
                      Genera links de pago y recibe actualizaciones automáticas
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Reference */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-2xl">Endpoints Principales</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 rounded-lg glass-card">
                  <code className="text-sm text-cyan-400">POST /oauth/callback/ghl</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Callback de autorización OAuth para GoHighLevel
                  </p>
                </div>
                
                <div className="p-4 rounded-lg glass-card">
                  <code className="text-sm text-cyan-400">POST /oauth/callback/mp</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Callback de autorización OAuth para Mercado Pago
                  </p>
                </div>
                
                <div className="p-4 rounded-lg glass-card">
                  <code className="text-sm text-cyan-400">POST /payments/create</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Genera un nuevo link de pago de Mercado Pago
                  </p>
                </div>
                
                <div className="p-4 rounded-lg glass-card">
                  <code className="text-sm text-cyan-400">POST /webhooks/mp</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Recibe notificaciones de cambios de estado de pagos
                  </p>
                </div>
                
                <div className="p-4 rounded-lg glass-card">
                  <code className="text-sm text-cyan-400">GET /reconcile</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Ejecuta reconciliación diaria de pagos
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-2xl">Seguridad</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-sm text-muted-foreground">
                  Todos los tokens se almacenan cifrados en la base de datos
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-sm text-muted-foreground">
                  OAuth 2.0 para autenticación segura con GHL y Mercado Pago
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-sm text-muted-foreground">
                  Validación de webhooks con firmas criptográficas
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-sm text-muted-foreground">
                  Separación estricta de datos entre clientes (multi-tenant)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500">
                  <Book className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-2xl">Mejores Prácticas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                <li>Configura webhooks con reintentos automáticos</li>
                <li>Ejecuta reconciliación diaria para detectar discrepancias</li>
                <li>Monitorea logs de edge functions regularmente</li>
                <li>Mantén actualizados los tokens de refresh</li>
                <li>Implementa rate limiting en endpoints públicos</li>
                <li>Exporta reportes mensuales para auditoría</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Docs;
