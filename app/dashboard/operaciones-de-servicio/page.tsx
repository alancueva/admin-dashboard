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
  Warehouse,
  Package,
  Package2,
  HousePlus,
  Map,
  Salad,
  Grid3X3
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

export default function AlmaceneInventarioPage() {
  const stats = {
    mesas: 12,
    menu: 50
  };

  const card_: any[] = [
    {
      title: 'Mesas',
      icon: <Grid3X3 className="h-4 w-4 text-muted-foreground" />,
      value: stats.mesas,
      description: 'Mesas Registradas',
      link: '/dashboard/operaciones-de-servicio/mesa',
      link_text: 'Gestionar Mesas'
    },
    {
      title: 'Menú',
      icon: <Salad className="h-4 w-4 text-muted-foreground" />,
      value: stats.menu,
      description: 'Menú Registradas',
      link: '/dashboard/operaciones-de-servicio/menu',
      link_text: 'Gestionar Menú'
    }
  ];

  const AccesosRapidos: any[] = [
    {
      name: 'Registrar mesas',
      icon: <Grid3X3 className="mr-2 h-4 w-4" />,
      link: '/dashboard/gestion-de-existencia/Almacenes/registrar-almacenes'
    },
    {
      name: 'Registrar Menú',
      icon: <Salad className="mr-2 h-4 w-4" />,
      link: '/dashboard/gestion-de-existencia/Almacenes/registrar-almacenes'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Operaciones de Servicio</h1>
        <p className="text-muted-foreground mt-1">
          Gestión para Restaurante, Mesa, Menu, Pedido, Venta
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
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
