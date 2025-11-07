"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    Home,
    PlusCircle,
    Package,
    Package2,
    PanelLeft,
    Settings,
    ShoppingCart,
    Users2,
    ArrowLeftRight,
    Check,
    ShieldPlus,
    SlidersVertical
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Tipo de Movimiento de Operación Comercial
 */
const tipo: any[] = [
    { id: 1, nombre: 'entrada' },
    { id: 2, nombre: 'salida' },
    { id: 3, nombre: 'transferencia' },
    { id: 4, nombre: 'devolucion' },
    { id: 5, nombre: 'ajuste' }

]


export default function RegistrarTipoMovimientoPage() {

    return (
        <div>
            <Card className="sticky top-0 z-50 mb-4">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CardTitle>Registrar Tipos de Movimientos</CardTitle>

                        <div className="ml-auto flex items-center gap-2">
                            <Button
                                size="sm"
                                className="h-8 gap-1"
                            >
                                <Check className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    grabar
                                </span>
                            </Button>

                            <Link href="/Operaciones-Comerciales/Tipos-Movimientos">
                                <Button
                                    size="sm"
                                    className="h-8 gap-1"
                                >
                                    <ArrowLeftRight className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Volver
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Card>
                <CardContent>
                    <form className="grid grid-cols-12 gap-4 mt-2">
                        {/* Código */}
                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Código
                            </label>
                            <Input
                                type="text"
                                placeholder="Código"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        {/* Nombre del tipo de movimiento */}
                        <div className="col-span-12 md:col-span-5">
                            <label className="block mb-1 font-medium">
                                Nombres
                            </label>
                            <Input
                                type="text"
                                placeholder="Nombres de Tipo de Movimiento"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-1 font-medium">
                                Tipo de Operación
                            </label>
                            <select className="w-full border border-gray-300 rounded-md p-2">
                                <option value="">Seleccione</option>
                                {tipo.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>



                    </form>
                </CardContent>
            </Card>
        </div>
    );
}