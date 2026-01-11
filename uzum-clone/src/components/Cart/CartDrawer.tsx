import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '../../hooks/useCart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  totalPrice: number;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  totalPrice
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Savat</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 bg-uzum-bg rounded-full flex items-center justify-center mb-6 text-5xl">
                🛒
              </div>
              <h3 className="text-xl font-bold mb-2">Savat bo'sh</h3>
              <p className="text-uzum-gray mb-8">Hozircha savatingizda hech narsa yo'q. Xaridni boshlang!</p>
              <button 
                onClick={onClose}
                className="bg-uzum-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-uzum-secondary transition-colors"
              >
                Xarid qilishga o'tish
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-2xl relative group">
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="absolute -top-2 -right-2 p-1.5 bg-white border shadow-sm rounded-full text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg bg-white" />
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium line-clamp-2 mb-2 pr-4">{item.title}</h4>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3 bg-white border rounded-lg px-2 py-1">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="text-uzum-gray hover:text-uzum-primary transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-bold min-w-[20px] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="text-uzum-gray hover:text-uzum-primary transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-uzum-primary">{(item.price * item.quantity).toLocaleString()} so'm</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium">Jami:</span>
              <span className="text-2xl font-bold text-uzum-primary">{totalPrice.toLocaleString()} so'm</span>
            </div>
            <button className="w-full bg-uzum-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-uzum-secondary transition-all transform active:scale-95 shadow-lg">
              Rasmiylashtirishga o'tish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
