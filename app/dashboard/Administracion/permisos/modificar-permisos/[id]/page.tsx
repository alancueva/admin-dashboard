'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import Link from 'next/link';
import { ArrowLeftRight, Check, User } from 'lucide-react';
import { useState } from 'react';
import { Selected } from '@/components/ui/Selected';
import { useParams } from 'next/navigation';

interface Option {
  value: number;
  label: string;
}

interface PermisoAccion {
  id: string;
  nombre: string;
  checked: boolean;
}

interface SubModulo {
  id: string;
  nombre: string;
  acciones: PermisoAccion[];
}

interface Modulo {
  id: string;
  nombre: string;
  submodulos: SubModulo[];
}

const usuariosEjemplo: Option[] = [
  { value: 1, label: 'Juan Pérez - Administrador' },
  { value: 2, label: 'María López - Cajera' },
  { value: 3, label: 'Carlos Ruiz - Mesero' },
  { value: 4, label: 'Ana Torres - Almacenera' }
];

const modulos: Modulo[] = [
  {
    id: 'administracion',
    nombre: 'Administración',
    submodulos: [
      {
        id: 'usuarios',
        nombre: 'Usuarios',
        acciones: [
          { id: 'ver', nombre: 'Ver Usuarios', checked: false },
          { id: 'crear', nombre: 'Registrar Usuario', checked: false },
          { id: 'editar', nombre: 'Editar Usuario', checked: false }
        ]
      },
      {
        id: 'permisos',
        nombre: 'Permisos',
        acciones: [
          { id: 'ver', nombre: 'Ver Permisos', checked: false },
          { id: 'asignar', nombre: 'Asignar Permisos', checked: false }
        ]
      }
    ]
  },
  {
    id: 'catalogo',
    nombre: 'Catálogo',
    submodulos: [
      {
        id: 'categoria',
        nombre: 'Categoria',
        acciones: [
          { id: 'ver', nombre: 'Ver Categoria', checked: false },
          { id: 'Registrar', nombre: 'Registrar Categoria', checked: false },
          { id: 'Editar', nombre: 'Editar Categoria', checked: false }
        ]
      },
      {
        id: 'mesa',
        nombre: 'Mesas',
        acciones: [
          { id: 'ver', nombre: 'Ver Mesas', checked: false },
          { id: 'Registrar', nombre: 'Registrar Mesas', checked: false },
          { id: 'Editar', nombre: 'Editar Mesas', checked: false }
        ]
      }
    ]
  },
  {
    id: 'inventario',
    nombre: 'Inventario',
    submodulos: [
      {
        id: 'productos',
        nombre: 'Productos',
        acciones: [
          { id: 'ver', nombre: 'Ver Productos', checked: false },
          { id: 'crear', nombre: 'Crear Producto', checked: false },
          { id: 'editar', nombre: 'Editar Producto', checked: false },
          { id: 'eliminar', nombre: 'Eliminar Producto', checked: false }
        ]
      },
      {
        id: 'movimientos',
        nombre: 'Movimientos de Stock',
        acciones: [
          { id: 'ver', nombre: 'Ver Movimientos', checked: false },
          { id: 'crear', nombre: 'Registrar Movimiento', checked: false }
        ]
      }
    ]
  },
  {
    id: 'ope_come',
    nombre: 'Operacion Comercial',
    submodulos: [
      {
        id: 'serie',
        nombre: 'Series',
        acciones: [
          { id: 'ver', nombre: 'Ver Series', checked: false },
          { id: 'crear', nombre: 'Crear Series', checked: false },
          { id: 'editar', nombre: 'Editar Series', checked: false }
        ]
      },
      {
        id: 'venta',
        nombre: 'Ventas',
        acciones: [
          { id: 'ver', nombre: 'Ver Ventas', checked: false },
          { id: 'crear', nombre: 'Editar Ventas', checked: false }
        ]
      }
    ]
  },
  {
    id: 'ope_serv',
    nombre: 'Operacion de Servicio',
    submodulos: [
      {
        id: 'pedido',
        nombre: 'Pedido',
        acciones: [
          { id: 'ver', nombre: 'Ver Pedido', checked: false },
          { id: 'crear', nombre: 'Crear Pedido', checked: false }
          // { id: 'editar', nombre: 'Editar Series', checked: false }
        ]
      }
    ]
  }
];

export default function RegistrarPermisos() {
  const { id } = useParams();
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Option | null>(
    null
  );
  const [permisos, setPermisos] = useState(modulos);

  const toggleAccion = (
    moduloId: string,
    submoduloId: string,
    accionId: string
  ) => {
    setPermisos((prev) =>
      prev.map((modulo) => {
        if (modulo.id !== moduloId) return modulo;

        return {
          ...modulo,
          submodulos: modulo.submodulos.map((sub) => {
            if (sub.id !== submoduloId) return sub;

            return {
              ...sub,
              acciones: sub.acciones.map((accion) =>
                accion.id === accionId
                  ? { ...accion, checked: !accion.checked }
                  : accion
              )
            };
          })
        };
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuarioSeleccionado) {
      alert('Debe seleccionar un usuario');
      return;
    }
    console.log('Usuario:', usuarioSeleccionado);
    console.log('Permisos asignados:', permisos);
    alert('Permisos guardados correctamente (simulación)');
  };

  return (
    <div>
      <Card className="sticky top-0 z-50 mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Modificar Permisos de Usuario (Ver Registro)</CardTitle>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1" onClick={handleSubmit}>
                <Check className="h-3.5 w-3.5" />
                <span>Grabar Permisos</span>
              </Button>
              <Link href="/dashboard/Administracion/permisos">
                <Button size="sm" className="h-8 gap-1" variant="outline">
                  <ArrowLeftRight className="h-3.5 w-3.5" />
                  <span>Volver</span>
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Selección de Usuario */}
            <div className="space-y-2">
              <Label className="text-base font-medium flex items-center gap-2">
                <User className="h-5 w-5" />
                Seleccionar Usuario
              </Label>
              <Selected
                value={usuarioSeleccionado}
                onChange={setUsuarioSeleccionado}
                options={usuariosEjemplo}
                placeholder="Busca y selecciona un usuario..."
              />
            </div>

            {/* Árbol de Permisos */}
            <div className="space-y-3">
              <Label className="text-base font-medium">
                Permisos por Módulo
              </Label>

              <Accordion
                type="multiple"
                defaultValue={modulos.map((m) => m.id)}
                className="w-full"
              >
                {permisos.map((modulo) => (
                  <AccordionItem key={modulo.id} value={modulo.id}>
                    <AccordionTrigger className="text-lg font-semibold">
                      {modulo.nombre}
                    </AccordionTrigger>
                    <AccordionContent className="pl-6 space-y-6 pt-2">
                      {modulo.submodulos.map((submodulo) => (
                        <div
                          key={submodulo.id}
                          className="border-l-2 border-gray-200 pl-4"
                        >
                          <p className="font-medium text-gray-700 mb-3">
                            {submodulo.nombre}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {submodulo.acciones.map((accion) => (
                              <div
                                key={accion.id}
                                className="flex items-center space-x-3"
                              >
                                <Checkbox
                                  id={`${submodulo.id}-${accion.id}`}
                                  checked={accion.checked}
                                  onCheckedChange={() =>
                                    toggleAccion(
                                      modulo.id,
                                      submodulo.id,
                                      accion.id
                                    )
                                  }
                                />
                                <Label
                                  htmlFor={`${submodulo.id}-${accion.id}`}
                                  className="cursor-pointer text-sm font-normal"
                                >
                                  {accion.nombre}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
