import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  User,
  Building2,
  BriefcaseBusiness,
  ArrowRight,
  Users,
  Building,
  Briefcase,
  SwatchBook,
  Ruler,
  Captions,
  Grid3X3,
  Salad,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';

export default function CatalogoPage() {
  const stats = {
    caja: 5,
    movimientos: 10
  };

  const card_: any[] = [
    {
      title: 'Caja Arqueo',
      icon: <Package className="h-4 w-4 text-muted-foreground" />,
      value: stats.caja,
      description: 'Caja arqueos registrados en el sistema',
      link: '/dashboard/caja/caja-arqueo',
      link_text: 'Gestionar Caja'
    },
    {
      title: 'Caja Movimiento',
      icon: <Package className="h-4 w-4 text-muted-foreground" />,
      value: stats.movimientos,
      description: 'Caja Movimiento registrados en el sistema',
      link: '/dashboard/caja/caja-movimiento',
      link_text: 'Gestionar movimiento de Caja'
    }
  ];

  const AccesosRapidos: any[] = [
    {
      name: 'Registrar Caja',
      icon: <Package className="mr-2 h-4 w-4" />,
      link: '/dashboard/caja/caja-arqueo/registrar-caja-arqueo'
    },
    {
      name: 'Registrar Caja Movimiento',
      icon: <Package className="mr-2 h-4 w-4" />,
      link: '/dashboard/caja/caja-movimiento/registrar-caja-movimiento'
    }
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Caja</h1>
        <p className="text-muted-foreground mt-1">Gestion de caja Arqueo</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Card Categorias */}
        {card_.map((card) => (
          <Card key={card.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
              <Link href={card.link}>
                <Button variant="ghost" size="sm" className="mt-3 w-full">
                  {card.link_text}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Card de acceso rápido */}
      <Card>
        <CardHeader>
          <CardTitle>Accesos Rápidos</CardTitle>
          <CardDescription>
            Accede directamente a las funciones más utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-3">
          {AccesosRapidos.map((acceso) => (
            <Link key={acceso.name} href={acceso.link}>
              <Button variant="outline" className="w-full justify-start">
                {acceso.icon}
                {acceso.name}
              </Button>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
