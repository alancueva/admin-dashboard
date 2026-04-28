import { ArrowRight, Orbit, Package2, PackageOpen, Target } from 'lucide-react';
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
    producto: 150
  };

  const card_: any[] = [
    {
      title: 'Productos',
      icon: <PackageOpen className="h-4 w-4 text-muted-foreground" />,
      value: stats.producto,
      description: 'Productos registrados',
      link: '/dashboard/inventario/productos',
      link_text: 'Gestionar productos'
    },
    {
      title: 'Movimientos Inventario',
      icon: <Orbit className="h-4 w-4 text-muted-foreground" />,
      value: stats.producto,
      description: 'Movimientos Inventario registrados',
      link: '/dashboard/inventario/movimientos_inventario',
      link_text: 'Gestionar Movimientos Inventario'
    }
  ];

  const AccesosRapidos: any[] = [
    {
      name: 'Crear Productos',
      icon: <PackageOpen className="mr-2 h-4 w-4" />,
      link: '/dashboard/inventario/productos/registrar-productos'
    },
    {
      name: 'Registrar Movimientos',
      icon: <Orbit className="mr-2 h-4 w-4" />,
      link: '/dashboard/inventario/movimientos_inventario/registrar-movimiento-inventario'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventario</h1>
        <p className="text-muted-foreground mt-1">
          Gestiona los productos y movimientos de inventario
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
