// Importing required packages
import express from "express"; 
import helmet from "helmet"; 
import morgan from "morgan"; 
import cors from "cors"; 
import dotenv from "dotenv"; 
import cookieParser from "cookie-parser";
import sequelize from "./db.config/db.js"; 

// ========== AUTH ROUTES ==========
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// ========== CLOTHING ROUTES ==========
import shirtsRoutes from "./routes/clothingRoutes/shirtsRoutes.js";
import pantsRoutes from "./routes/clothingRoutes/pantsRoutes.js";
import jacketsRoutes from "./routes/clothingRoutes/jacketsRoutes.js";
import tshirtsRoutes from "./routes/clothingRoutes/tshirtsRoutes.js";
import innerwearsRoutes from "./routes/clothingRoutes/innerwearsRoutes.js";

// ========== FOOD ITEMS ROUTES ==========
import snacksRoutes from "./routes/fooditems/snacksRoutes.js";
import beveragesRoutes from "./routes/fooditems/beveragesRoutes.js";
import cannedGoodsRoutes from "./routes/fooditems/cannedGoodsRoutes.js";
import dairyRoutes from "./routes/fooditems/dairyRoutes.js";
import bakeryRoutes from "./routes/fooditems/bakeryRoutes.js";

// ========== STATIONARY ROUTES ==========
import pensRoutes from "./routes/stationary/pensRoutes.js";
import notebooksRoutes from "./routes/stationary/notebooksRoutes.js";
import filesFoldersRoutes from "./routes/stationary/filesFoldersRoutes.js";
import artSuppliesRoutes from "./routes/stationary/artSuppliesRoutes.js";
import officeSuppliesRoutes from "./routes/stationary/officeSuppliesRoutes.js";

// ========== GROCERY ROUTES ==========
import fruitsRoutes from "./routes/grocery/fruitsRoutes.js";
import vegetablesRoutes from "./routes/grocery/vegetablesRoutes.js";
import staplesRoutes from "./routes/grocery/staplesRoutes.js";
import spicesRoutes from "./routes/grocery/spicesRoutes.js";
import cleaningSuppliesRoutes from "./routes/grocery/cleaningSuppliesRoutes.js";

