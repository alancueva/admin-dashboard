"use client";
// import React, { useState } from 'react';
import { useState } from 'react';
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  ShoppingCart, 
  Warehouse,
  Calendar,
  Users,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  FileText,
  ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  // const [selectedOrg] = useState('LibrerÃ­a Central');
  // const [timeRange] = useState('Hoy');

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
      icon: ShoppingCart,
      color: 'bg-green-500'
    },
    {
      title: 'Alertas Activas',
      value: '23',
      change: '-5',
      trend: 'down',
      icon: AlertTriangle,
      color: 'bg-orange-500'
    },
    {
      title: 'Movimientos Hoy',
      value: '45',
      change: '+15%',
      trend: 'up',
      icon: Activity,
      color: 'bg-purple-500'
    }
  ];

  const stockAlerts = [
    { product: 'Cuaderno Universitario 100h', stock: 5, min: 20, status: 'critical' },
    { product: 'Lapicero Faber Castell Azul', stock: 15, min: 30, status: 'warning' },
    { product: 'Borrador Blanco StaedtLER', stock: 25, min: 50, status: 'warning' }
  ];

  const expiringProducts = [
    { product: 'Pegamento LÃ­quido 250ml', lote: 'L2024-089', days: 15, qty: 24 },
    { product: 'Corrector LÃ­quido', lote: 'L2024-056', days: 22, qty: 18 },
    { product: 'Marcador Permanente Negro', lote: 'L2024-103', days: 28, qty: 35 }
  ];

  const recentMovements = [
    { type: 'Ingreso', doc: 'COM-2024-1234', items: 15, time: 'Hace 2 horas', status: 'completed' },
    { type: 'Salida', doc: 'VEN-2024-5678', items: 8, time: 'Hace 4 horas', status: 'completed' },
    { type: 'Transferencia', doc: 'TRA-2024-0089', items: 12, time: 'Hace 6 horas', status: 'pending' }
  ];

  const topProducts = [
    { name: 'Cuaderno Anillado A4', sales: 145, revenue: 'S/. 2,320' },
    { name: 'Lapiceros Pack x12', sales: 98, revenue: 'S/. 1,470' },
    { name: 'Folder Manila A4', sales: 87, revenue: 'S/. 870' },
    { name: 'Tijera Escolar', sales: 76, revenue: 'S/. 1,140' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      {/* <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Package className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">OMNISTOCK</h1>
                  <p className="text-sm text-gray-500">{selectedOrg}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{timeRange}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Stock Alerts */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                Alertas de Stock Bajo
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
                Ver todas <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {stockAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{alert.product}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Stock actual: <span className="font-semibold">{alert.stock}</span> | Mínimo: {alert.min}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    alert.status === 'critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {alert.status === 'critical' ? 'Crítico' : 'Advertencia'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Acciones Rapidas</h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                <Package className="w-5 h-5 mr-2" />
                Nuevo Ingreso
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Registrar Salida
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                <Warehouse className="w-5 h-5 mr-2" />
                Transferencia
              </button>
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                <FileText className="w-5 h-5 mr-2" />
                Auditoría
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Movements */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-purple-500" />
              Movimientos Recientes
            </h2>
            <div className="space-y-4">
              {recentMovements.map((mov, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 text-sm">{mov.type}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      mov.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {mov.status === 'completed' ? 'Completado' : 'Pendiente'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{mov.doc}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{mov.items} items</span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {mov.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expiring Products */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-red-500" />
              Próximos a Vencer
            </h2>
            <div className="space-y-4">
              {expiringProducts.map((prod, index) => (
                <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-100">
                  <h3 className="font-medium text-gray-900 text-sm mb-1">{prod.product}</h3>
                  <p className="text-xs text-gray-600 mb-2">Lote: {prod.lote}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-red-700">{prod.days} dÃ­as</span>
                    <span className="text-xs text-gray-600">{prod.qty} unidades</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
              Productos Más Vendidos
            </h2>
            <div className="space-y-4">
              {topProducts.map((prod, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">{prod.name}</h3>
                      <p className="text-xs text-gray-600">{prod.sales} ventas</p>
                    </div>
                  </div>
                  <span className="font-bold text-green-600 text-sm">{prod.revenue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;