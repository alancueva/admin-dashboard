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
    Ruler

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
        unidad_medida: 20
    };

    return (
        <div className="space-y-6">
            {/* <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <Link href="/Catalogo/categoria">
                            <TabsTrigger value="Categoria">
                                <SwatchBook className="h-4 w-4 mr-2" />
                                Categoria
                            </TabsTrigger>
                        </Link>
                        <Link href="/Catalogo/unidad-medida">
                            <TabsTrigger value="Unidad-de-Medida">
                                <Ruler className="h-4 w-4 mr-2" />
                                Unidad de Medida
                            </TabsTrigger>
                        </Link>

                    </TabsList>
                </div>
            </Tabs> */}

            <div>
                <h1 className="text-3xl font-bold">Catálogo</h1>
                <p className="text-muted-foreground mt-1">
                    Gestiona las categorias y unidades de medidas
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {/* Card Categorias */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Categorias</CardTitle>
                        <SwatchBook className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.categoria}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Categorias registrados en el sistema
                        </p>
                        <Link href="/Catalogo/categoria">
                            <Button variant="ghost" size="sm" className="mt-3 w-full">
                                Gestionar Categorias
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Card Organizaciones */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Unidad De Medidas</CardTitle>
                        <Ruler className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.unidad_medida}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Unidades de Medida registradas
                        </p>
                        <Link href="/Catalogo/unidad-medida">
                            <Button variant="ghost" size="sm" className="mt-3 w-full">
                                Gestionar Unidades de Medida
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
                    <Link href="/Catalogo/categoria/registrar-categoria">
                        <Button variant="outline" className="w-full justify-start">
                            <SwatchBook className="mr-2 h-4 w-4" />
                            Crear Categoria
                        </Button>
                    </Link>
                    <Link href="/Catalogo/unidad-medida/registrar-unidad">
                        <Button variant="outline" className="w-full justify-start">
                            <Ruler className="mr-2 h-4 w-4" />
                            crear Unidad de Medidas
                        </Button>
                    </Link>
                    {/* <Link href="/Administracion/tipos-negocio/nuevo">
                                <Button variant="outline" className="w-full justify-start">
                                    <BriefcaseBusiness className="mr-2 h-4 w-4" />
                                    Nuevo tipo de negocio
                                </Button>
                            </Link> */}
                </CardContent>
            </Card>
        </div>
    );
}