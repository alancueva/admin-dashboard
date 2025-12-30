import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    User,
    Building2,
    BriefcaseBusiness,
    ArrowRight,
    Users,
    Building,
    Briefcase,
    ClipboardList,
    ClipboardCheck,
    ClipboardPenLine,
    SwatchBook,
    Ruler,
    Orbit

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
        entidad: 8
    };


    const card_: any[] = [
        { title: "Tipos de Movimiento", icon: <ClipboardList className="h-4 w-4 text-muted-foreground" />, value: stats.tipos_movimiento, description: "Tipos de Movimientos registrados en el sistema", link: "/dashboard/Operaciones-Comerciales/Tipos-Movimientos", link_text: "Gestionar Tipos de Movimiento" },
        { title: "Movimientos", icon: <Orbit className="h-4 w-4 text-muted-foreground" />, value: stats.movimiento, description: "Movimientos registradas", link: "/dashboard/Operaciones-Comerciales/Movimientos", link_text: "Gestionar Movimientos" },
        { title: "Entidad", icon: <BriefcaseBusiness className="h-4 w-4 text-muted-foreground" />, value: stats.entidad, description: "Entidad registradas", link: "/dashboard/Operaciones-Comerciales/Entidad", link_text: "Entidad registradas" },
    ];

    const AccesosRapidos: any[] = [
        { name: "Crear Tipo de Movimientos", icon: <ClipboardList className="mr-2 h-4 w-4" />, link: "/dashboard/Operaciones-Comerciales/tipos-movimientos/registrar-tipos-de-movimientos" },
        { name: "Crear Movimientos", icon: <Orbit className="mr-2 h-4 w-4" />, link: "/dashboard/Operaciones-Comerciales/Movimientos/registrar-movimientos" },
        { name: "Nuevo Entidad", icon: <BriefcaseBusiness className="mr-2 h-4 w-4" />, link: "/dashboard/Operaciones-Comerciales/Entidad/registrar-entidad" },
    ];
    return (
        <div className="space-y-6">
            {/* <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <Link href="/Operaciones-Comerciales/Tipos-Movimientos">
                            <TabsTrigger value="Tipos-de-Movimientos">
                                <ClipboardList className="h-4 w-4 mr-2" />
                                Tipos de Movimientos
                            </TabsTrigger>
                        </Link>
                        <Link href="/Operaciones-Comerciales/Movimientos">
                            <TabsTrigger value="Movimientos">
                                <Orbit className="h-4 w-4 mr-2" />
                                Movimientos
                            </TabsTrigger>
                        </Link>
                        <Link href="/Operaciones-Comerciales/Entidad">
                            <TabsTrigger value="Entidad">
                                <BriefcaseBusiness className="h-4 w-4 mr-2" />
                                Entidad
                            </TabsTrigger>
                        </Link>
                        <Link href="/Operaciones-Comerciales/Orden-de-Compra">
                            <TabsTrigger value="Orden-de-Compra">
                                <ClipboardCheck className="h-4 w-4 mr-2" />
                                Orden de Compra
                            </TabsTrigger>
                        </Link>
                        <Link href="/Operaciones-Comerciales/Solicitud-de-Materiales">
                            <TabsTrigger value="Solicitar-Materiales">
                                <ClipboardPenLine className="h-4 w-4 mr-2" />
                                Solicitar Materiales
                            </TabsTrigger>
                        </Link>
                    </TabsList>
                </div>
            </Tabs> */}

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