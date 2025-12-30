import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from '@/components/ui/card';
import { File, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { NegocioTable } from './negocio-table';

const negocios = [
    {
        id: 1,
        nombre: "Restaurante",
        descripcion: "Ofrece comidas y bebidas para consumo en el local o para llevar.",
        vigencia: "SI"
    },
    {
        id: 2,
        nombre: "Tienda de Ropa",
        descripcion: "Venta de prendas de vestir y accesorios para hombres, mujeres y niños.",
        vigencia: "SI"
    },
    {
        id: 3,
        nombre: "Ferretería",
        descripcion: "Comercializa herramientas, materiales de construcción y artículos para el hogar.",
        vigencia: "SI"
    },
    {
        id: 4,
        nombre: "Panadería",
        descripcion: "Elabora y vende productos de panificación, pasteles y postres.",
        vigencia: "NO"
    },
    {
        id: 5,
        nombre: "Salón de Belleza",
        descripcion: "Ofrece servicios de peluquería, manicura, maquillaje y tratamientos estéticos.",
        vigencia: "SI"
    }

]

const totalnegocios: number = negocios.length

export default function TipoNegocioPage() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div>
                        <CardTitle>Tipos de Negocios</CardTitle>
                        <CardDescription>Listado de Tipos de Negocios</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Link href="/dashboard/Administracion/tipos-negocio/registrar-negocio">
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
            <NegocioTable negocios={negocios} offset={totalnegocios} totalNegocio={totalnegocios} />

        </Card>
    );
}