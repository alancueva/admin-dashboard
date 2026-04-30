'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeftRight, Check, Eye } from 'lucide-react';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { useParams } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import DataTable from 'react-data-table-component';
import { Label } from '@/components/ui/label';

const unidadesMedida = [
  { value: 'kg', label: 'Kilogramo (kg)' },
  { value: 'g', label: 'Gramo (g)' },
  { value: 'l', label: 'Litro (l)' },
  { value: 'ml', label: 'Mililitro (ml)' },
  { value: 'unidad', label: 'Unidad' },
  { value: 'paquete', label: 'Paquete' }
];

const categorias = [
  { value: 'platos_fondo', label: 'Platos de Fondo' },
  { value: 'bebidas', label: 'Bebidas' },
  { value: 'entradas', label: 'Entradas' },
  { value: 'postres', label: 'Postres' }
  // Agrega las que necesites
];
// Datos de ejemplo de movimientos (simulación)
const movimientosEjemplo = [
  {
    id_movimientos_stock: 101,
    fecha_movimientos: '2026-04-25 10:30',
    tipo_movimientos: 'ENTRADA',
    cantidad: 100,
    descripcion: 'Compra a proveedor'
  },
  {
    id_movimientos_stock: 102,
    fecha_movimientos: '2026-04-26 14:15',
    tipo_movimientos: 'SALIDA',
    cantidad: -25,
    descripcion: 'Venta mesa 3'
  },
  {
    id_movimientos_stock: 103,
    fecha_movimientos: '2026-04-27 09:00',
    tipo_movimientos: 'ENTRADA',
    cantidad: 50,
    descripcion: 'Reposición'
  },
  {
    id_movimientos_stock: 104,
    fecha_movimientos: '2026-04-28 11:20',
    tipo_movimientos: 'SALIDA',
    cantidad: -15,
    descripcion: 'Venta mesa 7'
  }
];

