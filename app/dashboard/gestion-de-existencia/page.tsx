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
    Map

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
        producto: 150,
        almacen: 10,
        zona: 8,
        ubicacion: 25,
        inventario: 100
    };


    const card_: any[] = [
        { title: "Almacenes", icon: <Warehouse className="h-4 w-4 text-muted-foreground" />, value: stats.almacen, description: "Almacenes registrados", link: "/dashboard/gestion-de-existencia/Almacenes", link_text: "Gestionar almacenes" },
        { title: "Zonas", icon: <Map className="h-4 w-4 text-muted-foreground" />, value: stats.zona, description: "Zonas registradas", link: "/dashboard/gestion-de-existencia/Zonas", link_text: "Gestionar zonas" },
        { title: "Ubicaciones", icon: <HousePlus className="h-4 w-4 text-muted-foreground" />, value: stats.ubicacion, description: "Ubicaciones registradas", link: "/dashboard/gestion-de-existencia/Ubicaciones", link_text: "Gestionar ubicaciones" },
        { title: "Productos", icon: <Package2 className="h-4 w-4 text-muted-foreground" />, value: stats.producto, description: "Productos registrados", link: "/dashboard/gestion-de-existencia/Productos", link_text: "Gestionar productos" },
        { title: "Inventario", icon: <Package className="h-4 w-4 text-muted-foreground" />, value: stats.inventario, description: "Inventarios registrados", link: "/dashboard/gestion-de-existencia/Inventario", link_text: "Gestionar inventario" },
    ];

    const AccesosRapidos:any[]=[
        {name:"Crear Almacenes",icon:<Warehouse className="mr-2 h-4 w-4" />,link:"/dashboard/gestion-de-existencia/Almacenes/registrar-almacenes"},
        {name:"Crear Zonas",icon:<Map className="mr-2 h-4 w-4" />,link:"/dashboard/gestion-de-existencia/Zonas/registrar-zonas"},
        {name:"Crear Ubicaciones",icon:<HousePlus className="mr-2 h-4 w-4" />,link:"/dashboard/gestion-de-existencia/Ubicaciones/registrar-ubicacion"},
        {name:"Crear Productos",icon:<Package2 className="mr-2 h-4 w-4" />,link:"/dashboard/dashboard/gestion-de-existencia/Productos/registrar-producto"},
        {name:"Nuevo Inventario",icon:<Package className="mr-2 h-4 w-4" />,link:"/dashboard/gestion-de-existencia/Inventario/registrar-inventario"},
    ];

    return (
        <div className="space-y-6">
            {/* <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <Link href="/Almacen-e-Inventario/Productos">
                            <TabsTrigger value="Productos">
                                <Package2 className="h-4 w-4 mr-2" />
                                Productos
                            </TabsTrigger>
                        </Link>
                        <Link href="/Almacen-e-Inventario/Almacenes">
                            <TabsTrigger value="Almacenes">
                                <Warehouse className="h-4 w-4 mr-2" />
                                Almacenes
                            </TabsTrigger>
                        </Link>
                        <Link href="/Almacen-e-Inventario/Zonas">
                            <TabsTrigger value="Zonas">
                                <Map className="h-4 w-4 mr-2" />
                                Zonas
                            </TabsTrigger>
                        </Link>
                        <Link href="/Almacen-e-Inventario/Ubicaciones">
                            <TabsTrigger value="Ubicación">
                                <HousePlus className="h-4 w-4 mr-2" />
                                Ubicación
                            </TabsTrigger>
                        </Link>
                        <Link href="/Almacen-e-Inventario/Inventario">
                            <TabsTrigger value="Inventario">
                                <Package className="h-4 w-4 mr-2" />
                                Inventario
                            </TabsTrigger>
                        </Link>
                    </TabsList>
                </div>
            </Tabs> */}

            <div>
                <h1 className="text-3xl font-bold">Almacén E Inventario</h1>
                <p className="text-muted-foreground mt-1">
                    Gestiona los productos, almacenes y el inventario de tu empresa
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