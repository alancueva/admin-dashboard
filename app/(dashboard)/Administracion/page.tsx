import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Building2, BriefcaseBusiness, ArrowRight, Users, Building, Briefcase } from 'lucide-react';
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
        tiposNegocio: 12
    };

    return (
        // <div>
        //     <Tabs defaultValue="all">
        //         <div className="flex items-center">
        //             <TabsList>
        //                 <Link href="/Administracion/usuarios">
        //                     <TabsTrigger value="Usuarios" >
        //                         <User className="h-4 w-4" />
        //                         Usuario
        //                     </TabsTrigger>
        //                 </Link>
        //                 <Link href="/Administracion/organizaciones">
        //                     <TabsTrigger value="Organizacion">
        //                         <Building2 className="h-4 w-4" />
        //                         Organizacion
        //                     </TabsTrigger>
        //                 </Link>
        //                 <Link href="/Administracion/tipos-negocio">
        //                     <TabsTrigger value="tipos-negocio">
        //                         <BriefcaseBusiness className="h-4 w-4" />
        //                         Tipo de Negicio
        //                     </TabsTrigger>
        //                 </Link>
        //             </TabsList>

        //         </div>

        //     </Tabs>
        //     <Card>
        //         <CardHeader>
        //             <CardTitle>Administracion</CardTitle>
        //             <CardDescription>
        //                 Administracion de general..
        //             </CardDescription>
        //         </CardHeader>
        //         <CardContent></CardContent>

        //     </Card>
        // </div>




        <div className="space-y-6">
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <Link href="/Administracion/usuarios">
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
                {/* Card Usuarios */}
                <Card className="hover:shadow-lg transition-shadow">
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

                {/* Card Organizaciones */}
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

                {/* Card Tipos de Negocio */}
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
                    <Link href="/Administracion/usuarios/nuevo">
                        <Button variant="outline" className="w-full justify-start">
                            <User className="mr-2 h-4 w-4" />
                            Crear usuario
                        </Button>
                    </Link>
                    <Link href="/Administracion/organizaciones/nueva">
                        <Button variant="outline" className="w-full justify-start">
                            <Building2 className="mr-2 h-4 w-4" />
                            Nueva organización
                        </Button>
                    </Link>
                    <Link href="/Administracion/tipos-negocio/nuevo">
                        <Button variant="outline" className="w-full justify-start">
                            <BriefcaseBusiness className="mr-2 h-4 w-4" />
                            Nuevo tipo de negocio
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}