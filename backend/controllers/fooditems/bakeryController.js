import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllBakery = async (req, res) => {
  try {
    const bakery = await sequelize.query(
      'SELECT * FROM bakery ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(bakery);
  } catch (error) {
    console.error("Error fetching bakery items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBakeryById = async (req, res) => {
  try {
    const { id } = req.params;
    const bakery = await sequelize.query(
      'SELECT * FROM bakery WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (bakery.length === 0) {
      return res.status(404).json({ error: "Bakery item not found" });
    }
    res.status(200).json(bakery[0]);
  } catch (error) {
    console.error("Error fetching bakery item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createBakery = async (req, res) => {
  try {
    const { name, image, price, description, brand, weight, type, ingredients, nutritional_info, allergens, expiry_date, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newBakery] = await sequelize.query(
      `INSERT INTO bakery (name, image, price, description, brand, weight, type, ingredients, nutritional_info, allergens, expiry_date, stock_quantity) 
       VALUES (:name, :image, :price, :description, :brand, :weight, :type, :ingredients, :nutritional_info, :allergens, :expiry_date, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          brand: brand || null,
          weight: weight || null,
          type: type || null,
          ingredients: ingredients || null,
          nutritional_info: nutritional_info || null,
          allergens: allergens || null,
          expiry_date: expiry_date || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newBakery[0]);
  } catch (error) {
    console.error("Error creating bakery item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBakery = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, brand, weight, type, ingredients, nutritional_info, allergens, expiry_date, stock_quantity } = req.body;
    const existingBakery = await sequelize.query(
      'SELECT * FROM bakery WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingBakery.length === 0) {
      return res.status(404).json({ error: "Bakery item not found" });
    }
    const [updatedBakery] = await sequelize.query(
      `UPDATE bakery SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        brand = COALESCE(:brand, brand),
        weight = COALESCE(:weight, weight),
        type = COALESCE(:type, type),
        ingredients = COALESCE(:ingredients, ingredients),
        nutritional_info = COALESCE(:nutritional_info, nutritional_info),
        allergens = COALESCE(:allergens, allergens),
        expiry_date = COALESCE(:expiry_date, expiry_date),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, brand, weight, type, ingredients, nutritional_info, allergens, expiry_date, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedBakery[0]);
  } catch (error) {
    console.error("Error updating bakery item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteBakery = async (req, res) => {
  try {
    const { id } = req.params;
    const existingBakery = await sequelize.query(
      'SELECT * FROM bakery WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingBakery.length === 0) {
      return res.status(404).json({ error: "Bakery item not found" });
    }
    await sequelize.query(
      'DELETE FROM bakery WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Bakery item deleted successfully" });
  } catch (error) {
    console.error("Error deleting bakery item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
