"use client";
import { useState } from 'react';
import {
  Package,
  TrendingUp,
  Warehouse,
  Calendar,
  Users,
  AlertTriangle,
  Activity,
  ArrowRight,
  PlusCircle
} from 'lucide-react';
import Link from 'next/link';


export default function Dashboard() {
  const datos_usuario = {
    nombre: 'Alan Cueva',
    organizacion: 'SIstema Inventario'
  };
  const [selectedwelcome] = useState(`Bienvenido ${datos_usuario.nombre}`);
  const [selectedOrg] = useState(`Bienvenido ${datos_usuario.organizacion}`);
  const fecha = new Date();
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const anio = fecha.getFullYear();
  const fechaFormateada = `${dia}/${mes}/${anio}`;
  const [timeRange] = useState(fechaFormateada);


  // Datos de ejemplo
  const stats = [
    {
      title: 'Valor Total Inventario',
      value: 'S/. 125,450',
      change: '+12.5%',
      trend: 'up',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Productos Activos',
      value: '1,234',
      change: '+8',
      trend: 'up',
      icon: Warehouse,
      color: 'bg-green-500'
    },
    {
      title: 'Entidad (Cliente)',
      value: '23',
      change: '-5',
      trend: 'down',
      icon: Users,
      color: 'bg-orange-500'
    },
    {
      title: 'Entidad (Proveedor)',
      value: '12',
      change: '+15%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];


  // Datos simulados para Actividad Reciente
  const recentActivity = [
    { id: 1, action: 'Venta #1023', product: 'Laptop Gamer HP', amount: '+ S/. 3,500', time: 'Hace 2 min', type: 'sale' },
    { id: 2, action: 'Reabastecimiento', product: 'Mouse Logitec G203', amount: '+ 50 un.', time: 'Hace 1 hora', type: 'restock' },
    { id: 3, action: 'Venta #1022', product: 'Monitor Samsung 24"', amount: '+ S/. 650', time: 'Hace 3 horas', type: 'sale' },
    { id: 4, action: 'Ajuste de Inventario', product: 'Teclado Mecánico', amount: '- 2 un.', time: 'Ayer', type: 'adjustment' },
  ];

  // Datos simulados para Stock Bajo
  const lowStock = [
    { name: 'Silla Ergonómica', stock: 3, min: 5 },
    { name: 'Auriculares Bluetooth', stock: 2, min: 10 },
    { name: 'Webcam HD', stock: 0, min: 4 },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Package className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{selectedwelcome}</h1>
                  <p className="text-sm text-gray-500">{selectedOrg}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{timeRange}</span>
              </div>
              {/* <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {/* {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />} */}
                  {/* <span>{stat.change}</span> */}
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Columna Izquierda: Actividad Reciente */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Movimientos Reciente</h2>
                <Link href={'/dashboard/Operaciones-Comerciales/Movimientos'}>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Ver todo</button>
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'sale' ? 'bg-green-100 text-green-600' :
                        item.type === 'restock' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                        {item.type === 'sale' ? <TrendingUp className="w-5 h-5" /> :
                          item.type === 'restock' ? <Package className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.action}</p>
                        <p className="text-xs text-gray-500">{item.product}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${item.type === 'adjustment' ? 'text-red-600' : 'text-gray-900'}`}>
                        {item.amount}
                      </p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Alertas y Acciones Rápidas */}
          <div className="space-y-6">

            {/* Alertas de Stock Bajo */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Alertas de Stock</h2>
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
              <div className="space-y-4">
                {lowStock.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">Mínimo requerido: {item.min}</p>
                    </div>
                    <div className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                      {item.stock} un.
                    </div>
                  </div>
                ))}
              </div>
              <Link href={'/dashboard/gestion-de-existencia/Inventario'}>
                <button className="w-full mt-6 py-2 text-sm text-center text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Ver reporte de inventario
                </button>
              </Link>
            </div>

            {/* Acciones Rápidas */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-sm p-6 text-white">
              <h2 className="text-lg font-semibold mb-4">Acciones Rápidas</h2>
              <div className="space-y-3">
                <Link href={'/dashboard/Operaciones-Comerciales/Movimientos/registrar-movimientos'}>
                  <button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm">
                    <span className="text-sm font-medium">Registrar Nuevo Movimiento</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href={'/dashboard/gestion-de-existencia/Productos/registrar-producto'}>
                  <button className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm">
                    <span className="text-sm font-medium">Agregar Producto</span>
                    <PlusCircle className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};
