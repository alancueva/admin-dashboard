import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Building2, BriefcaseBusiness, ArrowRight, Users, Building, Briefcase
    , FileSearch
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

export default function AdministracionPage() {

     // Datos de ejemplo - reemplaza con datos reales de tu API
    const stats = {
        usuarios: 24,
        organizaciones: 8,
        tiposNegocio: 12,
        auditoria: 100,
    };

    const listado_tabs:any[]=[
        {name:"Usuarios",icon:<User className="h-4 w-4 mr-2" />,link:"/Administracion/usuarios"},
        {name:"Organizacion",icon:<Building2 className="h-4 w-4 mr-2" />,link:"/Administracion/organizaciones"},
        {name:"Tipo de Negocio",icon:<BriefcaseBusiness className="h-4 w-4 mr-2" />,link:"/Administracion/tipos-negocio"},
        {name:"Auditoria",icon:<FileSearch className="h-4 w-4 mr-2" />,link:"/Administracion/auditoria"},
    ];

    const card_:any[]=[
        {title:"Usuarios",icon:<Users className="h-4 w-4 text-muted-foreground" />,value:stats.usuarios,description:"Usuarios registrados en el sistema",link:"/Administracion/usuarios",link_text:"Gestionar usuarios"},
        {title:"Organizaciones",icon:<Building className="h-4 w-4 text-muted-foreground" />,value:stats.organizaciones,description:"Empresas registradas",link:"/Administracion/organizaciones",link_text:"Gestionar organizaciones"},
        {title:"Tipos de Negocio",icon:<Briefcase className="h-4 w-4 text-muted-foreground" />,value:stats.tiposNegocio,description:"Industrias disponibles",link:"/Administracion/tipos-negocio",link_text:"Gestionar tipos"},
        {title:"Auditorias",icon:<FileSearch className="h-4 w-4 text-muted-foreground" />,value:stats.auditoria,description:"Registros de auditoria",link:"/Administracion/auditoria",link_text:"Gestionar auditorias"},
    ];

    const AccesosRapidos:any[]=[
        {name:"Crear usuario",icon:<User className="mr-2 h-4 w-4" />,link:"/Administracion/usuarios/nuevo"},
        {name:"Nueva organización",icon:<Building2 className="mr-2 h-4 w-4" />,link:"/Administracion/organizaciones/nueva"},
        {name:"Nuevo tipo de negocio",icon:<BriefcaseBusiness className="mr-2 h-4 w-4" />,link:"/Administracion/tipos-negocio/nuevo"},
    ];

    return (
        <div className="space-y-6">
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        {listado_tabs.map((tab)=>(
                            <Link key={tab.name} href={tab.link}>
                                <TabsTrigger value={tab.name}>
                                    {tab.icon}
                                    {tab.name}
                                </TabsTrigger>
                            </Link>
                        ))}

                        {/* <Link href="/Administracion/usuarios">
                            <TabsTrigger value="Usuarios">
                                <User className="h-4 w-4 mr-2" />
                                Usuario
                            </TabsTrigger>
                        </Link>
                        <Link href="/Administracion/organizaciones">
                            <TabsTrigger value="Organizacion">
                                <Building2 className="h-4 w-4 mr-2" />
                                Organización
                            </TabsTrigger>
                        </Link>
                        <Link href="/Administracion/tipos-negocio">
                            <TabsTrigger value="tipos-negocio">
                                <BriefcaseBusiness className="h-4 w-4 mr-2" />
                                Tipo de Negocio
                            </TabsTrigger>
                        </Link>
                        <Link href="/Administracion/auditoria">
                            <TabsTrigger value="auditoria">
                                <BriefcaseBusiness className="h-4 w-4 mr-2" />
                                Auditoria
                            </TabsTrigger>
                        </Link> */}
                    </TabsList>
                </div>
            </Tabs>

            <div>
                <h1 className="text-3xl font-bold">Administración</h1>
                <p className="text-muted-foreground mt-1">
                    Gestiona usuarios, organizaciones y tipos de negocio del sistema
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">

                {card_.map((card)=>(
                    <Card key={card.title} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                            {card.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                            <Link href={card.link}>
                                <Button variant="ghost" size="sm" className="mt-3 w-full">
                                    {card.link_text}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}

                {/* <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.usuarios}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Usuarios registrados en el sistema
                        </p>
                        <Link href="/Administracion/usuarios">
                            <Button variant="ghost" size="sm" className="mt-3 w-full">
                                Gestionar usuarios
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>


                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Organizaciones</CardTitle>
                        <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.organizaciones}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Empresas registradas
                        </p>
                        <Link href="/Administracion/organizaciones">
                            <Button variant="ghost" size="sm" className="mt-3 w-full">
                                Gestionar organizaciones
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>


                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Tipos de Negocio</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.tiposNegocio}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Industrias disponibles
                        </p>
                        <Link href="/Administracion/tipos-negocio">
                            <Button variant="ghost" size="sm" className="mt-3 w-full">
                                Gestionar tipos
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card> */}
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
                    {AccesosRapidos.map((acceso)=>(
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