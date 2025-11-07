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

    return (
        <div className="space-y-6">
            <Tabs defaultValue="all">
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
            </Tabs>

            <div>
                <h1 className="text-3xl font-bold">Almacén E Inventario</h1>
                <p className="text-muted-foreground mt-1">
                    Gestiona los productos, almacenes y el inventario de tu empresa
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {/* Card Productos */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Productos</CardTitle>
                        <Package2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.producto}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Productos registrados en el sistema
                        </p>
                        <Link href="/Almacen-e-Inventario/Productos">
                            <Button variant="ghost" size="sm" className="mt-3 w-full">
                                Gestionar Productos
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Card Almacenes */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Almacenes</CardTitle>
                        <Warehouse className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.almacen}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Almacenes registrados en el sistema
                        </p>
                        <Link href="/Almacen-e-Inventario/Almacenes">
                            <Button variant="ghost" size="sm" className="mt-3 w-full">
                                Gestionar Almacenes
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Card Zonas */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Zonas</CardTitle>
                        <Map className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.zona}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Zonas registradas en el sistema
                        </p>
                        <Link href="/Almacen-e-Inventario/Zonas">
                            <Button variant="ghost" size="sm" className="mt-3 w-full">
                                Gestionar Zonas
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Card Ubicación */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Ubicaciones</CardTitle>
                        <HousePlus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.ubicacion}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Ubicaciones registradas en el sistema
                        </p>
                        <Link href="/Almacen-e-Inventario/Ubicaciones">
                            <Button variant="ghost" size="sm" className="mt-3 w-full">
                                Gestionar Ubicaciones
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Card Inventario */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Inventario</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.inventario}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Inventarios registrados en el sistema
                        </p>
                        <Link href="/Almacen-e-Inventario/Inventario">
                            <Button variant="ghost" size="sm" className="mt-3 w-full">
                                Gestionar Inventarios
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>


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
                    <Link href="/Almacen-e-Inventario/Productos/registrar-producto">
                        <Button variant="outline" className="w-full justify-start">
                            <Package2 className="mr-2 h-4 w-4" />
                            Crear Productos
                        </Button>
                    </Link>
                    <Link href="/Almacen-e-Inventario/Inventario/registrar-inventario">
                        <Button variant="outline" className="w-full justify-start">
                            <Warehouse className="mr-2 h-4 w-4" />
                            crear Almacenes
                        </Button>
                    </Link>
                    <Link href="/Almacen-e-Inventario/Zonas/registrar-zonas">
                        <Button variant="outline" className="w-full justify-start">
                            <Map className="mr-2 h-4 w-4" />
                            Crear Zonas
                        </Button>
                    </Link>
                    <Link href="/Almacen-e-Inventario/Inventario/registrar-ubicacion">
                        <Button variant="outline" className="w-full justify-start">
                            <HousePlus className="mr-2 h-4 w-4" />
                            Crear Ubicaciones
                        </Button>
                    </Link>
                    <Link href="/Almacen-e-Inventario/Inventario/registrar-inventario">
                        <Button variant="outline" className="w-full justify-start">
                            <Package className="mr-2 h-4 w-4" />
                            Nuevo Inventario
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}