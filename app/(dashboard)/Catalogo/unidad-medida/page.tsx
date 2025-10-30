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
import { UnidadTable } from './unidad-table';



const unidad_medida = [
    {
        id: 1,
        nombres: "Unidad",
        abreviatura:"und",
        tipo:"cantidad"
    },
    {
        id: 2,
        nombres: "Kilogramo",
        abreviatura:"kg",
        tipo:"peso"
    },
    {
        id: 3,
        nombres: "Gramo",
        abreviatura:"g",
        tipo:"peso"
    },
    {
        id: 4,
        nombres: "Litro",
        abreviatura:"L",
        tipo:"volumen"
    },
    {
        id: 5,
        nombres: "Mililitro",
        abreviatura:"ml",
        tipo:"volumen"
    },
    {
        id: 6,
        nombres: "Metro",
        abreviatura:"m",
        tipo:"longitud"
    }
    
]

export default function UnidadMedidaPage() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div>
                        <CardTitle>Unidad de Medida</CardTitle>
                        <CardDescription>Listado de Unidades de Medidas</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Link href="/Catalogo/unidad-medida/registrar-unidad">
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
            <UnidadTable unidad={unidad_medida} offset={2} totalUnidad={unidad_medida.length} />


        </Card>
    );
}