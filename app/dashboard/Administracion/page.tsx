import {
  User,
  Building2,
  BriefcaseBusiness,
  ArrowRight,
  Users,
  Building,
  Briefcase,
  FileSearch,
  KeyRound
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
//import { getAdministracion } from '../../service/administracion/administracion.service';

interface defaultStats {
  usuarios: number;
  organizaciones: number;
  tiposNegocio: number;
  auditoria: number;
  roles: number;
}

const defaultStats: defaultStats = {
  usuarios: 0,
  organizaciones: 0,
  tiposNegocio: 0,
  auditoria: 0,
  roles: 0
};

export default async function AdministracionPage() {
  let stats = defaultStats;

  try {
    //const response: any = await getAdministracion();
    const response: any = {};
    // console.log(response);
    // console.log(response.data);

    if (response?.length) {
      const admin = response.data;

      stats = {
        usuarios: admin.numero_usuario,
        organizaciones: admin.numero_organizacion,
        tiposNegocio: admin.numero_tipo_negocio,
        auditoria: admin.numero_auditoria,
        roles: admin.numero_rol
      };
    }
  } catch (error) {
    console.error('Error:', error);
  }

  const card_: any[] = [
    {
      title: 'Organización',
      icon: <Building className="h-4 w-4 text-muted-foreground" />,
      value: stats.organizaciones,
      description: 'Organización registrada',
      link: '/dashboard/Administracion/organizaciones',
      link_text: 'Organización'
    },
    {
      title: 'Usuarios',
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      value: stats.usuarios,
      description: 'Usuarios registrados en el sistema',
      link: '/dashboard/Administracion/usuarios',
      link_text: 'Gestionar usuarios'
    },
    {
      title: 'Permisos',
      icon: <KeyRound className="h-4 w-4 text-muted-foreground" />,
      value: stats.roles,
      description: 'Permisos de Usuarios',
      link: '/dashboard/Administracion/permisos',
      link_text: 'Gestionar Permisos'
    },
    {
      title: 'Auditorias',
      icon: <FileSearch className="h-4 w-4 text-muted-foreground" />,
      value: stats.auditoria,
      description: 'Registros de auditoria',
      link: '/dashboard/Administracion/auditoria',
      link_text: 'Gestionar auditorias'
    }
  ];

  const AccesosRapidos: any[] = [
    {
      name: 'Crear usuario',
      icon: <User className="mr-2 h-4 w-4" />,
      link: '/dashboard/Administracion/usuarios/registrar-usuarios'
    },
    {
      name: 'Registrar Permisos',
      icon: <KeyRound className="mr-2 h-4 w-4" />,
      link: '/dashboard/Administracion/permisos/registrar-permisos'
    }
    // {name:"Nueva organización",icon:<Building2 className="mr-2 h-4 w-4" />,link:"/Administracion/organizaciones/registrar-organizacion"},
    // {name:"Nuevo tipo de negocio",icon:<BriefcaseBusiness className="mr-2 h-4 w-4" />,link:"/Administracion/tipos-negocio/nuevo"},
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Administración</h1>
        <p className="text-muted-foreground mt-1">
          Gestiona usuarios y permisos
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
