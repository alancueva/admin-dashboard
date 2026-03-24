'use client';
import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  ClipboardList,
  Utensils,
  Coffee,
  Beer,
  IceCream,
  CheckCircle2,
  Clock,
  LayoutGrid,
  LucideIcon,
  ShoppingCart,
  X,
  Bell,
  ChefHat,
  Check,
  CreditCard,
  LogOut,
  MessageSquarePlus,
  StickyNote,
  Wallet,
  ArrowRight
} from 'lucide-react';

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

// Definición de los métodos de pago solicitados
type PaymentMethod =
  | 'efectivo'
  | 'tarjeta'
  | 'transferencia'
  | 'mixto'
  | 'otro';

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface MenuItem {
  id: number;
  category: string;
  name: string;
  price: number;
  description: string;
}

interface CartItem extends MenuItem {
  quantity: number;
  status: OrderStatus;
  orderTime?: Date;
  note?: string;
}

interface Table {
  id: number;
  status: 'Disponible' | 'Ocupada' | 'Esperando Cuenta';
  currentOrder: CartItem[];
  paymentMethod?: PaymentMethod; // Almacenamos el método elegido
}

/**
 * --- DATOS DE PRUEBA (MOCK DATA) ---
 */
const CATEGORIES: Category[] = [
  { id: 'entradas', name: 'Entradas', icon: Utensils },
  { id: 'principales', name: 'Principales', icon: Utensils },
  { id: 'bebidas', name: 'Bebidas', icon: Beer },
  { id: 'postres', name: 'Postres', icon: IceCream },
  { id: 'cafeteria', name: 'Café', icon: Coffee }
];

const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    category: 'entradas',
    name: 'Bruschettas',
    price: 1200,
    description: 'Tomate y albahaca.'
  },
  {
    id: 2,
    category: 'entradas',
    name: 'Empanada Carne',
    price: 850,
    description: 'Cortada a cuchillo.'
  },
  {
    id: 3,
    category: 'principales',
    name: 'Lomo Pimienta',
    price: 4500,
    description: 'Con papas rústicas.'
  },
  {
    id: 4,
    category: 'principales',
    name: 'Pasta Carbonara',
    price: 3200,
    description: 'Guanciale y pecorino.'
  },
  {
    id: 5,
    category: 'bebidas',
    name: 'Limonada',
    price: 950,
    description: 'Menta y jengibre.'
  },
  {
    id: 6,
    category: 'bebidas',
    name: 'Copa Malbec',
    price: 1500,
    description: 'Reserva especial.'
  },
  {
    id: 7,
    category: 'postres',
    name: 'Volcán Choco',
    price: 1800,
    description: 'Con helado.'
  }
];

