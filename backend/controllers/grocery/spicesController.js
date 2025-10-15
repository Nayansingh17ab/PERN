import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllSpices = async (req, res) => {
  try {
    const spices = await sequelize.query(
      'SELECT * FROM spices ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(spices);
  } catch (error) {
    console.error("Error fetching spices:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSpiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const spice = await sequelize.query(
      'SELECT * FROM spices WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (spice.length === 0) {
      return res.status(404).json({ error: "Spice not found" });
    }
    res.status(200).json(spice[0]);
  } catch (error) {
    console.error("Error fetching spice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createSpice = async (req, res) => {
  try {
    const { name, image, price, description, brand, weight, origin, type, form, expiry_date, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newSpice] = await sequelize.query(
      `INSERT INTO spices (name, image, price, description, brand, weight, origin, type, form, expiry_date, stock_quantity) 
       VALUES (:name, :image, :price, :description, :brand, :weight, :origin, :type, :form, :expiry_date, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          brand: brand || null,
          weight: weight || null,
          origin: origin || null,
          type: type || null,
          form: form || null,
          expiry_date: expiry_date || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newSpice[0]);
  } catch (error) {
    console.error("Error creating spice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateSpice = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, brand, weight, origin, type, form, expiry_date, stock_quantity } = req.body;
    const existingSpice = await sequelize.query(
      'SELECT * FROM spices WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingSpice.length === 0) {
      return res.status(404).json({ error: "Spice not found" });
    }
    const [updatedSpice] = await sequelize.query(
      `UPDATE spices SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        brand = COALESCE(:brand, brand),
        weight = COALESCE(:weight, weight),
        origin = COALESCE(:origin, origin),
        type = COALESCE(:type, type),
        form = COALESCE(:form, form),
        expiry_date = COALESCE(:expiry_date, expiry_date),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, brand, weight, origin, type, form, expiry_date, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedSpice[0]);
  } catch (error) {
    console.error("Error updating spice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteSpice = async (req, res) => {
  try {
    const { id } = req.params;
    const existingSpice = await sequelize.query(
      'SELECT * FROM spices WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingSpice.length === 0) {
      return res.status(404).json({ error: "Spice not found" });
    }
    await sequelize.query(
      'DELETE FROM spices WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Spice deleted successfully" });
  } catch (error) {
    console.error("Error deleting spice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
