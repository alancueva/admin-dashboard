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
        entidad: 8,
        orden_compra: 15,
        solicitar_materiales: 12
    };

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
                {/* Card Tipo Movimiento */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Tipos de Movimiento</CardTitle>
                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.tipos_movimiento}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Tipos de Movimientos registrados en el sistema
                        </p>
                        <Link href="/Operaciones-Comerciales/Tipos-Movimientos">
                            <Button variant="ghost" size="sm" className="mt-3 w-full">
                                Gestionar Tipos de Movimiento
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Card Movimientos */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Movimientos</CardTitle>
                        <Orbit className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.movimiento}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Movimientos registradas
                        </p>
                        <Link href="/Operaciones-Comerciales/Movimientos">
                            <Button variant="ghost" size="sm" className="mt-3 w-full">
                                Gestionar Movimientos
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Card Entidad */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Entidad</CardTitle>
                        <BriefcaseBusiness className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.entidad}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Entidad registradas
                        </p>
                        <Link href="/Operaciones-Comerciales/Entidad">
                            <Button variant="ghost" size="sm" className="mt-3 w-full">
                                Gestionar Entidad
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Card Orden De Compra */}
                {/* <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Orden De Compra</CardTitle>
                        <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.orden_compra}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Orden De Compra registradas
                        </p>
                        <Link href="/Operaciones-Comerciales/Orden-de-Compra">
                            <Button variant="ghost" size="sm" className="mt-3 w-full">
                                Gestionar Orden De Compra
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card> */}
                {/* Card Solicitar Materiales */}
                {/* <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Solicitar Materiales</CardTitle>
                        <ClipboardPenLine className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.solicitar_materiales}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Solicitar Materiales registradas
                        </p>
                        <Link href="/Operaciones-Comerciales/Solicitud-de-Materiales">
                            <Button variant="ghost" size="sm" className="mt-3 w-full">
                                Gestionar Solicitar Materiales
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card> */}
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
                    <Link href="/Operaciones-Comerciales/tipos-movimientos/registrar-tipos-de-movimientos">
                        <Button variant="outline" className="w-full justify-start">
                            <ClipboardList className="mr-2 h-4 w-4" />
                            Crear Tipo de Movimientos
                        </Button>
                    </Link>
                    <Link href="/Operaciones-Comerciales/Movimientos/registrar-movimientos">
                        <Button variant="outline" className="w-full justify-start">
                            <Orbit className="mr-2 h-4 w-4" />
                            crear Movimientos
                        </Button>
                    </Link>
                    <Link href="/Operaciones-Comerciales/Entidad/registrar-entidad">
                        <Button variant="outline" className="w-full justify-start">
                            <BriefcaseBusiness className="mr-2 h-4 w-4" />
                            Nuevo Entidad
                        </Button>
                    </Link>
                    {/* <Link href="/Operaciones-Comerciales/Orden-de-Compra/registrar-orden-de-compra">
                        <Button variant="outline" className="w-full justify-start">
                            <ClipboardCheck className="mr-2 h-4 w-4" />
                            Crear Orden de Compra
                        </Button>
                    </Link>
                    <Link href="/Operaciones-Comerciales/Solicitud-de-Materiales/registrar-solicitud-de-materiales">
                        <Button variant="outline" className="w-full justify-start">
                            <ClipboardPenLine className="mr-2 h-4 w-4" />
                            Crear Solicitar Materiales
                        </Button>
                    </Link> */}
                </CardContent>
            </Card>
        </div>
    );
}