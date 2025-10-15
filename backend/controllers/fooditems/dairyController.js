import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllDairy = async (req, res) => {
  try {
    const dairy = await sequelize.query(
      'SELECT * FROM dairy ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(dairy);
  } catch (error) {
    console.error("Error fetching dairy products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDairyById = async (req, res) => {
  try {
    const { id } = req.params;
    const dairy = await sequelize.query(
      'SELECT * FROM dairy WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (dairy.length === 0) {
      return res.status(404).json({ error: "Dairy product not found" });
    }
    res.status(200).json(dairy[0]);
  } catch (error) {
    console.error("Error fetching dairy product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createDairy = async (req, res) => {
  try {
    const { name, image, price, description, brand, weight, type, fat_content, ingredients, nutritional_info, expiry_date, organic, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newDairy] = await sequelize.query(
      `INSERT INTO dairy (name, image, price, description, brand, weight, type, fat_content, ingredients, nutritional_info, expiry_date, organic, stock_quantity) 
       VALUES (:name, :image, :price, :description, :brand, :weight, :type, :fat_content, :ingredients, :nutritional_info, :expiry_date, :organic, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          brand: brand || null,
          weight: weight || null,
          type: type || null,
          fat_content: fat_content || null,
          ingredients: ingredients || null,
          nutritional_info: nutritional_info || null,
          expiry_date: expiry_date || null,
          organic: organic || false,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newDairy[0]);
  } catch (error) {
    console.error("Error creating dairy product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateDairy = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, brand, weight, type, fat_content, ingredients, nutritional_info, expiry_date, organic, stock_quantity } = req.body;
    const existingDairy = await sequelize.query(
      'SELECT * FROM dairy WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingDairy.length === 0) {
      return res.status(404).json({ error: "Dairy product not found" });
    }
    const [updatedDairy] = await sequelize.query(
      `UPDATE dairy SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        brand = COALESCE(:brand, brand),
        weight = COALESCE(:weight, weight),
        type = COALESCE(:type, type),
        fat_content = COALESCE(:fat_content, fat_content),
        ingredients = COALESCE(:ingredients, ingredients),
        nutritional_info = COALESCE(:nutritional_info, nutritional_info),
        expiry_date = COALESCE(:expiry_date, expiry_date),
        organic = COALESCE(:organic, organic),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, brand, weight, type, fat_content, ingredients, nutritional_info, expiry_date, organic, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedDairy[0]);
  } catch (error) {
    console.error("Error updating dairy product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteDairy = async (req, res) => {
  try {
    const { id } = req.params;
    const existingDairy = await sequelize.query(
      'SELECT * FROM dairy WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingDairy.length === 0) {
      return res.status(404).json({ error: "Dairy product not found" });
    }
    await sequelize.query(
      'DELETE FROM dairy WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Dairy product deleted successfully" });
  } catch (error) {
    console.error("Error deleting dairy product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
