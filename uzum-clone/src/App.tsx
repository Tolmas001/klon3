import React from 'react';
import Navbar from './components/Layout/Navbar';
import ProductCard from './components/Home/ProductCard';
import { PRODUCTS, CATEGORIES } from './data';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Banner Section */}
        <section className="w-full h-[400px] bg-gradient-to-br from-uzum-primary via-uzum-secondary to-purple-800 rounded-3xl mb-12 flex items-center px-16 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-lg">
            <h1 className="text-6xl font-extrabold mb-6 leading-tight">Uzum Market - qulay va tez!</h1>
            <p className="text-2xl opacity-90 mb-10">Barcha mahsulotlarni ertagayoq yetkazib beramiz.</p>
            <button className="bg-white text-uzum-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg active:scale-95">
              Xaridlarni boshlash
            </button>
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none">
             <div className="w-full h-full bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-uzum-text">Kategoriyalar</h2>
            <button className="text-uzum-primary font-semibold hover:underline text-lg">Barchasi</button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-6">
            {CATEGORIES.map((cat, i) => (
              <div key={i} className="flex flex-col items-center gap-3 cursor-pointer group">
                <div className="w-16 h-16 bg-uzum-bg rounded-2xl flex items-center justify-center group-hover:bg-purple-50 group-hover:scale-110 transition-all duration-300">
                  <span className="text-3xl">{cat.icon}</span>
                </div>
                <span className="text-xs font-semibold text-center group-hover:text-uzum-primary transition-colors">{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Product Grid Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-uzum-text">Siz uchun tanladik</h2>
            <div className="flex gap-2">
              <button className="p-2 bg-uzum-bg rounded-full hover:bg-gray-200 transition-colors">←</button>
              <button className="p-2 bg-uzum-bg rounded-full hover:bg-gray-200 transition-colors">→</button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Newsletter/App Banner */}
        <section className="bg-purple-50 rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Ilovani yuklab oling</h2>
            <p className="text-lg text-uzum-gray">Sizga kerakli hamma narsa Uzum Market ilovasida. Hoziroq o'rnating!</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-900 transition-colors">App Store</button>
            <button className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-900 transition-colors">Google Play</button>
          </div>
        </section>
      </main>

      <footer className="bg-uzum-bg pt-16 pb-8 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="font-bold mb-6 text-xl">Biz haqimizda</h3>
              <ul className="space-y-4 text-base text-uzum-gray">
                <li className="hover:text-uzum-primary cursor-pointer transition-colors">Topshirish punktlari</li>
                <li className="hover:text-uzum-primary cursor-pointer transition-colors">Vakansiyalar</li>
                <li className="hover:text-uzum-primary cursor-pointer transition-colors">Biz bilan bog'lanish</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-xl">Foydalanuvchilarga</h3>
              <ul className="space-y-4 text-base text-uzum-gray">
                <li className="hover:text-uzum-primary cursor-pointer transition-colors">Savol-javoblar</li>
                <li className="hover:text-uzum-primary cursor-pointer transition-colors">Qanday buyurtma berish</li>
                <li className="hover:text-uzum-primary cursor-pointer transition-colors">To'lov usullari</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-xl">Tadbirkorlarga</h3>
              <ul className="space-y-4 text-base text-uzum-gray">
                <li className="hover:text-uzum-primary cursor-pointer transition-colors">Uzumda soting</li>
                <li className="hover:text-uzum-primary cursor-pointer transition-colors">Sotuvchi kabineti</li>
                <li className="hover:text-uzum-primary cursor-pointer transition-colors">Ta'lim markazi</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-xl">Ijtimoiy tarmoqlar</h3>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm hover:text-uzum-primary cursor-pointer">IG</div>
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm hover:text-uzum-primary cursor-pointer">TG</div>
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm hover:text-uzum-primary cursor-pointer">FB</div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t text-sm text-uzum-gray flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 Uzum Market Clone. Barcha huquqlar himoyalangan.</p>
            <div className="flex gap-8">
              <span className="hover:text-uzum-text cursor-pointer">Maxfiylik kelishuvi</span>
              <span className="hover:text-uzum-text cursor-pointer">Foydalanish shartlari</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