export default function App() {
  /**
   * --- ESTADO GLOBAL (STATE) ---
   */
  const [tables, setTables] = useState<Table[]>(
    Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      status: 'Disponible',
      currentOrder: []
    }))
  );

  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('entradas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isOrdering, setIsOrdering] = useState<boolean>(false);
  const [showMobileCart, setShowMobileCart] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [tempPaymentMethod, setTempPaymentMethod] =
    useState<PaymentMethod>('efectivo');

  // const selectedTable = tables.find((t) => t.id === selectedTableId);

  const selectedTable = useMemo(
    () => tables.find((t) => t.id === selectedTableId),
    [tables, selectedTableId]
  );

  /**
   * --- FUNCIONES DE LÓGICA DE NEGOCIO ---
   */

  const updateTable = (tableId: number, updates: Partial<Table>) => {
    setTables((prev) =>
      prev.map((t) => (t.id === tableId ? { ...t, ...updates } : t))
    );
  };

  const addToCart = (item: MenuItem) => {
    if (!selectedTableId) return;
    const currentTable = tables.find((t) => t.id === selectedTableId)!;
    if (currentTable.status === 'Esperando Cuenta') return;

    let newOrder = [...currentTable.currentOrder];
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
    if (!selectedTableId) return;
    const newOrder = [...selectedTable!.currentOrder];
    const item = newOrder[orderIndex];
    if (item && item.status === 'Abierto') {
      item.quantity = Math.max(1, item.quantity + delta);
      updateTable(selectedTableId, { currentOrder: newOrder });
    }
  };

  const updateItemNote = (orderIndex: number, note: string) => {
    if (!selectedTableId) return;
    const newOrder = [...selectedTable!.currentOrder];
    if (newOrder[orderIndex]) {
      newOrder[orderIndex].note = note;
      updateTable(selectedTableId, { currentOrder: newOrder });
    }
  };

  const removeFromCart = (orderIndex: number) => {
    if (!selectedTableId) return;
    const newOrder = selectedTable!.currentOrder.filter(
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

      setTimeout(() => {
        setTables((prev) =>
          prev.map((t) => ({
            ...t,
            currentOrder: t.currentOrder.map((i) =>
              i.status === 'Enviado' ? { ...i, status: 'En Preparación' } : i
            )
          }))
        );

        setTimeout(() => {
          setTables((prev) =>
            prev.map((t) => {
              const hasReady = t.currentOrder.some(
                (i) => i.status === 'En Preparación'
              );
              if (hasReady) {
                setNotifications((n) => [...n, `Mesa ${t.id}: ¡Pedido Listo!`]);
              }
              return {
                ...t,
                currentOrder: t.currentOrder.map((i) =>
                  i.status === 'En Preparación' ? { ...i, status: 'Listo' } : i
                )
              };
            })
          );
        }, 5000);
      }, 3000);
    }, 1000);
  };

  const markAsServed = (orderIndex: number) => {
    if (!selectedTableId) return;
    const newOrder = [...selectedTable!.currentOrder];
    if (newOrder[orderIndex].status === 'Listo') {
      newOrder[orderIndex].status = 'Entregado';
      updateTable(selectedTableId, { currentOrder: newOrder });
    }
  };

  const handleCloseCheck = () => {
    if (!selectedTableId) return;
    updateTable(selectedTableId, { status: 'Esperando Cuenta' });
  };

  const handleFinishTable = () => {
    if (!selectedTableId) return;
    // Aquí se registraría el pago final con el método seleccionado
    console.log(`Mesa ${selectedTableId} pagada con: ${tempPaymentMethod}`);
    updateTable(selectedTableId, {
      status: 'Disponible',
      currentOrder: [],
      paymentMethod: undefined
    });
    setSelectedTableId(null);
    setShowMobileCart(false);
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(
      (item) =>
        item.category === activeCategory &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeCategory, searchQuery]);

  const subtotal =
    selectedTable?.currentOrder.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ) || 0;

  return (
    <div className="flex flex-col lg:flex-row h-screen lg:h-[calc(100vh-2rem)] max-h-[900px] w-full bg-slate-50 lg:bg-white lg:border lg:border-slate-200 lg:rounded-3xl overflow-hidden shadow-sm relative font-sans">
      {/* SECCIÓN IZQUIERDA: MENÚ Y MESAS */}
      <div className="flex-1 flex flex-col min-w-0 bg-white lg:bg-slate-50/50 overflow-hidden">
        <div className="p-3 bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <LayoutGrid size={18} className="text-slate-400" />
              <h3 className="text-xs font-black uppercase tracking-tighter text-slate-400">
                Mesas Salón
              </h3>
            </div>
            {notifications.length > 0 && (
              <button
                onClick={() => setNotifications([])}
                className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-1 rounded-lg animate-pulse"
              >
                <Bell size={14} />
                <span className="text-[10px] font-bold">
                  {notifications.length} Avisos
                </span>
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 touch-pan-x">
            {tables.map((table) => (
              <button
                key={table.id}
                onClick={() => setSelectedTableId(table.id)}
                className={`flex-shrink-0 w-12 h-12 rounded-2xl flex flex-col items-center justify-center text-xs font-bold border transition-all relative
                  ${
                    selectedTableId === table.id
                      ? 'bg-orange-600 border-orange-600 text-white shadow-lg'
                      : table.status === 'Disponible'
                        ? 'bg-white border-slate-200 text-slate-600'
                        : table.status === 'Ocupada'
                          ? 'bg-blue-50 border-blue-200 text-blue-600'
                          : 'bg-green-50 border-green-200 text-green-600'
                  }`}
              >
                {table.id}
                {table.currentOrder.some((i) => i.status === 'Listo') && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-bounce"></span>
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Buscar plato..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-100 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto no-scrollbar bg-slate-100 p-1 rounded-2xl">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
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

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                disabled={selectedTable?.status === 'Esperando Cuenta'}
                onClick={() => addToCart(item)}
                className="bg-white p-4 rounded-3xl border border-slate-200 text-left active:scale-95 lg:hover:border-orange-500 lg:hover:shadow-xl transition-all group flex flex-col h-full shadow-sm disabled:opacity-50"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-base leading-tight text-slate-800">
                    {item.name}
                  </span>
                  <span className="text-orange-600 font-black text-sm">
                    ${item.price}
                  </span>
                </div>
                <p className="text-slate-400 text-xs line-clamp-2 mb-4 flex-1">
                  {item.description}
                </p>
                <div className="flex justify-end">
                  <div className="p-2 rounded-2xl bg-slate-50 group-hover:bg-orange-600 group-hover:text-white transition-all">
                    <Plus size={18} />
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="h-24 lg:hidden"></div>
        </div>
      </div>

      {/* SECCIÓN DERECHA: COMANDA */}
      <aside
        className={`
        fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-0 lg:w-96 bg-white border-l border-slate-200 flex flex-col transition-transform duration-300 transform
        ${showMobileCart ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'}
      `}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <ChefHat size={20} className="text-orange-600" />
              <h2 className="font-black text-slate-800 tracking-tight uppercase">
                Mesa {selectedTableId || '--'}
              </h2>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 w-fit
              ${
                selectedTable?.status === 'Disponible'
                  ? 'bg-slate-100 text-slate-400'
                  : selectedTable?.status === 'Ocupada'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-green-100 text-green-600'
              }`}
            >
              {selectedTable?.status || 'Sin selección'}
            </span>
          </div>
          <button
            onClick={() => setShowMobileCart(false)}
            className="lg:hidden p-2 text-slate-400"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/30">
          {!selectedTableId ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 opacity-50">
              <LayoutGrid size={48} className="mb-4" />
              <p className="font-bold text-sm">Selecciona una mesa</p>
            </div>
          ) : selectedTable?.currentOrder.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-300">
              <Utensils size={40} className="mb-4 opacity-20" />
              <p className="text-xs font-bold uppercase tracking-widest text-center">
                Sin consumos aún
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {[
                'Listo',
                'En Preparación',
                'Enviado',
                'Abierto',
                'Entregado'
              ].map((statusGroup) => {
                const itemsWithIdx = selectedTable?.currentOrder
                  .map((item, idx) => ({ ...item, originalIdx: idx }))
                  .filter((i) => i.status === statusGroup);

                if (itemsWithIdx?.length === 0) return null;

                return (
                  <div key={statusGroup} className="space-y-3">
                    <h4
                      className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md w-fit
                      ${
                        statusGroup === 'Listo'
                          ? 'bg-red-100 text-red-600 animate-pulse'
                          : statusGroup === 'En Preparación'
                            ? 'bg-blue-100 text-blue-600'
                            : statusGroup === 'Enviado'
                              ? 'bg-amber-100 text-amber-600'
                              : statusGroup === 'Entregado'
                                ? 'bg-slate-200 text-slate-500'
                                : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {statusGroup}
                    </h4>
                    {itemsWithIdx?.map((item) => (
                      <div
                        key={`${item.id}-${item.originalIdx}`}
                        className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm transition-all overflow-hidden"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800 leading-none">
                              {item.quantity}x {item.name}
                            </span>
                            <span className="text-[10px] text-slate-400 mt-1">
                              ${item.price * item.quantity}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {item.status === 'Abierto' && (
                              <div className="flex items-center gap-1 bg-slate-50 rounded-xl p-1">
                                <button
                                  onClick={() =>
                                    updateItemQuantity(item.originalIdx, -1)
                                  }
                                  className="p-1 hover:text-orange-600"
                                >
                                  <Minus size={14} />
                                </button>
                                <button
                                  onClick={() =>
                                    updateItemQuantity(item.originalIdx, 1)
                                  }
                                  className="p-1 hover:text-orange-600"
                                >
                                  <Plus size={14} />
                                </button>
                                <button
                                  onClick={() =>
                                    removeFromCart(item.originalIdx)
                                  }
                                  className="p-1 text-slate-300 hover:text-red-500 ml-1"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            )}
                            {item.status === 'Listo' && (
                              <button
                                onClick={() => markAsServed(item.originalIdx)}
                                className="bg-green-600 text-white px-3 py-1.5 rounded-xl shadow-lg shadow-green-200 flex items-center gap-1 text-[10px] font-black"
                              >
                                <Check size={14} /> SERVIR
                              </button>
                            )}
                            {item.status === 'En Preparación' && (
                              <Clock
                                size={16}
                                className="text-blue-400 animate-spin-slow"
                              />
                            )}
                            {item.status === 'Entregado' && (
                              <CheckCircle2
                                size={16}
                                className="text-green-500"
                              />
                            )}
                          </div>
                        </div>

                        <div className="mt-2 pt-2 border-t border-slate-50">
                          {item.status === 'Abierto' ? (
                            <div className="flex items-center gap-2">
                              <StickyNote
                                size={14}
                                className={
                                  item.note
                                    ? 'text-orange-500'
                                    : 'text-slate-300'
                                }
                              />
                              <input
                                type="text"
                                placeholder="Nota adicional..."
                                value={item.note || ''}
                                onChange={(e) =>
                                  updateItemNote(
                                    item.originalIdx,
                                    e.target.value
                                  )
                                }
                                className="flex-1 bg-transparent text-[11px] text-slate-600 focus:outline-none placeholder:text-slate-300 italic"
                              />
                            </div>
                          ) : (
                            item.note && (
                              <div className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg">
                                <StickyNote
                                  size={12}
                                  className="text-orange-400 mt-0.5"
                                />
                                <p className="text-[10px] font-medium text-slate-500 italic">
                                  "{item.note}"
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-200 bg-white">
          {/* SECCIÓN DE CIERRE DE CUENTA Y MÉTODO DE PAGO */}
          {selectedTable?.status === 'Esperando Cuenta' && (
            <div className="mb-6 animate-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center gap-2 mb-3">
                <Wallet size={16} className="text-slate-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Método de Pago
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    'efectivo',
                    'tarjeta',
                    'transferencia',
                    'mixto',
                    'otro'
                  ] as PaymentMethod[]
                ).map((method) => (
                  <button
                    key={method}
                    onClick={() => setTempPaymentMethod(method)}
                    className={`px-2 py-2 text-[10px] font-bold rounded-xl border transition-all capitalize
                      ${
                        tempPaymentMethod === method
                          ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                          : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Total Mesa
            </span>
            <span className="text-2xl font-black text-slate-900">
              ${subtotal}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {selectedTable?.currentOrder.some(
              (i) => i.status === 'Abierto'
            ) && (
              <button
                onClick={handleSendToKitchen}
                disabled={isOrdering}
                className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-lg shadow-orange-200 active:scale-95 transition-all"
              >
                {isOrdering ? (
                  <Clock className="animate-spin" size={20} />
                ) : (
                  <ChefHat size={20} />
                )}
                ENVIAR A COCINA
              </button>
            )}

            {selectedTable?.status === 'Ocupada' &&
              !selectedTable.currentOrder.some(
                (i) => i.status === 'Abierto'
              ) && (
                <button
                  onClick={handleCloseCheck}
                  className="w-full py-4 border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white transition-all"
                >
                  <CreditCard size={18} /> PEDIR CUENTA
                </button>
              )}

            {selectedTable?.status === 'Esperando Cuenta' && (
              <button
                onClick={handleFinishTable}
                className="w-full py-4 bg-green-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-200 group active:scale-95 transition-all"
              >
                COBRAR (${tempPaymentMethod})
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            )}
          </div>
        </div>
      </aside>

      {!showMobileCart && selectedTableId && (
        <button
          onClick={() => setShowMobileCart(true)}
          className="lg:hidden fixed bottom-6 right-6 bg-slate-900 text-white p-5 rounded-full shadow-2xl z-40 flex items-center gap-2"
        >
          <ShoppingCart size={24} />
          {selectedTable?.currentOrder.filter((i) => i.status === 'Abierto')
            .length ? (
            <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center border-2 border-white font-bold">
              {
                selectedTable.currentOrder.filter((i) => i.status === 'Abierto')
                  .length
              }
            </span>
          ) : null}
        </button>
      )}

      {showMobileCart && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
          onClick={() => setShowMobileCart(false)}
        />
      )}
    </div>
  );
}