// ========== ELECTRONICS ROUTES ==========
import mobilesRoutes from "./routes/electronics/mobilesRoutes.js";
import laptopsRoutes from "./routes/electronics/laptopsRoutes.js";
import televisionsRoutes from "./routes/electronics/televisionsRoutes.js";
import homeAppliancesRoutes from "./routes/electronics/homeAppliancesRoutes.js";
import accessoriesRoutes from "./routes/electronics/accessoriesRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ MIDDLEWARE SETUP - CORRECT ORDER IS CRITICAL!
app.use(express.json());           // 1. Parse JSON bodies
app.use(cookieParser());            // 2. Parse cookies BEFORE routes
app.use(cors({                      // 3. CORS configuration
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(helmet());                  // 4. Security headers
app.use(morgan("dev"));             // 5. Request logging

// ========== AUTH ROUTES ==========
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// ========== CLOTHING ROUTES ==========
app.use("/api/clothing/shirts", shirtsRoutes);
app.use("/api/clothing/pants", pantsRoutes);
app.use("/api/clothing/jackets", jacketsRoutes);
app.use("/api/clothing/tshirts", tshirtsRoutes);
app.use("/api/clothing/innerwears", innerwearsRoutes);

// ========== FOOD ITEMS ROUTES ==========
app.use("/api/fooditems/snacks", snacksRoutes);
app.use("/api/fooditems/beverages", beveragesRoutes);
app.use("/api/fooditems/canned-goods", cannedGoodsRoutes);
app.use("/api/fooditems/dairy", dairyRoutes);
app.use("/api/fooditems/bakery", bakeryRoutes);

// ========== STATIONARY ROUTES ==========
app.use("/api/stationary/pens", pensRoutes);
app.use("/api/stationary/notebooks", notebooksRoutes);
app.use("/api/stationary/files-folders", filesFoldersRoutes);
app.use("/api/stationary/art-supplies", artSuppliesRoutes);
app.use("/api/stationary/office-supplies", officeSuppliesRoutes);

// ========== GROCERY ROUTES ==========
app.use("/api/grocery/fruits", fruitsRoutes);
app.use("/api/grocery/vegetables", vegetablesRoutes);
app.use("/api/grocery/staples", staplesRoutes);
app.use("/api/grocery/spices", spicesRoutes);
app.use("/api/grocery/cleaning-supplies", cleaningSuppliesRoutes);

// ========== ELECTRONICS ROUTES ==========
app.use("/api/electronics/mobiles", mobilesRoutes);
app.use("/api/electronics/laptops", laptopsRoutes);
app.use("/api/electronics/televisions", televisionsRoutes);
app.use("/api/electronics/home-appliances", homeAppliancesRoutes);
app.use("/api/electronics/accessories", accessoriesRoutes);

// ==========================
// Database Initialization
// ==========================
async function initDB() {
  try {
    // ========== AUTHENTICATION TABLES ==========
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'customer' CHECK (role IN ('admin', 'customer')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS cart (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_type VARCHAR(100) NOT NULL,
        product_id INTEGER NOT NULL,
        subcategory VARCHAR(100) NOT NULL,
        quantity INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
  CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    total_amount DECIMAL(10, 2) NOT NULL,
    tax_amount DECIMAL(10, 2) NOT NULL,
    shipping_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending',
    order_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

await sequelize.query(`
  CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    department VARCHAR(50) NOT NULL,
    subcategory VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

    // ========== CLOTHING TABLES (Already created) ==========
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS shirts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        size VARCHAR(10),
        color VARCHAR(50),
        material VARCHAR(100),
        brand VARCHAR(100),
        pattern VARCHAR(50),
        sleeve_type VARCHAR(50),
        collar_type VARCHAR(50),
        fit VARCHAR(50),
        gender VARCHAR(20),
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS pants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        size VARCHAR(10),
        color VARCHAR(50),
        material VARCHAR(100),
        brand VARCHAR(100),
        fit VARCHAR(50),
        waist_size VARCHAR(20),
        length VARCHAR(20),
        style VARCHAR(50),
        gender VARCHAR(20),
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS jackets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        size VARCHAR(10),
        color VARCHAR(50),
        material VARCHAR(100),
        brand VARCHAR(100),
        jacket_type VARCHAR(50),
        closure_type VARCHAR(50),
        weather_type VARCHAR(50),
        hooded BOOLEAN DEFAULT FALSE,
        gender VARCHAR(20),
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS tshirts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        size VARCHAR(10),
        color VARCHAR(50),
        material VARCHAR(100),
        brand VARCHAR(100),
        pattern VARCHAR(50),
        sleeve_type VARCHAR(50),
        neck_type VARCHAR(50),
        fit VARCHAR(50),
        gender VARCHAR(20),
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS innerwears (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        size VARCHAR(10),
        color VARCHAR(50),
        material VARCHAR(100),
        brand VARCHAR(100),
        type VARCHAR(50),
        pack_of INT,
        gender VARCHAR(20),
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // ========== FOOD ITEMS TABLES ==========
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS snacks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        brand VARCHAR(100),
        weight VARCHAR(50),
        flavor VARCHAR(50),
        type VARCHAR(50),
        ingredients TEXT,
        nutritional_info TEXT,
        allergens TEXT,
        expiry_date DATE,
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS beverages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        brand VARCHAR(100),
        volume VARCHAR(50),
        type VARCHAR(50),
        flavor VARCHAR(50),
        ingredients TEXT,
        nutritional_info TEXT,
        caffeine_content VARCHAR(50),
        expiry_date DATE,
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS canned_goods (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        brand VARCHAR(100),
        weight VARCHAR(50),
        type VARCHAR(50),
        ingredients TEXT,
        nutritional_info TEXT,
        allergens TEXT,
        expiry_date DATE,
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS dairy (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        brand VARCHAR(100),
        weight VARCHAR(50),
        type VARCHAR(50),
        fat_content VARCHAR(50),
        ingredients TEXT,
        nutritional_info TEXT,
        expiry_date DATE,
        organic BOOLEAN DEFAULT FALSE,
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS bakery (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        brand VARCHAR(100),
        weight VARCHAR(50),
        type VARCHAR(50),
        ingredients TEXT,
        nutritional_info TEXT,
        allergens TEXT,
        expiry_date DATE,
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // ========== STATIONARY TABLES ==========
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS pens (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        brand VARCHAR(100),
        type VARCHAR(50),
        color VARCHAR(50),
        ink_color VARCHAR(50),
        tip_size VARCHAR(20),
        pack_of INT,
        refillable BOOLEAN DEFAULT FALSE,
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS notebooks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        brand VARCHAR(100),
        pages INT,
        size VARCHAR(20),
        ruling VARCHAR(50),
        binding VARCHAR(50),
        cover_type VARCHAR(50),
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS files_folders (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        brand VARCHAR(100),
        type VARCHAR(50),
        size VARCHAR(20),
        material VARCHAR(100),
        color VARCHAR(50),
        capacity VARCHAR(50),
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS art_supplies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        brand VARCHAR(100),
        type VARCHAR(50),
        color VARCHAR(50),
        quantity INT,
        material VARCHAR(100),
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS office_supplies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        brand VARCHAR(100),
        type VARCHAR(50),
        material VARCHAR(100),
        color VARCHAR(50),
        size VARCHAR(50),
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // ========== GROCERY TABLES ==========
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS fruits (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        type VARCHAR(50),
        origin VARCHAR(100),
        weight VARCHAR(50),
        organic BOOLEAN DEFAULT FALSE,
        season VARCHAR(50),
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS vegetables (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        type VARCHAR(50),
        origin VARCHAR(100),
        weight VARCHAR(50),
        organic BOOLEAN DEFAULT FALSE,
        season VARCHAR(50),
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS staples (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        brand VARCHAR(100),
        type VARCHAR(50),
        weight VARCHAR(50),
        origin VARCHAR(100),
        organic BOOLEAN DEFAULT FALSE,
        expiry_date DATE,
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS spices (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        brand VARCHAR(100),
        weight VARCHAR(50),
        origin VARCHAR(100),
        type VARCHAR(50),
        form VARCHAR(50),
        expiry_date DATE,
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS cleaning_supplies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        brand VARCHAR(100),
        type VARCHAR(50),
        volume VARCHAR(50),
        scent VARCHAR(50),
        eco_friendly BOOLEAN DEFAULT FALSE,
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // ========== ELECTRONICS TABLES ==========
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS mobiles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        brand VARCHAR(100),
        model VARCHAR(100),
        ram VARCHAR(20),
        storage VARCHAR(20),
        display_size VARCHAR(20),
        processor VARCHAR(100),
        camera VARCHAR(50),
        battery VARCHAR(50),
        color VARCHAR(50),
        warranty_period VARCHAR(50),
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS laptops (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        brand VARCHAR(100),
        model VARCHAR(100),
        processor VARCHAR(100),
        ram VARCHAR(20),
        storage VARCHAR(50),
        display_size VARCHAR(20),
        graphics VARCHAR(100),
        operating_system VARCHAR(50),
        color VARCHAR(50),
        warranty_period VARCHAR(50),
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS televisions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        brand VARCHAR(100),
        model VARCHAR(100),
        screen_size VARCHAR(20),
        resolution VARCHAR(50),
        display_type VARCHAR(50),
        smart_tv BOOLEAN DEFAULT FALSE,
        refresh_rate VARCHAR(20),
        connectivity TEXT,
        warranty_period VARCHAR(50),
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS home_appliances (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        brand VARCHAR(100),
        model VARCHAR(100),
        type VARCHAR(50),
        capacity VARCHAR(50),
        power_consumption VARCHAR(50),
        color VARCHAR(50),
        energy_rating VARCHAR(20),
        warranty_period VARCHAR(50),
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS accessories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(500) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        brand VARCHAR(100),
        type VARCHAR(50),
        compatibility VARCHAR(200),
        color VARCHAR(50),
        material VARCHAR(100),
        warranty_period VARCHAR(50),
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);


    console.log("All department tables created successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

// ==========================
// Start the server
// ==========================
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
