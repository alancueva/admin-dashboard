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
import RegistrarUsuario from './registrar-usuarios/page';

const users = [
    {
        id: 1,
        nombres: 'Juan Perez',
        email: 'juan.perez@example.com',
        rol: 'Administrador',
        status: 'Activo'
    },
    {
        id: 2,
        nombres: 'Maria Gomez',
        email: 'maria.gomez@example.com',
        rol: 'Usuario',
        status: 'Inactivo'
    },
    {
        id: 3,
        nombres: 'Carlos Sanchez',
        email: 'carlos.sanchez@example.com',
        rol: 'Administrador',
        status: 'Activo'
    },
    {
        id: 4,
        nombres: 'Ana Martinez',
        email: 'ana.martinez@example.com',
        rol: 'Usuario',
        status: 'Inactivo'
    },
    {
        id: 5,
        nombres: 'Luis Rodriguez',
        email: 'luis.rodriguez@example.com',
        rol: 'Administrador',
        status: 'Activo'
    },
    {
        id: 6,
        nombres: 'Sofia Lopez',
        email: 'sofia.lopez@example.com',
        rol: 'Usuario',
        status: 'Inactivo'
    },


];

const totalusuarios: number = users.length

export default function UsuarioPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Usuarios</CardTitle>
                {/* <CardDescription>Usuarios..</CardDescription> */}
                <Tabs defaultValue="all">
                    <div className="flex items-center">
                        <div className="ml-auto flex items-center gap-2">
                            {/* <Button
                                size="sm"
                                className="h-8 gap-1"
                            >
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Agregar
                                </span> 
                            </Button>*/}
                            <RegistrarUsuario/>
                        </div>
                    </div>
                </Tabs>
            </CardHeader>
                <UsersTable users={users} offset={totalusuarios} totalUsers={totalusuarios} />
            {/* <CardContent>
            </CardContent> */}

        </Card>
    );
}