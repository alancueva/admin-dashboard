'use client';

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
import { useParams } from "next/navigation";

export default function DetalleAuditoria() {
    const { id } = useParams();
    return (
        <div>
            <Card className="sticky top-0 z-50 mb-4">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CardTitle>Detalle Auditoria</CardTitle>
                        <p>ID recibido: {id}</p>
                        <div className="ml-auto flex items-center gap-2">

                            <Link href="/Administracion/auditoria">
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
                        {/* Nombre del Usuario */}
                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-1 font-medium">
                                Usuarios
                            </label>
                            <Input
                                type="text"
                                placeholder="Nombre del usuario"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-1 font-medium">
                                Fecha y Hora
                            </label>
                            <Input
                                type="text"
                                placeholder="Fecha y Hora"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-4"> </div>
                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-1 font-medium">
                                Módulo
                            </label>
                            <Input
                                type="text"
                                placeholder="Módulo"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-1 font-medium">
                                Opción
                            </label>
                            <Input
                                type="text"
                                placeholder="Opción"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-1 font-medium">
                                Acción
                            </label>
                            <Input
                                type="text"
                                placeholder="Acción"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>


                        <div className="col-span-12 md:col-span-3">
                            <label className="block mb-1 font-medium">
                                Nombre de Tabla
                            </label>
                            <Input
                                type="text"
                                placeholder="Nombre de Tabla"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-2">
                            <label className="block mb-1 font-medium">
                                Id de Tabla (Registro)
                            </label>
                            <Input
                                type="text"
                                placeholder="Id de Tabla (Registro)"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <div className="col-span-12">
                            <label className="block mb-1 font-medium">
                                Detalles del Registro Anterior (JSON)
                            </label>
                            <textarea
                                readOnly
                                rows={10}
                                className="w-full border border-gray-300 rounded-md p-2 font-mono text-sm bg-gray-50"
                                value={JSON.stringify({
                                    "id": 123,
                                    "nombre": "Producto Ejemplo",
                                    "precio": 99.99,
                                    "disponible": true,
                                    "tags": ["electrónica", "oferta"]
                                }, null, 2)}
                            />
                        </div>
                        <div className="col-span-12">
                            <label className="block mb-1 font-medium">
                                Detalles del Registro Nuevos (JSON)
                            </label>
                            <textarea
                                readOnly
                                rows={10}
                                className="w-full border border-gray-300 rounded-md p-2 font-mono text-sm bg-gray-50"
                                value={JSON.stringify({
                                    "id": 123,
                                    "nombre": "Producto Ejemplo",
                                    "precio": 99.99,
                                    "disponible": true,
                                    "tags": ["electrónica", "oferta"]
                                }, null, 2)}
                            />
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}