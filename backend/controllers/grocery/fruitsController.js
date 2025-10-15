import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllFruits = async (req, res) => {
  try {
    const fruits = await sequelize.query(
      'SELECT * FROM fruits ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(fruits);
  } catch (error) {
    console.error("Error fetching fruits:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFruitById = async (req, res) => {
  try {
    const { id } = req.params;
    const fruit = await sequelize.query(
      'SELECT * FROM fruits WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (fruit.length === 0) {
      return res.status(404).json({ error: "Fruit not found" });
    }
    res.status(200).json(fruit[0]);
  } catch (error) {
    console.error("Error fetching fruit:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createFruit = async (req, res) => {
  try {
    const { name, image, price, description, type, origin, weight, organic, season, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newFruit] = await sequelize.query(
      `INSERT INTO fruits (name, image, price, description, type, origin, weight, organic, season, stock_quantity) 
       VALUES (:name, :image, :price, :description, :type, :origin, :weight, :organic, :season, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          type: type || null,
          origin: origin || null,
          weight: weight || null,
          organic: organic || false,
          season: season || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newFruit[0]);
  } catch (error) {
    console.error("Error creating fruit:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateFruit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, type, origin, weight, organic, season, stock_quantity } = req.body;
    const existingFruit = await sequelize.query(
      'SELECT * FROM fruits WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingFruit.length === 0) {
      return res.status(404).json({ error: "Fruit not found" });
    }
    const [updatedFruit] = await sequelize.query(
      `UPDATE fruits SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        type = COALESCE(:type, type),
        origin = COALESCE(:origin, origin),
        weight = COALESCE(:weight, weight),
        organic = COALESCE(:organic, organic),
        season = COALESCE(:season, season),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, type, origin, weight, organic, season, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedFruit[0]);
  } catch (error) {
    console.error("Error updating fruit:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteFruit = async (req, res) => {
  try {
    const { id } = req.params;
    const existingFruit = await sequelize.query(
      'SELECT * FROM fruits WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingFruit.length === 0) {
      return res.status(404).json({ error: "Fruit not found" });
    }
    await sequelize.query(
      'DELETE FROM fruits WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Fruit deleted successfully" });
  } catch (error) {
    console.error("Error deleting fruit:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
