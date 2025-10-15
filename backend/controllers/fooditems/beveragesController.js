import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllBeverages = async (req, res) => {
  try {
    const beverages = await sequelize.query(
      'SELECT * FROM beverages ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(beverages);
  } catch (error) {
    console.error("Error fetching beverages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBeverageById = async (req, res) => {
  try {
    const { id } = req.params;
    const beverage = await sequelize.query(
      'SELECT * FROM beverages WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (beverage.length === 0) {
      return res.status(404).json({ error: "Beverage not found" });
    }
    res.status(200).json(beverage[0]);
  } catch (error) {
    console.error("Error fetching beverage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createBeverage = async (req, res) => {
  try {
    const { name, image, price, description, brand, volume, type, flavor, ingredients, nutritional_info, caffeine_content, expiry_date, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newBeverage] = await sequelize.query(
      `INSERT INTO beverages (name, image, price, description, brand, volume, type, flavor, ingredients, nutritional_info, caffeine_content, expiry_date, stock_quantity) 
       VALUES (:name, :image, :price, :description, :brand, :volume, :type, :flavor, :ingredients, :nutritional_info, :caffeine_content, :expiry_date, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          brand: brand || null,
          volume: volume || null,
          type: type || null,
          flavor: flavor || null,
          ingredients: ingredients || null,
          nutritional_info: nutritional_info || null,
          caffeine_content: caffeine_content || null,
          expiry_date: expiry_date || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newBeverage[0]);
  } catch (error) {
    console.error("Error creating beverage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBeverage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, brand, volume, type, flavor, ingredients, nutritional_info, caffeine_content, expiry_date, stock_quantity } = req.body;
    const existingBeverage = await sequelize.query(
      'SELECT * FROM beverages WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingBeverage.length === 0) {
      return res.status(404).json({ error: "Beverage not found" });
    }
    const [updatedBeverage] = await sequelize.query(
      `UPDATE beverages SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        brand = COALESCE(:brand, brand),
        volume = COALESCE(:volume, volume),
        type = COALESCE(:type, type),
        flavor = COALESCE(:flavor, flavor),
        ingredients = COALESCE(:ingredients, ingredients),
        nutritional_info = COALESCE(:nutritional_info, nutritional_info),
        caffeine_content = COALESCE(:caffeine_content, caffeine_content),
        expiry_date = COALESCE(:expiry_date, expiry_date),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, brand, volume, type, flavor, ingredients, nutritional_info, caffeine_content, expiry_date, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedBeverage[0]);
  } catch (error) {
    console.error("Error updating beverage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteBeverage = async (req, res) => {
  try {
    const { id } = req.params;
    const existingBeverage = await sequelize.query(
      'SELECT * FROM beverages WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingBeverage.length === 0) {
      return res.status(404).json({ error: "Beverage not found" });
    }
    await sequelize.query(
      'DELETE FROM beverages WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Beverage deleted successfully" });
  } catch (error) {
    console.error("Error deleting beverage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
