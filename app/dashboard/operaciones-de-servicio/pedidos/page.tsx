'use client';
import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Clock,
  LayoutGrid,
  ShoppingCart,
  X,
  ChefHat,
  CreditCard,
  StickyNote,
  Wallet,
  ArrowRight,
  Coins,
  QrCode,
  Smartphone,
  Calculator,
  User
} from 'lucide-react';
import { images } from './imagen';

/**
 * --- TIPOS E INTERFACES ---
 */

type OrderStatus =
  | 'Abierto'
  | 'Enviado'
  | 'En Preparación'
  | 'Listo'
  | 'Entregado'
  | 'Pagado'
  | 'Cancelado';
type PaymentMethod = 'efectivo' | 'tarjeta' | 'yape' | 'plin' | 'mixto';

interface Producto {
  id: number;
  nombre: string;
  precio_unitario: number;
  descripcion?: string;
  categoria?: string;
  unidad_medida?: string;
  stock_actual?: number | null;
  stock_minimo?: number | null;
  controla_stock: boolean;
  imagen?: string;
}

interface CartItem extends Producto {
  quantity: number;
  status: OrderStatus;
  orderTime?: Date;
  note?: string;
}

interface Table {
  id: number;
  status: 'Disponible' | 'Ocupada' | 'Esperando Cuenta';
  currentOrder: CartItem[];
}

/**
 * --- DATOS DE PRUEBA ---
 */
const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'entradas', name: 'Entradas' },
  { id: 'fondos', name: 'Platos de Fondo' },
  { id: 'bebidas', name: 'Bebidas' },
  { id: 'postres', name: 'Postres' }
];

const PRODUCTOS: Producto[] = [
  {
    id: 1,
    nombre: 'Ceviche Clásico',
    precio_unitario: 35.0,
    categoria: 'entradas',
    descripcion: 'Pescado fresco marinado en limón con cebolla y camote',
    imagen: images.Ceviche_Clásico,
    controla_stock: false
  },
  {
    id: 2,
    nombre: 'Lomo Saltado',
    precio_unitario: 42.0,
    categoria: 'fondos',
    descripcion: 'Dados de res salteados con cebolla, tomate y papas',
    imagen: images.Lomo_Saltado,
    controla_stock: false
  },
  {
    id: 3,
    nombre: 'Chicha Morada 1L',
    precio_unitario: 15.0,
    categoria: 'bebidas',
    descripcion: 'Bebida tradicional peruana',
    imagen: images.Chicha_Morada,
    controla_stock: false
  },
  {
    id: 4,
    nombre: 'Coca Cola',
    precio_unitario: 10.0,
    categoria: 'bebidas',
    descripcion: 'Bebida tradicional peruana',
    imagen: images.coca_cola,
    unidad_medida: 'und',
    stock_actual: 12,
    stock_minimo: 2,
    controla_stock: true
  },
  {
    id: 5,
    nombre: 'Suspiro a la Limeña',
    precio_unitario: 18.0,
    categoria: 'postres',
    descripcion: 'Crema de manjarblanco con merengue',
    imagen: images.Suspiro_a_la_Limeña,
    controla_stock: false
  },
  {
    id: 6,
    nombre: 'Anticuchos de Corazón',
    precio_unitario: 28.0,
    categoria: 'entradas',
    descripcion: 'Corazón de res a la parrilla',
    imagen: images.anticuchos_de_corazon,
    controla_stock: false
  }
];