export default function ModificarProductoForm() {
  const { id } = useParams();
  const [controlaStock, setControlaStock] = useState(false);
  const [vigente, setVigente] = useState(true);

  // Cálculos para el resumen
  const totalIngresos = movimientosEjemplo
    .filter((m) => m.tipo_movimientos === 'ENTRADA')
    .reduce((sum, m) => sum + m.cantidad, 0);

  const totalEgresos = movimientosEjemplo
    .filter((m) => m.tipo_movimientos === 'SALIDA')
    .reduce((sum, m) => sum + Math.abs(m.cantidad), 0);

  const stockNeto = totalIngresos - totalEgresos;

  const columnasMovimientos = [
    {
      name: 'Fecha',
      selector: (row: any) => row.fecha_movimientos,
      sortable: true,
      width: '160px'
    },
    {
      name: 'Tipo',
      selector: (row: any) => row.tipo_movimientos,
      sortable: true,
      width: '110px'
    },
    {
      name: 'Cantidad',
      selector: (row: any) => row.cantidad,
      sortable: true,
      cell: (row: any) => (
        <span
          className={
            row.cantidad > 0
              ? 'text-green-600 font-medium'
              : 'text-red-600 font-medium'
          }
        >
          {row.cantidad > 0 ? '+' : ''}
          {row.cantidad}
        </span>
      )
    },
    { name: 'Descripción', selector: (row: any) => row.descripcion, wrap: true }
  ];

  const [imagenPreview, setImagenPreview] = useState<string | null>(null);
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Funciones para Drag & Drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      processImageFile(file);
    }
  };
  // Manejo de subida de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    validacion_tamaño_formato(file);
    setImagenFile(file);
    // Crear preview
    cargar_previsualizado(file);
  };

  const processImageFile = (file: File) => {
    validacion_tamaño_formato(file);
    setImagenFile(file);
    // Crear preview
    cargar_previsualizado(file);
  };

  const cargar_previsualizado = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagenPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validacion_tamaño_formato = (file: File) => {
    // Validaciones
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no debe superar los 5MB');
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Solo se permiten imágenes PNG, JPG o WEBP');
      return;
    }
  };
  return (
    <div>
      <Card className="sticky top-0 z-50 mb-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Modificar Productos (Ver Registro)</CardTitle>

            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1">
                <Check className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  grabar
                </span>
              </Button>

              <Link href="/dashboard/inventario/productos">
                <Button size="sm" className="h-8 gap-1">
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
        <CardContent className="mt-4">
          <form className="grid grid-cols-12 gap-6">
            {/* Número de Serie*/}
            <div className="col-span-12 md:col-span-4">
              <label htmlFor="numero_serie">Numero de Serie *</label>
              <Input
                id="numero_serie"
                placeholder="Ej: LOMO-000001"
                className="mt-1"
                readOnly
              />
            </div>
            {/* Nombre */}
            <div className="col-span-12 md:col-span-8">
              <label htmlFor="nombre">Nombre del Producto *</label>
              <Input
                id="nombre"
                placeholder="Ej: Lomo Saltado"
                className="mt-1"
                required
              />
            </div>

            {/* Descripción */}
            <div className="col-span-12">
              <label htmlFor="descripcion">Descripción</label>
              <Input
                id="descripcion"
                placeholder="Describe el producto..."
                className="mt-1"
              />
            </div>

            {/* Precio Unitario */}
            <div className="col-span-12 md:col-span-4">
              <label htmlFor="precio">Precio Unitario *</label>
              <Input
                id="precio"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="mt-1"
                required
              />
            </div>

            {/* Categoría */}
            <div className="col-span-12 md:col-span-4">
              <label htmlFor="categoria">Categoría *</label>
              <select
                id="categoria"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Unidad de Medida */}
            <div className="col-span-12 md:col-span-4">
              <label htmlFor="unidad_medida">Unidad de Medida *</label>
              <select
                id="unidad_medida"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Seleccione unidad</option>
                {unidadesMedida.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Controla Stock - Switch */}
            <div className="col-span-12 md:col-span-4 flex items-center gap-3 pt-2">
              <Switch
                id="controla_stock"
                checked={controlaStock}
                onCheckedChange={setControlaStock}
              />
              <div>
                <label htmlFor="controla_stock" className="cursor-pointer">
                  Controla Stock
                </label>
                <p className="text-sm text-muted-foreground">
                  Activar si este producto maneja inventario
                </p>
              </div>
            </div>
            {/* Botón Ver Movimientos - Solo visible si controla stock */}
            {controlaStock && (
              <div className="col-span-12 md:col-span-4 flex items-center justify-end pt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Eye className="h-4 w-4" />
                      Ver Movimientos del Producto
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
                    <DialogHeader>
                      <DialogTitle>
                        Movimientos de Stock - Lomo Saltado
                      </DialogTitle>
                    </DialogHeader>

                    <div className="flex-1 overflow-auto">
                      <DataTable
                        columns={columnasMovimientos}
                        data={movimientosEjemplo}
                        pagination
                        paginationPerPage={10}
                        highlightOnHover
                      />
                    </div>

                    {/* Footer con Resumen */}
                    <div className="border-t pt-4 mt-4 grid grid-cols-3 gap-4 text-sm">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <p className="text-green-700 font-medium">
                          Total Ingresos
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          +{totalIngresos}
                        </p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <p className="text-red-700 font-medium">
                          Total Egresos
                        </p>
                        <p className="text-2xl font-bold text-red-600">
                          -{totalEgresos}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-blue-700 font-medium">
                          Stock Neto Actual
                        </p>
                        <p
                          className={`text-2xl font-bold ${stockNeto >= 0 ? 'text-blue-600' : 'text-red-600'}`}
                        >
                          {stockNeto}
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
            {/* Vigencia */}
            <div className="col-span-12 md:col-span-2">
              <label className="block mb-1 font-medium">Vigencia</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                disabled={false}
                defaultValue="SI"
              >
                <option value="SI">SI</option>
                <option value="NO">NO</option>
              </select>
            </div>

            {/* Stock Actual y Mínimo - Solo se muestran si controla stock */}
            {controlaStock && (
              <>
                <div className="col-span-12 md:col-span-4">
                  <label htmlFor="stock_actual">Stock Actual</label>
                  <Input
                    id="stock_actual"
                    type="number"
                    placeholder="0"
                    className="mt-1"
                  />
                </div>

                <div className="col-span-12 md:col-span-4">
                  <label htmlFor="stock_minimo">Stock Mínimo (Alerta)</label>
                  <Input
                    id="stock_minimo"
                    type="number"
                    placeholder="5"
                    className="mt-1"
                  />
                </div>

                <div className="col-span-12 md:col-span-4">
                  <label htmlFor="stock_maximo">Stock Máximo (Opcional)</label>
                  <Input
                    id="stock_maximo"
                    type="number"
                    placeholder="100"
                    className="mt-1"
                  />
                </div>
              </>
            )}

            {/* IMAGEN FUNCIONAL */}
            <div className="col-span-12">
              <Label>Imagen del Producto</Label>
              <div
                className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                onClick={() => document.getElementById('file-input')?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  id="file-input"
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />

                {imagenPreview ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={imagenPreview}
                      alt="Vista previa"
                      className="mx-auto max-h-56 rounded-md shadow-sm object-contain"
                    />
                    <p className="text-xs text-gray-500 mt-3">
                      Haz clic para cambiar la imagen
                    </p>
                  </div>
                ) : (
                  <div className="py-6">
                    <p className="text-sm text-gray-600 font-medium mb-1">
                      Haz clic o arrastra una imagen aquí
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG o WEBP (máximo 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
