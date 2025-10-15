import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllShirts = async (req, res) => {
  try {
    const shirts = await sequelize.query(
      'SELECT * FROM shirts ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(shirts);
  } catch (error) {
    console.error("Error fetching shirts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getShirtById = async (req, res) => {
  try {
    const { id } = req.params;
    const shirt = await sequelize.query(
      'SELECT * FROM shirts WHERE id = :id',
      {
        replacements: { id },
        type: QueryTypes.SELECT
      }
    );
    if (shirt.length === 0) {
      return res.status(404).json({ error: "Shirt not found" });
    }
    res.status(200).json(shirt[0]);
  } catch (error) {
    console.error("Error fetching shirt:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createShirt = async (req, res) => {
  try {
    const { name, image, price, description, size, color, material, brand, pattern, sleeve_type, collar_type, fit, gender, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newShirt] = await sequelize.query(
      `INSERT INTO shirts (name, image, price, description, size, color, material, brand, pattern, sleeve_type, collar_type, fit, gender, stock_quantity) 
       VALUES (:name, :image, :price, :description, :size, :color, :material, :brand, :pattern, :sleeve_type, :collar_type, :fit, :gender, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          size: size || null,
          color: color || null,
          material: material || null,
          brand: brand || null,
          pattern: pattern || null,
          sleeve_type: sleeve_type || null,
          collar_type: collar_type || null,
          fit: fit || null,
          gender: gender || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newShirt[0]);
  } catch (error) {
    console.error("Error creating shirt:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateShirt = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, size, color, material, brand, pattern, sleeve_type, collar_type, fit, gender, stock_quantity } = req.body;
    const existingShirt = await sequelize.query(
      'SELECT * FROM shirts WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingShirt.length === 0) {
      return res.status(404).json({ error: "Shirt not found" });
    }
    const [updatedShirt] = await sequelize.query(
      `UPDATE shirts SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        size = COALESCE(:size, size),
        color = COALESCE(:color, color),
        material = COALESCE(:material, material),
        brand = COALESCE(:brand, brand),
        pattern = COALESCE(:pattern, pattern),
        sleeve_type = COALESCE(:sleeve_type, sleeve_type),
        collar_type = COALESCE(:collar_type, collar_type),
        fit = COALESCE(:fit, fit),
        gender = COALESCE(:gender, gender),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, size, color, material, brand, pattern, sleeve_type, collar_type, fit, gender, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedShirt[0]);
  } catch (error) {
    console.error("Error updating shirt:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteShirt = async (req, res) => {
  try {
    const { id } = req.params;
    const existingShirt = await sequelize.query(
      'SELECT * FROM shirts WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingShirt.length === 0) {
      return res.status(404).json({ error: "Shirt not found" });
    }
    await sequelize.query(
      'DELETE FROM shirts WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Shirt deleted successfully" });
  } catch (error) {
    console.error("Error deleting shirt:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