export default function App() {
  const [tables, setTables] = useState<Table[]>(
    Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      status: 'Disponible',
      currentOrder: []
    }))
  );

  const [showCustomerModal, setShowCustomerModal] = useState<boolean>(false);
  const [customerInfo, setCustomerInfo] = useState({
    dni: '',
    nombre: '',
    apellido: ''
  });
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isOrdering, setIsOrdering] = useState<boolean>(false);
  const [showMobileCart, setShowMobileCart] = useState<boolean>(false);

  // Estado para pago
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('efectivo');
  const [amounts, setAmounts] = useState<Record<string, string>>({
    efectivo: '0',
    tarjeta: '0',
    yape: '0',
    plin: '0'
  });
  const [showPrecuenta, setShowPrecuenta] = useState<boolean>(false);

  const selectedTable = useMemo(
    () => tables.find((t) => t.id === selectedTableId),
    [tables, selectedTableId]
  );

  const subtotal = useMemo(
    () =>
      selectedTable?.currentOrder.reduce(
        (acc, item) => acc + item.precio_unitario * item.quantity,
        0
      ) || 0,
    [selectedTable]
  );

  const paymentCalculations = useMemo(() => {
    let totalReceived = 0;
    if (paymentMethod === 'mixto') {
      totalReceived = Object.values(amounts).reduce(
        (acc, val) => acc + (parseFloat(val) || 0),
        0
      );
    } else {
      totalReceived = parseFloat(amounts[paymentMethod]) || 0;
    }
    const change = Math.max(0, totalReceived - subtotal);
    const isCovered = totalReceived >= subtotal - 0.01; // Margen de error decimal
    return { totalReceived, change, isCovered };
  }, [amounts, paymentMethod, subtotal]);

  // Resetear montos al cambiar de método
  useEffect(() => {
    setAmounts({ efectivo: '0', tarjeta: '0', yape: '0', plin: '0' });
  }, [paymentMethod]);

  const updateTable = (tableId: number, updates: Partial<Table>) => {
    setTables((prev) =>
      prev.map((t) => (t.id === tableId ? { ...t, ...updates } : t))
    );
  };

  const addToCart = (item: Producto) => {
    if (
      !selectedTableId ||
      !selectedTable ||
      selectedTable.status === 'Esperando Cuenta'
    )
      return;
    const newOrder = [...selectedTable.currentOrder];
    const existingIndex = newOrder.findIndex(
      (i) => i.id === item.id && i.status === 'Abierto' && !i.note
    );

    if (existingIndex >= 0) {
      newOrder[existingIndex].quantity += 1;
    } else {
      newOrder.push({ ...item, quantity: 1, status: 'Abierto', note: '' });
    }
    updateTable(selectedTableId, { currentOrder: newOrder, status: 'Ocupada' });
  };

  const updateItemQuantity = (orderIndex: number, delta: number) => {
    if (!selectedTableId || !selectedTable) return;
    const newOrder = [...selectedTable.currentOrder];
    const item = newOrder[orderIndex];
    if (item && item.status === 'Abierto') {
      item.quantity = Math.max(1, item.quantity + delta);
      updateTable(selectedTableId, { currentOrder: newOrder });
    }
  };

  const updateItemNote = (orderIndex: number, note: string) => {
    if (!selectedTableId || !selectedTable) return;
    const newOrder = [...selectedTable.currentOrder];
    if (newOrder[orderIndex] && newOrder[orderIndex].status === 'Abierto') {
      newOrder[orderIndex].note = note;
      updateTable(selectedTableId, { currentOrder: newOrder });
    }
  };

  const removeFromCart = (orderIndex: number) => {
    if (!selectedTableId || !selectedTable) return;
    const newOrder = selectedTable.currentOrder.filter(
      (_, idx) => idx !== orderIndex
    );
    updateTable(selectedTableId, {
      currentOrder: newOrder,
      status: newOrder.length === 0 ? 'Disponible' : 'Ocupada'
    });
  };

  const handleSendToKitchen = () => {
    if (!selectedTableId || !selectedTable) return;
    setIsOrdering(true);
    setTimeout(() => {
      const updatedOrder = selectedTable.currentOrder.map((item) =>
        item.status === 'Abierto'
          ? { ...item, status: 'Enviado' as OrderStatus, orderTime: new Date() }
          : item
      );
      updateTable(selectedTableId, { currentOrder: updatedOrder });
      setIsOrdering(false);
    }, 800);
  };

  const cancelPaymentRequest = () => {
    if (!selectedTableId || !selectedTable) return;

    updateTable(selectedTableId, {
      status: 'Ocupada'
    });

    // Resetear estados de pago
    setPaymentMethod('efectivo');
    setAmounts({
      efectivo: '0',
      tarjeta: '0',
      yape: '0',
      plin: '0'
    });
  };

  const confirmPaymentWithCustomer = () => {
    if (!selectedTableId || !selectedTable || !paymentCalculations.isCovered)
      return;

    // GENERACIÓN DEL JSON DETALLADO
    const orderData = {
      id_transaccion: `TRX-${Date.now()}`,
      fecha_hora: new Date().toISOString(),
      mesa: selectedTable.id,
      cliente: {
        dni: customerInfo.dni.trim() || null,
        nombre_completo:
          `${customerInfo.nombre.trim()} ${customerInfo.apellido.trim()}`.trim() ||
          null,
        quiere_factura: !!(customerInfo.dni || customerInfo.nombre)
      },
      resumen_economico: {
        total_pagar: subtotal,
        total_recibido: paymentCalculations.totalReceived,
        cambio_devuelto: paymentCalculations.change,
        metodo_pago: paymentMethod,
        desglose_pagos:
          paymentMethod === 'mixto'
            ? {
                efectivo: parseFloat(amounts.efectivo) || 0,
                tarjeta: parseFloat(amounts.tarjeta) || 0,
                yape: parseFloat(amounts.yape) || 0,
                plin: parseFloat(amounts.plin) || 0
              }
            : { [paymentMethod]: paymentCalculations.totalReceived }
      },
      productos: selectedTable.currentOrder.map((item) => ({
        id_producto: item.id,
        nombre: item.nombre,
        categoria: item.categoria,
        cantidad: item.quantity,
        precio_unitario: item.precio_unitario,
        subtotal: item.precio_unitario * item.quantity,
        nota_especial: item.note || 'Sin notas',
        estado_final: item.status,
        hora_pedido: item.orderTime?.toISOString() || null
      }))
    };

    // Imprimimos el JSON en consola para auditoría
    console.log('--- TICKET DE VENTA GENERADO ---');
    console.log(JSON.stringify(orderData, null, 2));

    // Aquí podrías enviar orderData a un backend
    // alert("Pedido Finalizado. JSON generado en consola.");

    updateTable(selectedTableId, {
      status: 'Disponible',
      currentOrder: []
    });
    setSelectedTableId(null);
    setShowMobileCart(false);
    setShowCustomerModal(false);
    setCustomerInfo({ dni: '', nombre: '', apellido: '' });
    setAmounts({ efectivo: '0', tarjeta: '0', yape: '0', plin: '0' });
  };

  const filteredItems = PRODUCTOS.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.categoria === activeCategory;
    const matchesSearch = item.nombre
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFinishTable = () => {
    if (!selectedTableId || !selectedTable || !paymentCalculations.isCovered)
      return;

    // En lugar de cerrar directamente, abrimos el modal
    setShowCustomerModal(true);
  };

  const showPreCuenta = () => {
    if (!selectedTable || selectedTable.currentOrder.length === 0) return;
    setShowPrecuenta(true);
  };
  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-slate-50 overflow-hidden font-sans">
      {/* SECCIÓN IZQUIERDA: MENÚ Y MESAS (OCUPA EL RESTO DEL ESPACIO) */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-hidden border-r border-slate-200">
        <div className="p-4 bg-white border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <LayoutGrid size={18} className="text-slate-400" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
                Mesas
              </h3>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {tables.map((table) => (
              <button
                key={table.id}
                onClick={() => setSelectedTableId(table.id)}
                className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-bold border transition-all
                  ${
                    selectedTableId === table.id
                      ? 'bg-orange-600 border-orange-600 text-white shadow-lg scale-105'
                      : table.status === 'Disponible'
                        ? 'bg-white border-slate-200 text-slate-600'
                        : table.status === 'Ocupada'
                          ? 'bg-blue-50 border-blue-200 text-blue-600'
                          : 'bg-green-50 border-green-200 text-green-600'
                  }`}
              >
                {table.id}
              </button>
            ))}
          </div>
          {/* Buscador y Categorías */}
          <div className="flex flex-col md:flex-row gap-3 mt-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Buscar platillo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-100 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none"
              />
            </div>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-white text-orange-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Grid de Productos con Imágenes */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
            {filteredItems.map((producto) => {
              const tieneStock = producto.controla_stock === true;
              const stockBajo =
                tieneStock &&
                producto.stock_actual !== null &&
                producto.stock_actual! <= (producto.stock_minimo || 5);

              return (
                <div
                  key={producto.id}
                  onClick={() => addToCart(producto)}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-orange-400 transition-all cursor-pointer group active:scale-[0.97] shadow-sm"
                >
                  <div className="relative h-44 bg-gray-100">
                    {producto.imagen ? (
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl text-gray-300">
                        🍽️
                      </div>
                    )}
                    {/* Badge de Stock */}
                    {tieneStock && (
                      <div
                        className={`absolute top-2 right-2 px-2 py-0.5 text-xs font-bold rounded-full shadow-sm
                                  ${stockBajo ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                      >
                        {producto.stock_actual}{' '}
                        {producto.unidad_medida || 'und'}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-sm leading-tight line-clamp-2 flex-1">
                        {producto.nombre}
                      </h3>
                      <span className="text-orange-600 font-black text-base whitespace-nowrap">
                        S/ {producto.precio_unitario.toFixed(2)}
                      </span>
                    </div>
                    {producto.descripcion && (
                      <p className="text-[10px] text-gray-500 line-clamp-2 mt-1">
                        {producto.descripcion}
                      </p>
                    )}

                    {/* Indicador de control de stock */}
                    {tieneStock && (
                      <div className="mt-2 flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] text-gray-500">
                          Controla stock
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <aside
        className={`
                fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-0 lg:w-[380px] bg-white border-l border-slate-200 flex flex-col transition-transform duration-300
                ${showMobileCart ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'}
              `}
      >
        {/* Cabecera compacta (Fija) */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <ChefHat size={18} className="text-orange-600" />
              <h2 className="font-black text-slate-800 text-sm uppercase">
                Mesa {selectedTableId || '--'}
              </h2>
            </div>
            {selectedTable && (
              <span
                className={`text-[9px] font-black px-2 py-0.5 rounded-full mt-1 w-fit uppercase tracking-wider
                      ${
                        selectedTable.status === 'Disponible'
                          ? 'bg-slate-100 text-slate-400'
                          : selectedTable.status === 'Ocupada'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-green-100 text-green-600'
                      }`}
              >
                {selectedTable.status === 'Esperando Cuenta'
                  ? 'POR COBRAR'
                  : selectedTable.status}
              </span>
            )}
          </div>
          <button
            onClick={() => setShowMobileCart(false)}
            className="lg:hidden p-2 text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENIDO SCROLLABLE (Items + Métodos de pago) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/40">
          <div className="p-4 space-y-3">
            {!selectedTable ? (
              <div className="h-64 flex flex-col items-center justify-center text-slate-300 opacity-60 italic">
                <LayoutGrid size={40} className="mb-3" />
                <p className="text-xs font-bold">Selecciona una mesa</p>
              </div>
            ) : selectedTable.currentOrder.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-slate-300 italic">
                <ShoppingCart size={32} className="mb-3 opacity-20" />
                <p className="text-[10px] font-black uppercase tracking-widest text-center">
                  Carro vacío
                </p>
              </div>
            ) : (
              <>
                {/* Lista de Items */}
                {selectedTable.currentOrder.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm flex flex-col group transition-all"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-orange-600 bg-orange-50 w-5 h-5 flex items-center justify-center rounded-lg">
                          {item.quantity}
                        </span>
                        <span className="text-[11px] font-bold text-slate-800 line-clamp-1">
                          {item.nombre}
                        </span>
                      </div>
                      {item.status === 'Abierto' ? (
                        <div className="flex items-center gap-1 ">
                          <button
                            onClick={() => updateItemQuantity(idx, -1)}
                            className="p-1 hover:text-orange-600"
                          >
                            <Minus size={14} />
                          </button>
                          <button
                            onClick={() => updateItemQuantity(idx, 1)}
                            className="p-1 hover:text-orange-600"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => removeFromCart(idx)}
                            className="p-1 text-red-400 ml-1"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[8px] font-black uppercase text-slate-300">
                          {item.status}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col pl-7">
                      <div className="text-[10px] text-slate-400">
                        S/ {item.precio_unitario.toFixed(2)} c/u •{' '}
                        <span className="font-bold text-slate-600">
                          S/ {(item.precio_unitario * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      {item.status === 'Abierto' ? (
                        <div className="mt-2 flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                          <StickyNote
                            size={12}
                            className={
                              item.note ? 'text-orange-500' : 'text-slate-300'
                            }
                          />
                          <input
                            type="text"
                            placeholder="Nota..."
                            value={item.note || ''}
                            onChange={(e) =>
                              updateItemNote(idx, e.target.value)
                            }
                            className="flex-1 bg-transparent text-[10px] text-slate-600 focus:outline-none italic"
                          />
                        </div>
                      ) : (
                        item.note && (
                          <div className="mt-1.5 flex items-start gap-1.5 bg-orange-50/50 p-1.5 rounded-xl border border-orange-100/50">
                            <StickyNote
                              size={10}
                              className="text-orange-400 mt-0.5"
                            />
                            <p className="text-[10px] text-orange-700 italic">
                              "{item.note}"
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}

                {/* Sección de Pago (Dentro del scroll para que no empuje el botón final) */}
                {selectedTable?.status === 'Esperando Cuenta' && (
                  <div className="mt-6 space-y-4 pt-4 border-t border-slate-200 animate-in slide-in-from-bottom-2 relative">
                    <div>
                      {/* Botón X para volver a "Ocupada" */}
                      <button
                        onClick={cancelPaymentRequest}
                        className="absolute -top-2 -right-1 bg-white border border-slate-200 hover:bg-red-50 hover:border-red-200 text-slate-400 hover:text-red-500 p-2 rounded-full shadow-sm transition-all active:scale-90 z-10"
                        title="Volver a agregar productos"
                      >
                        <X size={18} />
                      </button>
                      <div className="flex items-center gap-2 mb-2">
                        <Wallet size={12} className="text-slate-400" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                          Método de Pago
                        </span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        {[
                          { id: 'efectivo', icon: Coins },
                          { id: 'tarjeta', icon: CreditCard },
                          { id: 'yape', icon: QrCode },
                          { id: 'plin', icon: Smartphone },
                          { id: 'mixto', icon: Calculator }
                        ].map((m) => (
                          <button
                            key={m.id}
                            onClick={() =>
                              setPaymentMethod(m.id as PaymentMethod)
                            }
                            className={`flex flex-col items-center justify-center py-2.5 rounded-xl border transition-all ${paymentMethod === m.id ? 'bg-slate-900 border-slate-900 text-white shadow-md' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}`}
                          >
                            <m.icon size={16} />
                            <span className="text-[7px] font-black uppercase mt-1">
                              {m.id}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                      {paymentMethod === 'mixto' ? (
                        <div className="grid grid-cols-2 gap-2">
                          {['efectivo', 'tarjeta', 'yape', 'plin'].map((m) => (
                            <div
                              key={m}
                              className="p-2 rounded-xl border border-slate-100"
                            >
                              <label className="text-[8px] font-black uppercase text-slate-400 block mb-0.5">
                                {m}
                              </label>
                              <div className="flex items-center text-[11px] font-bold text-slate-700">
                                <span className="mr-1 opacity-50">S/</span>
                                <input
                                  type="number"
                                  value={amounts[m]}
                                  onChange={(e) =>
                                    setAmounts({
                                      ...amounts,
                                      [m]: e.target.value
                                    })
                                  }
                                  className="w-full bg-transparent focus:outline-none"
                                  placeholder="0.00"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-2">
                          <label className="text-[8px] font-black uppercase text-slate-400 block mb-1">
                            Entregado en {paymentMethod}
                          </label>
                          <div className="flex items-center text-xl font-black text-slate-900">
                            <span className="mr-2 text-slate-300">S/</span>
                            <input
                              type="number"
                              value={amounts[paymentMethod]}
                              onChange={(e) =>
                                setAmounts({
                                  ...amounts,
                                  [paymentMethod]: e.target.value
                                })
                              }
                              className="w-full bg-transparent focus:outline-none"
                              placeholder="0.00"
                              autoFocus
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* BLOQUE FINAL FIJO (Totales y Botón Principal) */}
        <div className="border-t border-slate-200 bg-white p-4 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex justify-between items-center mb-4 px-1">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Total Cuenta
            </span>
            <span className="text-2xl font-black text-slate-900">
              S/ {subtotal.toFixed(2)}
            </span>
          </div>

          <div className="space-y-2">
            {selectedTable?.status === 'Esperando Cuenta' && (
              <div className="flex items-center justify-between px-2 py-2 bg-slate-50 rounded-xl mb-3">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-400 uppercase">
                    Recibido
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    S/ {paymentCalculations.totalReceived.toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[8px] font-black text-slate-400 uppercase">
                    Cambio
                  </span>
                  <span
                    className={`text-xs font-black ${paymentCalculations.change > 0 ? 'text-green-600' : 'text-slate-400'}`}
                  >
                    S/ {paymentCalculations.change.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {selectedTable?.currentOrder.some((i) => i.status === 'Abierto') ? (
              <button
                onClick={handleSendToKitchen}
                disabled={isOrdering}
                className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-lg shadow-orange-100 active:scale-95 transition-all disabled:opacity-50"
              >
                {isOrdering ? (
                  <Clock className="animate-spin" size={20} />
                ) : (
                  <ChefHat size={18} />
                )}
                ENVIAR A COCINA
              </button>
            ) : selectedTable?.status === 'Ocupada' ? (
              <div className="grid grid-cols-2 gap-3">
                {/* Botón Precuenta */}
                <button
                  onClick={showPreCuenta}
                  className="py-4 border-2 border-slate-700 text-slate-700 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white transition-all active:scale-95"
                >
                  <StickyNote size={18} />
                  PRECUENTA
                </button>
                <button
                  onClick={() =>
                    updateTable(selectedTableId!, {
                      status: 'Esperando Cuenta'
                    })
                  }
                  className="w-full py-4 border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white transition-all active:scale-95 shadow-sm"
                >
                  <CreditCard size={18} /> PEDIR CUENTA
                </button>
              </div>
            ) : selectedTable?.status === 'Esperando Cuenta' ? (
              <button
                onClick={handleFinishTable}
                disabled={!paymentCalculations.isCovered}
                className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95
                        ${paymentCalculations.isCovered ? 'bg-green-600 text-white shadow-green-50 group' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
              >
                {paymentCalculations.isCovered ? (
                  <>
                    CONFIRMAR PAGO{' '}
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                ) : (
                  `FALTAN S/ ${(subtotal - paymentCalculations.totalReceived).toFixed(2)}`
                )}
              </button>
            ) : (
              <div className="py-4 text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest border border-dashed border-slate-200 rounded-2xl">
                Sin acciones pendientes
              </div>
            )}
          </div>
        </div>
      </aside>
      {/* Trigger Móvil mejorado */}
      {!showMobileCart && selectedTableId && (
        <button
          onClick={() => setShowMobileCart(true)}
          className="lg:hidden fixed bottom-6 right-6 bg-orange-600 text-white px-6 py-4 rounded-full shadow-2xl z-40 flex items-center gap-3 active:scale-90 transition-transform"
        >
          <ShoppingCart size={20} />
          <span className="font-black text-sm">S/ {subtotal.toFixed(2)}</span>
        </button>
      )}

      {showMobileCart && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
          onClick={() => setShowMobileCart(false)}
        />
      )}
      {/* ===================== MODAL DATOS DEL CLIENTE ===================== */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="px-6 py-5 border-b flex items-center gap-3 bg-slate-50">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center">
                <User size={22} className="text-orange-600" />
              </div>
              <div>
                <h3 className="font-black text-xl text-slate-900">
                  Datos del Cliente
                </h3>
                <p className="text-sm text-slate-500">
                  Opcional - para nota de venta
                </p>
              </div>
            </div>

            {/* Formulario */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5">
                  DNI / RUC
                </label>
                <input
                  type="text"
                  value={customerInfo.dni}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, dni: e.target.value })
                  }
                  placeholder="Ingrese DNI o RUC (opcional)"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={customerInfo.nombre}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        nombre: e.target.value
                      })
                    }
                    placeholder="Nombre"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-1.5">
                    Apellido
                  </label>
                  <input
                    type="text"
                    value={customerInfo.apellido}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        apellido: e.target.value
                      })
                    }
                    placeholder="Apellido"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="p-4 border-t flex gap-3">
              <button
                onClick={() => {
                  setShowCustomerModal(false);
                  setCustomerInfo({ dni: '', nombre: '', apellido: '' });
                }}
                className="flex-1 py-4 text-slate-600 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all"
              >
                Saltar
              </button>
              <button
                onClick={confirmPaymentWithCustomer}
                className="flex-1 py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl transition-all active:scale-[0.97]"
              >
                CONFIRMAR PAGO
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ===================== MODAL PRECUENTA (VERSIÓN MEJORADA) ===================== */}
      {showPrecuenta && selectedTable && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="px-6 py-5 border-b flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <StickyNote size={24} className="text-orange-600" />
                <div>
                  <h3 className="font-black text-xl text-slate-900">
                    Precuenta
                  </h3>
                  <p className="text-sm text-slate-500">
                    Mesa {selectedTable.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPrecuenta(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Contenido del Ticket - Más Estructurado */}
            <div className="p-6 max-h-[65vh] overflow-y-auto custom-scrollbar">
              <div className="text-center mb-6">
                <p className="font-black text-2xl tracking-wider">
                  RESTAURANTE
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Precuenta • Mesa {selectedTable.id}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {new Date().toLocaleDateString('es-PE')}{' '}
                  {new Date().toLocaleTimeString('es-PE', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div id="precuenta-ticket">
                {/* Lista de Productos */}
                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-300 text-xs text-slate-500">
                        <th className="text-left py-2 font-medium">CANT</th>
                        <th className="text-left py-2 font-medium">
                          DESCRIPCIÓN
                        </th>
                        <th className="text-right py-2 font-medium">PRECIO</th>
                        <th className="text-right py-2 font-medium">
                          SUBTOTAL
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedTable.currentOrder.map((item, idx) => (
                        <tr key={idx} className="text-slate-700">
                          <td className="py-2.5 font-medium">
                            {item.quantity}
                          </td>
                          <td className="py-2.5">
                            {item.nombre}
                            {item.note && (
                              <p className="text-[10px] text-slate-500 italic">
                                "{item.note}"
                              </p>
                            )}
                          </td>
                          <td className="py-2.5 text-right text-slate-500">
                            S/ {item.precio_unitario.toFixed(2)}
                          </td>
                          <td className="py-2.5 text-right font-semibold">
                            S/{' '}
                            {(item.precio_unitario * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totales */}
                <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-semibold text-slate-600">
                      TOTAL A PAGAR
                    </span>
                    <span className="font-black text-3xl text-slate-900">
                      S/ {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-center text-[10px] text-slate-400 mt-4">
                    Gracias por su preferencia
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-slate-50 flex gap-3">
              <button
                onClick={() => setShowPrecuenta(false)}
                className="flex-1 py-4 text-slate-600 font-bold rounded-2xl border border-slate-200 hover:bg-slate-100 transition-all"
              >
                Cerrar
              </button>

              <button
                onClick={() => {
                  const ticketContent =
                    document.getElementById('precuenta-ticket');
                  if (!ticketContent) return;

                  const printWindow = window.open('', '_blank');
                  if (printWindow) {
                    printWindow.document.write(`
                      <html>
                        <head>
                          <title>Precuenta Mesa ${selectedTable.id}</title>
                          <style>
                            body {
                              font-family: 'Courier New', monospace;
                              padding: 20px;
                              max-width: 380px;
                              margin: 0 auto;
                              font-size: 14px;
                            }
                            .ticket {
                              border: 2px dashed #000;
                              padding: 15px;
                            }
                            h1 { text-align: center; margin: 5px 0; font-size: 18px; }
                            .info { text-align: center; font-size: 12px; margin-bottom: 15px; }
                            table { width: 100%; border-collapse: collapse; }
                            th, td { padding: 6px 4px; }
                            th { border-bottom: 1px solid #000; text-align: left; font-size: 12px; }
                            .right { text-align: right; }
                            .total {
                              font-size: 18px;
                              font-weight: bold;
                              border-top: 2px solid #000;
                              padding-top: 10px;
                              margin-top: 10px;
                            }
                            .thankyou { text-align: center; margin-top: 20px; font-size: 13px; }
                          </style>
                        </head>
                        <body>
                          <div class="ticket">
                            <h1>RESTAURANTE</h1>
                            <div class="info">
                              Precuenta - Mesa ${selectedTable.id}<br>
                              ${new Date().toLocaleString('es-PE')}
                            </div>
                            ${ticketContent.innerHTML}
                            <div class="thankyou">¡Gracias por su visita!</div>
                          </div>
                        </body>
                      </html>
                    `);
                    printWindow.document.close();
                    printWindow.focus();
                    setTimeout(() => printWindow.print(), 600);
                  }
                }}
                className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                IMPRIMIR TICKET
              </button>

              <button
                onClick={() => {
                  setShowPrecuenta(false);
                  updateTable(selectedTableId!, { status: 'Esperando Cuenta' });
                }}
                className="flex-1 py-4 bg-orange-600 text-white font-black rounded-2xl hover:bg-orange-700 transition-all"
              >
                PASAR A COBRO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Estilos para scrollbars limpios */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
}
