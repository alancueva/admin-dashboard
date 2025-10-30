import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { CategoriaTable } from './categoria-table';


const categoria = [
    {
        id: 1,
        nombres: "Materias Primas",
        descripcion: "Insumos para la producción",
        nivel: "1",
        orden: "1"
    },
    {
        id: 2,
        nombres: "Productos en Proceso",
        descripcion: "Artículos semi-terminados",
        nivel: "1",
        orden: "2"
    },
    {
        id: 3,
        nombres: "Productos Terminados",
        descripcion: "Artículos listos para la venta",
        nivel: "1",
        orden: "3"
    },
    {
        id: 4,
        nombres: "Suministros de Oficina",
        descripcion: "Material de papelería y oficina",
        nivel: "1",
        orden: "4"
    },
    {
        id: 5,
        nombres: "Herramientas y Equipos",
        descripcion: "Equipamiento para operaciones",
        nivel: "1",
        orden: "5"
    }
]

export default function CategoriaPage() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div>
                        <CardTitle>Categoria</CardTitle>
                        <CardDescription>Listado de Categorias</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Link href="/Catalogo/categoria/registrar-categoria">
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
           <CategoriaTable categoria={categoria} offset={2} totalCatogoria={categoria.length} />

        </Card>
    );
}