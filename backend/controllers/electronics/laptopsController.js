import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllLaptops = async (req, res) => {
  try {
    const laptops = await sequelize.query(
      'SELECT * FROM laptops ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(laptops);
  } catch (error) {
    console.error("Error fetching laptops:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLaptopById = async (req, res) => {
  try {
    const { id } = req.params;
    const laptop = await sequelize.query(
      'SELECT * FROM laptops WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (laptop.length === 0) {
      return res.status(404).json({ error: "Laptop not found" });
    }
    res.status(200).json(laptop[0]);
  } catch (error) {
    console.error("Error fetching laptop:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createLaptop = async (req, res) => {
  try {
    const { name, image, price, description, brand, model, processor, ram, storage, display_size, graphics, operating_system, color, warranty_period, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newLaptop] = await sequelize.query(
      `INSERT INTO laptops (name, image, price, description, brand, model, processor, ram, storage, display_size, graphics, operating_system, color, warranty_period, stock_quantity) 
       VALUES (:name, :image, :price, :description, :brand, :model, :processor, :ram, :storage, :display_size, :graphics, :operating_system, :color, :warranty_period, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          brand: brand || null,
          model: model || null,
          processor: processor || null,
          ram: ram || null,
          storage: storage || null,
          display_size: display_size || null,
          graphics: graphics || null,
          operating_system: operating_system || null,
          color: color || null,
          warranty_period: warranty_period || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newLaptop[0]);
  } catch (error) {
    console.error("Error creating laptop:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateLaptop = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, brand, model, processor, ram, storage, display_size, graphics, operating_system, color, warranty_period, stock_quantity } = req.body;
    const existingLaptop = await sequelize.query(
      'SELECT * FROM laptops WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingLaptop.length === 0) {
      return res.status(404).json({ error: "Laptop not found" });
    }
    const [updatedLaptop] = await sequelize.query(
      `UPDATE laptops SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        brand = COALESCE(:brand, brand),
        model = COALESCE(:model, model),
        processor = COALESCE(:processor, processor),
        ram = COALESCE(:ram, ram),
        storage = COALESCE(:storage, storage),
        display_size = COALESCE(:display_size, display_size),
        graphics = COALESCE(:graphics, graphics),
        operating_system = COALESCE(:operating_system, operating_system),
        color = COALESCE(:color, color),
        warranty_period = COALESCE(:warranty_period, warranty_period),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, brand, model, processor, ram, storage, display_size, graphics, operating_system, color, warranty_period, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedLaptop[0]);
  } catch (error) {
    console.error("Error updating laptop:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteLaptop = async (req, res) => {
  try {
    const { id } = req.params;
    const existingLaptop = await sequelize.query(
      'SELECT * FROM laptops WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingLaptop.length === 0) {
      return res.status(404).json({ error: "Laptop not found" });
    }
    await sequelize.query(
      'DELETE FROM laptops WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Laptop deleted successfully" });
  } catch (error) {
    console.error("Error deleting laptop:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
