import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllStaples = async (req, res) => {
  try {
    const staples = await sequelize.query(
      'SELECT * FROM staples ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(staples);
  } catch (error) {
    console.error("Error fetching staples:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getStapleById = async (req, res) => {
  try {
    const { id } = req.params;
    const staple = await sequelize.query(
      'SELECT * FROM staples WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (staple.length === 0) {
      return res.status(404).json({ error: "Staple not found" });
    }
    res.status(200).json(staple[0]);
  } catch (error) {
    console.error("Error fetching staple:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createStaple = async (req, res) => {
  try {
    const { name, image, price, description, brand, type, weight, origin, organic, expiry_date, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newStaple] = await sequelize.query(
      `INSERT INTO staples (name, image, price, description, brand, type, weight, origin, organic, expiry_date, stock_quantity) 
       VALUES (:name, :image, :price, :description, :brand, :type, :weight, :origin, :organic, :expiry_date, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          brand: brand || null,
          type: type || null,
          weight: weight || null,
          origin: origin || null,
          organic: organic || false,
          expiry_date: expiry_date || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newStaple[0]);
  } catch (error) {
    console.error("Error creating staple:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateStaple = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, brand, type, weight, origin, organic, expiry_date, stock_quantity } = req.body;
    const existingStaple = await sequelize.query(
      'SELECT * FROM staples WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingStaple.length === 0) {
      return res.status(404).json({ error: "Staple not found" });
    }
    const [updatedStaple] = await sequelize.query(
      `UPDATE staples SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        brand = COALESCE(:brand, brand),
        type = COALESCE(:type, type),
        weight = COALESCE(:weight, weight),
        origin = COALESCE(:origin, origin),
        organic = COALESCE(:organic, organic),
        expiry_date = COALESCE(:expiry_date, expiry_date),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, brand, type, weight, origin, organic, expiry_date, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedStaple[0]);
  } catch (error) {
    console.error("Error updating staple:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteStaple = async (req, res) => {
  try {
    const { id } = req.params;
    const existingStaple = await sequelize.query(
      'SELECT * FROM staples WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingStaple.length === 0) {
      return res.status(404).json({ error: "Staple not found" });
    }
    await sequelize.query(
      'DELETE FROM staples WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Staple deleted successfully" });
  } catch (error) {
    console.error("Error deleting staple:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
