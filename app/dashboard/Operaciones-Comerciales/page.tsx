import {
  BriefcaseBusiness,
  ArrowRight,
  ClipboardList,
  Orbit,
  ReceiptText
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

export default function OperacionComercialesPage() {
  const stats = {
    tipos_movimiento: 5,
    movimiento: 20,
    entidad: 8,
    ventas: 200
  };

  const card_: any[] = [
    {
      title: 'Ventas',
      icon: <ReceiptText className="h-4 w-4 text-muted-foreground" />,
      value: stats.ventas,
      description: 'Ventas registrados en el sistema',
      link: '/dashboard/Operaciones-Comerciales/ventas',
      link_text: 'Gestionar Ventas'
    }
    // { title: "Tipos de Movimiento", icon: <ClipboardList className="h-4 w-4 text-muted-foreground" />, value: stats.tipos_movimiento, description: "Tipos de Movimientos registrados en el sistema", link: "/dashboard/Operaciones-Comerciales/Tipos-Movimientos", link_text: "Gestionar Tipos de Movimiento" },
    // { title: "Movimientos", icon: <Orbit className="h-4 w-4 text-muted-foreground" />, value: stats.movimiento, description: "Movimientos registradas", link: "/dashboard/Operaciones-Comerciales/Movimientos", link_text: "Gestionar Movimientos" },
    // { title: "Entidad", icon: <BriefcaseBusiness className="h-4 w-4 text-muted-foreground" />, value: stats.entidad, description: "Entidad registradas", link: "/dashboard/Operaciones-Comerciales/Entidad", link_text: "Entidad registradas" },
  ];

  const AccesosRapidos: any[] = [
    //{ name: "Crear Tipo de Movimientos", icon: <ClipboardList className="mr-2 h-4 w-4" />, link: "/dashboard/Operaciones-Comerciales/ventas/" },
    // { name: "Crear Tipo de Movimientos", icon: <ClipboardList className="mr-2 h-4 w-4" />, link: "/dashboard/Operaciones-Comerciales/Tipos-Movimientos/registrar-tipos-de-movimientos" },
    // { name: "Crear Movimientos", icon: <Orbit className="mr-2 h-4 w-4" />, link: "/dashboard/Operaciones-Comerciales/Movimientos/registrar-movimientos" },
    // { name: "Nuevo Entidad", icon: <BriefcaseBusiness className="mr-2 h-4 w-4" />, link: "/dashboard/Operaciones-Comerciales/Entidad/registrar-entidad" },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Operaciones Comerciales</h1>
        <p className="text-muted-foreground mt-1">
          Gestiona las Operaciones Comerciales de tu empresa desde este panel.
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

      {/* Card Entidad */}
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
