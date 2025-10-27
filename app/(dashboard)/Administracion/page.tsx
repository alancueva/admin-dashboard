import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Building2, BriefcaseBusiness } from 'lucide-react';
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
    return (
        <div>
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <Link href="/Administracion/usuarios">
                            <TabsTrigger value="Usuarios" >
                                <User className="h-4 w-4" />
                                Usuario
                            </TabsTrigger>
                        </Link>
                        <Link href="/Administracion/organizaciones">
                            <TabsTrigger value="Organizacion">
                                <Building2 className="h-4 w-4" />
                                Organizacion
                            </TabsTrigger>
                        </Link>
                        <Link href="/Administracion/tipos-negocio">
                            <TabsTrigger value="tipos-negocio">
                                <BriefcaseBusiness className="h-4 w-4" />
                                Tipo de Negicio
                            </TabsTrigger>
                        </Link>
                        {/* <TabsTrigger value="archived" className="hidden sm:flex">
                        <User className="h-4 w-4" />
                        Archivado
                    </TabsTrigger> */}
                    </TabsList>

                </div>

            </Tabs>
            <Card>
                <CardHeader>
                    <CardTitle>Administracion</CardTitle>
                    <CardDescription>
                        Administracion de general..
                    </CardDescription>
                </CardHeader>
                <CardContent></CardContent>

            </Card>
        </div>
    );
}