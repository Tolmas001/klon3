import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

export interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  isFavorite?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const monthlyPayment = Math.floor(product.price / 12);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-transparent hover:shadow-lg hover:border-gray-100 transition-all cursor-pointer group flex flex-col h-full">
      <div className="h-64 bg-gray-100 relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white hover:text-red-500 transition-colors z-10 shadow-sm">
          <Heart size={20} fill={product.isFavorite ? "currentColor" : "none"} className={product.isFavorite ? "text-red-500" : ""} />
        </div>
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-sm line-clamp-2 mb-2 group-hover:text-uzum-primary transition-colors h-10">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          <Star size={14} className="text-yellow-400 fill-current" />
          <span className="text-xs text-uzum-gray">{product.rating} ({product.reviewsCount} sharh)</span>
        </div>

        <div className="bg-yellow-100 text-[10px] font-semibold px-2 py-0.5 rounded w-fit mb-3">
          {monthlyPayment.toLocaleString()} so'm/oyiga
        </div>
        
        <div className="mt-auto">
          {product.oldPrice && (
            <span className="text-xs text-uzum-gray line-through">
              {product.oldPrice.toLocaleString()} so'm
            </span>
          )}
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">
              {product.price.toLocaleString()} so'm
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.(product);
              }}
              className="p-2 border border-gray-200 rounded-full hover:bg-uzum-bg transition-colors active:scale-95 shadow-sm"
            >
              <ShoppingCart size={20} className="text-uzum-text" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
