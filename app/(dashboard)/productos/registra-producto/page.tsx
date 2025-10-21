import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const unidad_medida: any[] = [
  { value: 'kg', label: 'Kilogramo (kg)' },
  { value: 'g', label: 'Gramo (g)' },
  { value: 'l', label: 'Litro (l)' },
  { value: 'ml', label: 'Mililitro (ml)' },
  { value: 'unidad', label: 'Unidad' }
];

const categoria: any[] = [
  { value: 'aceites', label: 'Aceites' },
  { value: 'serums', label: 'Sérums' },
  { value: 'balsamos', label: 'Bálsamos' }
];

const proveedor: any[]=[
   {value: 'proveedor1', label: 'Proveedor 1'},
   {value: 'proveedor2', label: 'Proveedor 2'},
   {value: 'proveedor3', label: 'Proveedor 3'}
]

export default function RegistroProductoForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registra Producto</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-12 gap-4">
          {/* Nombre del Producto */}
          <div className="col-span-12 md:col-span-6">
            <label className="block mb-1 font-medium">
              Nombre del Producto
            </label>
            <Input
              type="text"
              placeholder="Ej. Aceite Capilar"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Código o SKU */}
          <div className="col-span-12 md:col-span-6">
            <label className="block mb-1 font-medium">Código / SKU</label>
            <Input
              type="text"
              placeholder="Ej. PROD-001"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Descripción */}
          <div className="col-span-12">
            <label className="block mb-1 font-medium">Descripción</label>
            <textarea
              placeholder="Describe brevemente el producto..."
              className="w-full border border-gray-300 rounded-md p-2"
              rows={3}
            ></textarea>
          </div>

          {/* Precio */}
          <div className="col-span-12 md:col-span-4">
            <label className="block mb-1 font-medium">Precio</label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Stock */}
          <div className="col-span-12 md:col-span-4">
            <label className="block mb-1 font-medium">Stock</label>
            <Input
              type="number"
              placeholder="0"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Categoría */}
          <div className="col-span-12 md:col-span-4">
            <label className="block mb-1 font-medium">Categoría</label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option value="">Seleccione</option>
              {categoria.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Unidad de Medida */}
          <div className="col-span-12 md:col-span-3">
            <label className="block mb-1 font-medium">Unidad de Medida</label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option value="">Seleccione</option>
              {unidad_medida.map((unidad) => (
                <option key={unidad.value} value={unidad.value}>
                  {unidad.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-12 md:col-span-3">
            <label className="block mb-1 font-medium">
              Cantidad por Unidad
            </label>
            <Input
              type="number"
              placeholder="Ej. 500"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="col-span-12 md:col-span-6"></div>

          <div className="col-span-12 md:col-span-3">
            <label className="block mb-1 font-medium">
              Marca
            </label>
            <Input
              type="number"
              placeholder="Ej. 500"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="col-span-12 md:col-span-3">
            <label className="block mb-1 font-medium">
              Modelo
            </label>
            <Input
              type="number"
              placeholder="Ej. 500"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="col-span-12 md:col-span-3">
            <label className="block mb-1 font-medium">
              Fabricante
            </label>
            <Input
              type="number"
              placeholder="Ej. 500"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="col-span-12 md:col-span-3">
            <label className="block mb-1 font-medium">
              Proveedor
            </label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option value="">Seleccione</option>
              {proveedor.map((prov) => (
                <option key={prov.value} value={prov.value}>
                  {prov.label}
                </option>
              ))}
            </select>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
