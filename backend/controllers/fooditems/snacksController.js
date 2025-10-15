import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllSnacks = async (req, res) => {
  try {
    const snacks = await sequelize.query(
      'SELECT * FROM snacks ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(snacks);
  } catch (error) {
    console.error("Error fetching snacks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSnackById = async (req, res) => {
  try {
    const { id } = req.params;
    const snack = await sequelize.query(
      'SELECT * FROM snacks WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (snack.length === 0) {
      return res.status(404).json({ error: "Snack not found" });
    }
    res.status(200).json(snack[0]);
  } catch (error) {
    console.error("Error fetching snack:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createSnack = async (req, res) => {
  try {
    const { name, image, price, description, brand, weight, flavor, type, ingredients, nutritional_info, allergens, expiry_date, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newSnack] = await sequelize.query(
      `INSERT INTO snacks (name, image, price, description, brand, weight, flavor, type, ingredients, nutritional_info, allergens, expiry_date, stock_quantity) 
       VALUES (:name, :image, :price, :description, :brand, :weight, :flavor, :type, :ingredients, :nutritional_info, :allergens, :expiry_date, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          brand: brand || null,
          weight: weight || null,
          flavor: flavor || null,
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
    res.status(201).json(newSnack[0]);
  } catch (error) {
    console.error("Error creating snack:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateSnack = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, brand, weight, flavor, type, ingredients, nutritional_info, allergens, expiry_date, stock_quantity } = req.body;
    const existingSnack = await sequelize.query(
      'SELECT * FROM snacks WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingSnack.length === 0) {
      return res.status(404).json({ error: "Snack not found" });
    }
    const [updatedSnack] = await sequelize.query(
      `UPDATE snacks SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        brand = COALESCE(:brand, brand),
        weight = COALESCE(:weight, weight),
        flavor = COALESCE(:flavor, flavor),
        type = COALESCE(:type, type),
        ingredients = COALESCE(:ingredients, ingredients),
        nutritional_info = COALESCE(:nutritional_info, nutritional_info),
        allergens = COALESCE(:allergens, allergens),
        expiry_date = COALESCE(:expiry_date, expiry_date),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, brand, weight, flavor, type, ingredients, nutritional_info, allergens, expiry_date, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedSnack[0]);
  } catch (error) {
    console.error("Error updating snack:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteSnack = async (req, res) => {
  try {
    const { id } = req.params;
    const existingSnack = await sequelize.query(
      'SELECT * FROM snacks WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingSnack.length === 0) {
      return res.status(404).json({ error: "Snack not found" });
    }
    await sequelize.query(
      'DELETE FROM snacks WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Snack deleted successfully" });
  } catch (error) {
    console.error("Error deleting snack:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
