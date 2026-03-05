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
  Captions
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
    categoria: 5,
    unidad_medida: 20,
    tipo_documento: 5
  };

  const card_: any[] = [
    {
      title: 'Categorias',
      icon: <SwatchBook className="h-4 w-4 text-muted-foreground" />,
      value: stats.categoria,
      description: 'Categorias registrados en el sistema',
      link: '/dashboard/Catalogo/categoria',
      link_text: 'Gestionar Categorias'
    },
    {
      title: 'Unidad De Medidas',
      icon: <Ruler className="h-4 w-4 text-muted-foreground" />,
      value: stats.unidad_medida,
      description: 'Unidades de Medida registradas',
      link: '/dashboard/Catalogo/unidad-medida',
      link_text: 'Gestionar Unidades de Medida'
    },
    {
      title: 'Tipos de Documentos',
      icon: <Captions className="h-4 w-4 text-muted-foreground" />,
      value: stats.tipo_documento,
      description: 'Tipos de Documentos registradas',
      link: '/dashboard/Catalogo/tipo-documento',
      link_text: 'Gestionar Tipos de Documentos'
    }
  ];

  const AccesosRapidos: any[] = [
    {
      name: 'Registrar Categorias',
      icon: <SwatchBook className="mr-2 h-4 w-4" />,
      link: '/dashboard/Catalogo/categoria/registrar-categoria'
    },
    {
      name: 'Registrar Unidad de Medidas',
      icon: <Ruler className="mr-2 h-4 w-4" />,
      link: '/dashboard/Catalogo/unidad-medida/registrar-unidad-medida'
    },
    {
      name: 'Registrar Tipos de Documentos',
      icon: <Captions className="mr-2 h-4 w-4" />,
      link: '/dashboard/Catalogo/tipos-documentos/registrar-tipo-documento'
    }
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Catálogo</h1>
        <p className="text-muted-foreground mt-1">
          Gestiona las categorias, unidades de medidas y tipos de documentos
        </p>
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
