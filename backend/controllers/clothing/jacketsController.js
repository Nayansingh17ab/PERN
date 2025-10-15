import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllJackets = async (req, res) => {
  try {
    const jackets = await sequelize.query(
      'SELECT * FROM jackets ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(jackets);
  } catch (error) {
    console.error("Error fetching jackets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getJacketById = async (req, res) => {
  try {
    const { id } = req.params;
    const jacket = await sequelize.query(
      'SELECT * FROM jackets WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (jacket.length === 0) {
      return res.status(404).json({ error: "Jacket not found" });
    }
    res.status(200).json(jacket[0]);
  } catch (error) {
    console.error("Error fetching jacket:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createJacket = async (req, res) => {
  try {
    const { name, image, price, description, size, color, material, brand, jacket_type, closure_type, weather_type, hooded, gender, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newJacket] = await sequelize.query(
      `INSERT INTO jackets (name, image, price, description, size, color, material, brand, jacket_type, closure_type, weather_type, hooded, gender, stock_quantity) 
       VALUES (:name, :image, :price, :description, :size, :color, :material, :brand, :jacket_type, :closure_type, :weather_type, :hooded, :gender, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          size: size || null,
          color: color || null,
          material: material || null,
          brand: brand || null,
          jacket_type: jacket_type || null,
          closure_type: closure_type || null,
          weather_type: weather_type || null,
          hooded: hooded || false,
          gender: gender || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newJacket[0]);
  } catch (error) {
    console.error("Error creating jacket:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateJacket = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, size, color, material, brand, jacket_type, closure_type, weather_type, hooded, gender, stock_quantity } = req.body;
    const existingJacket = await sequelize.query(
      'SELECT * FROM jackets WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingJacket.length === 0) {
      return res.status(404).json({ error: "Jacket not found" });
    }
    const [updatedJacket] = await sequelize.query(
      `UPDATE jackets SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        size = COALESCE(:size, size),
        color = COALESCE(:color, color),
        material = COALESCE(:material, material),
        brand = COALESCE(:brand, brand),
        jacket_type = COALESCE(:jacket_type, jacket_type),
        closure_type = COALESCE(:closure_type, closure_type),
        weather_type = COALESCE(:weather_type, weather_type),
        hooded = COALESCE(:hooded, hooded),
        gender = COALESCE(:gender, gender),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, size, color, material, brand, jacket_type, closure_type, weather_type, hooded, gender, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedJacket[0]);
  } catch (error) {
    console.error("Error updating jacket:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteJacket = async (req, res) => {
  try {
    const { id } = req.params;
    const existingJacket = await sequelize.query(
      'SELECT * FROM jackets WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingJacket.length === 0) {
      return res.status(404).json({ error: "Jacket not found" });
    }
    await sequelize.query(
      'DELETE FROM jackets WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Jacket deleted successfully" });
  } catch (error) {
    console.error("Error deleting jacket:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
