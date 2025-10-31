import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CosmosParticles from '@/components/CosmosParticles';
import Navbar from '@/components/Navbar';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Activity,
  Link2,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: "Total Pagos",
      value: "$45,231",
      change: "+20.1%",
      icon: <DollarSign className="w-5 h-5" />,
      trend: "up"
    },
    {
      title: "Pagos Aprobados",
      value: "128",
      change: "+15%",
      icon: <CheckCircle className="w-5 h-5" />,
      trend: "up"
    },
    {
      title: "Clientes Activos",
      value: "12",
      change: "+3",
      icon: <Users className="w-5 h-5" />,
      trend: "up"
    },
    {
      title: "Tasa de Conversión",
      value: "94.2%",
      change: "+2.4%",
      icon: <TrendingUp className="w-5 h-5" />,
      trend: "up"
    }
  ];

  const recentPayments = [
    { id: "PAY-001", client: "Cliente A", amount: "$1,250", status: "approved", time: "Hace 5 min" },
    { id: "PAY-002", client: "Cliente B", amount: "$850", status: "pending", time: "Hace 12 min" },
    { id: "PAY-003", client: "Cliente C", amount: "$2,100", status: "approved", time: "Hace 1 hora" },
    { id: "PAY-004", client: "Cliente D", amount: "$450", status: "approved", time: "Hace 2 horas" },
    { id: "PAY-005", client: "Cliente E", amount: "$675", status: "failed", time: "Hace 3 horas" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprobado';
      case 'pending':
        return 'Pendiente';
      case 'failed':
        return 'Fallido';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen relative">
      <CosmosParticles />
      <Navbar />
      
      <main className="relative pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="gradient-text">Dashboard</span> de Pagos
              </h1>
              <p className="text-muted-foreground">
                Monitorea tus integraciones y transacciones en tiempo real
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="cosmic-border">
                <Link2 className="w-4 h-4 mr-2" />
                Conectar GHL
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 cosmic-glow">
                <Link2 className="w-4 h-4 mr-2" />
                Conectar Mercado Pago
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card hover:cosmic-glow transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500">
                      {stat.icon}
                    </div>
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Payments */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl">Pagos Recientes</CardTitle>
              <CardDescription>
                Últimas transacciones procesadas en tu sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div 
                    key={payment.id}
                    className="flex items-center justify-between p-4 rounded-lg glass-card hover:border-purple-500/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600/20 to-cyan-500/20">
                        {getStatusIcon(payment.status)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{payment.client}</p>
                        <p className="text-sm text-muted-foreground">{payment.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{payment.amount}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{payment.time}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          payment.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                          payment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {getStatusText(payment.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Integration Status */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>GoHighLevel</CardTitle>
                <CardDescription>Estado de la conexión</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Estado</span>
                  <span className="text-sm font-medium text-green-400 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Conectado
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subcuentas</span>
                  <span className="text-sm font-medium">5 activas</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Última sincronización</span>
                  <span className="text-sm font-medium">Hace 2 min</span>
                </div>
                <Button variant="outline" className="w-full cosmic-border mt-4">
                  Gestionar Conexión
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Mercado Pago</CardTitle>
                <CardDescription>Estado de la conexión</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Estado</span>
                  <span className="text-sm font-medium text-green-400 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Conectado
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Webhooks</span>
                  <span className="text-sm font-medium">Activos</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Última transacción</span>
                  <span className="text-sm font-medium">Hace 5 min</span>
                </div>
                <Button variant="outline" className="w-full cosmic-border mt-4">
                  Gestionar Conexión
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
