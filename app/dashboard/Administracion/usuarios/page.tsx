import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from '@/components/ui/card';
import { UsersTable } from './users-table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import Link from 'next/link';

const users = [
    {
        id: 1,
        nombres: 'Juan Perez',
        email: 'juan.perez@example.com',
        rol: 'Administrador',
        vigencia: 'SI'
    },
    {
        id: 2,
        nombres: 'Maria Gomez',
        email: 'maria.gomez@example.com',
        rol: 'Usuario',
        vigencia: 'NO'
    },
    {
        id: 3,
        nombres: 'Carlos Sanchez',
        email: 'carlos.sanchez@example.com',
        rol: 'Administrador',
        vigencia: 'SI'
    },
    {
        id: 4,
        nombres: 'Ana Martinez',
        email: 'ana.martinez@example.com',
        rol: 'Usuario',
        vigencia: 'NO'
    },
    {
        id: 5,
        nombres: 'Luis Rodriguez',
        email: 'luis.rodriguez@example.com',
        rol: 'Administrador',
        vigencia: 'SI'
    },
    {
        id: 6,
        nombres: 'Sofia Lopez',
        email: 'sofia.lopez@example.com',
        rol: 'Usuario',
        vigencia: 'NO'
    },


];

const totalusuarios: number = users.length

export default function UsuarioPage() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div>
                        <CardTitle>Usuarios</CardTitle>
                        <CardDescription>Listado de Usuarios</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Link href="/dashboard/Administracion/usuarios/registrar-usuarios">
                            <Button
                                size="sm"
                                className="h-8 gap-1"
                            >
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Agregar
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>

            </CardHeader>
            <UsersTable users={users} offset={totalusuarios} totalUsers={totalusuarios} />
            {/* <CardContent>
            </CardContent> */}

        </Card>
    );
}