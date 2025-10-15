import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllCannedGoods = async (req, res) => {
  try {
    const cannedGoods = await sequelize.query(
      'SELECT * FROM canned_goods ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(cannedGoods);
  } catch (error) {
    console.error("Error fetching canned goods:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCannedGoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const cannedGood = await sequelize.query(
      'SELECT * FROM canned_goods WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (cannedGood.length === 0) {
      return res.status(404).json({ error: "Canned good not found" });
    }
    res.status(200).json(cannedGood[0]);
  } catch (error) {
    console.error("Error fetching canned good:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createCannedGood = async (req, res) => {
  try {
    const { name, image, price, description, brand, weight, type, ingredients, nutritional_info, allergens, expiry_date, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newCannedGood] = await sequelize.query(
      `INSERT INTO canned_goods (name, image, price, description, brand, weight, type, ingredients, nutritional_info, allergens, expiry_date, stock_quantity) 
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
    res.status(201).json(newCannedGood[0]);
  } catch (error) {
    console.error("Error creating canned good:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCannedGood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, brand, weight, type, ingredients, nutritional_info, allergens, expiry_date, stock_quantity } = req.body;
    const existingCannedGood = await sequelize.query(
      'SELECT * FROM canned_goods WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingCannedGood.length === 0) {
      return res.status(404).json({ error: "Canned good not found" });
    }
    const [updatedCannedGood] = await sequelize.query(
      `UPDATE canned_goods SET
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
    res.status(200).json(updatedCannedGood[0]);
  } catch (error) {
    console.error("Error updating canned good:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteCannedGood = async (req, res) => {
  try {
    const { id } = req.params;
    const existingCannedGood = await sequelize.query(
      'SELECT * FROM canned_goods WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingCannedGood.length === 0) {
      return res.status(404).json({ error: "Canned good not found" });
    }
    await sequelize.query(
      'DELETE FROM canned_goods WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Canned good deleted successfully" });
  } catch (error) {
    console.error("Error deleting canned good:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
