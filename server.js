const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

const DB_PATH = path.join(__dirname, 'database.json');

// 1. Dastlabki bazani tekshirish va yaratish
const initDB = () => {
    if (!fs.existsSync(DB_PATH)) {
        const initialData = {
            products: generateInitialProducts(),
            orders: [],
            users: []
        };
        fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf8');
        console.log("Ma'lumotlar bazasi yangidan yaratildi! ✅");
    }
};

// 2. Bazani o'qish funksiyasi
const readDB = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        console.error("JSON o'qishda xato:", e);
        return { products: [], orders: [], users: [] };
    }
};

// 3. Bazaga yozish funksiyasi
const writeDB = (data) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
        console.error("Bazaga yozishda xato:", e);
    }
};

// 4. Standart mahsulotlar generatsiyasi
function generateInitialProducts() {
    const productData = [
        { name: "Matte Lipstick", category: "Makiyaj", basePrice: 150000, img: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d" },
        { name: "Vitamin C Serum", category: "Yuz parvarishi", basePrice: 350000, img: "https://images.unsplash.com/photo-1599733594230-6b823276abcc" },
        { name: "Luxury Perfume", category: "Atirlar", basePrice: 850000, img: "https://images.unsplash.com/photo-1541643600914-78b084683601" },
        { name: "Cleansing Gel", category: "Yuz parvarishi", basePrice: 120000, img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571" },
        { name: "Eyeshadow Palette", category: "Makiyaj", basePrice: 450000, img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796" },
        { name: "Hair Mask", category: "Soch parvarishi", basePrice: 200000, img: "https://images.unsplash.com/photo-1527799822340-304bc6475a6c" }
    ];
    const products = [];
    for (let i = 1; i <= 150; i++) {
        const base = productData[(i - 1) % productData.length];
        const p = base.basePrice + (i * 1000);
        products.push({
            id: i.toString(),
            name: `${base.name} #${i}`,
            price: p,
            oldPrice: p + 50000,
            category: base.category,
            description: "Ushbu premium mahsulot teringizni oziqlantiradi va unga tabiiy go'zallik bag'ishlaydi. 100% original va sifatli.",
            image: `${base.img}?w=500&sig=${i}`
        });
    }
    return products;
}

// --- API YO'LLARI ---

// Barcha mahsulotlarni olish
app.get('/api/products', (req, res) => {
    res.json(readDB().products);
});

// Mahsulot qo'shish yoki tahrirlash
app.post('/api/products', (req, res) => {
    const db = readDB();
    const p = req.body;
    
    if (p.id) {
        // TAHRIRLASH
        const index = db.products.findIndex(x => x.id.toString() === p.id.toString());
        if (index !== -1) {
            db.products[index] = { ...db.products[index], ...p };
            console.log("Mahsulot tahrirlandi: ✅", p.id);
        } else {
            return res.status(404).json({ message: "Mahsulot topilmadi" });
        }
    } else {
        // YANGI QO'SHISH
        p.id = Date.now().toString();
        db.products.unshift(p);
        console.log("Yangi mahsulot qo'shildi: ✨", p.id);
    }
    
    writeDB(db);
    res.json({ message: "Saqlandi!", product: p });
});

// Mahsulotni o'chirish
app.delete('/api/products/:id', (req, res) => {
    const db = readDB();
    const idToDelete = req.params.id.toString();
    const initialLen = db.products.length;
    db.products = db.products.filter(p => p.id.toString() !== idToDelete);
    
    if (db.products.length < initialLen) {
        writeDB(db);
        console.log("Mahsulot o'chirildi: 🗑️", idToDelete);
        res.json({ message: "O'chirildi" });
    } else {
        res.status(404).json({ message: "Topilmadi" });
    }
});

// Buyurtmalarni olish
app.get('/api/orders', (req, res) => {
    const db = readDB();
    if (req.query.email) {
        return res.json(db.orders.filter(o => o.customer.email === req.query.email));
    }
    res.json(db.orders);
});

// Buyurtma yaratish yoki Status yangilash
app.post('/api/orders', (req, res) => {
    const db = readDB();
    const data = req.body;

    if (data.id) {
        // STATUS YANGILASH
        const i = db.orders.findIndex(o => o.id.toString() === data.id.toString());
        if (i !== -1) {
            db.orders[i].status = data.status;
            writeDB(db);
            console.log("Buyurtma holati yangilandi: 🔄", data.id);
            return res.json({ message: "Holat yangilandi", order: db.orders[i] });
        }
    } else {
        // YANGI BUYURTMA
        const orderId = Math.floor(100000 + Math.random() * 900000).toString();
        const newOrder = {
            id: orderId,
            ...data,
            date: new Date().toISOString(),
            status: 'pending'
        };
        db.orders.unshift(newOrder);
        writeDB(db);
        console.log("Yangi buyurtma tushdi: 📥 #", orderId);
        return res.json({ message: "Qabul qilindi", order: newOrder });
    }
    
    res.status(400).json({ message: "Xatolik yuz berdi" });
});

// Buyurtmani o'chirish
app.delete('/api/orders/:id', (req, res) => {
    const db = readDB();
    const idToDelete = req.params.id.toString();
    const initialLen = db.orders.length;
    db.orders = db.orders.filter(o => o.id.toString() !== idToDelete);
    
    if (db.orders.length < initialLen) {
        writeDB(db);
        console.log("Buyurtma o'chirildi: 🗑️", idToDelete);
        res.json({ message: "O'chirildi" });
    } else {
        res.status(404).json({ message: "Topilmadi" });
    }
});

// Serverni ishga tushirish
initDB();
app.listen(PORT, () => {
    console.log(`\n🚀 SERVER ISHGA TUSHDI!`);
    console.log(`🔗 Manzil: http://localhost:${PORT}`);
    console.log(`📂 Baza: ${DB_PATH}\n`);
});
