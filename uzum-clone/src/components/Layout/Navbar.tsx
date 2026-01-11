import React from 'react';
import { Search, Menu, ShoppingCart, Heart, User, MapPin } from 'lucide-react';

interface NavbarProps {
  totalItems: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ totalItems, onCartClick }) => {
  return (
    <nav className="w-full bg-white border-b sticky top-0 z-50">
      {/* Top small bar */}
      <div className="bg-uzum-bg py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm text-uzum-gray">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 cursor-pointer hover:text-uzum-text">
              <MapPin size={14} />
              Tashkent
            </span>
            <span>Uzum punktlari</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="cursor-pointer hover:text-uzum-text">Sotuvchi bo'ling</span>
            <span className="cursor-pointer hover:text-uzum-text">Savol-javoblar</span>
            <span className="cursor-pointer hover:text-uzum-text">Buyurtmalarim</span>
            <div className="flex items-center gap-1 cursor-pointer">
              <span>O'zbekcha</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-uzum-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
            U
          </div>
          <span className="text-uzum-primary font-bold text-2xl hidden md:block">uzum market</span>
        </div>

        {/* Category Button */}
        <button className="hidden md:flex items-center gap-2 bg-purple-100 text-uzum-primary px-4 py-2 rounded-md font-medium hover:bg-purple-200 transition-colors">
          <Menu size={20} />
          Katalog
        </button>

        {/* Search Bar */}
        <div className="flex-1 relative group">
          <input
            type="text"
            placeholder="Mahsulotlar va turkumlar izlash"
            className="w-full border border-gray-300 rounded-md py-2 pl-4 pr-10 outline-none focus:border-uzum-primary transition-colors"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-uzum-primary">
            <Search size={20} />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex flex-col items-center cursor-pointer hover:text-uzum-primary">
            <User size={24} />
            <span className="text-xs font-medium">Kirish</span>
          </div>
          <div className="hidden lg:flex flex-col items-center cursor-pointer hover:text-uzum-primary">
            <Heart size={24} />
            <span className="text-xs font-medium">Saralangan</span>
          </div>
          <div 
            className="flex flex-col items-center cursor-pointer hover:text-uzum-primary relative"
            onClick={onCartClick}
          >
            <ShoppingCart size={24} />
            <span className="text-xs font-medium">Savat</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-uzum-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
