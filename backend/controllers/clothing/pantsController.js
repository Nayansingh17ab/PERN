
import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllPants = async (req, res) => {
  try {
    const pants = await sequelize.query(
      'SELECT * FROM pants ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(pants);
  } catch (error) {
    console.error("Error fetching pants:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPantById = async (req, res) => {
  try {
    const { id } = req.params;
    const pant = await sequelize.query(
      'SELECT * FROM pants WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (pant.length === 0) {
      return res.status(404).json({ error: "Pant not found" });
    }
    res.status(200).json(pant[0]);
  } catch (error) {
    console.error("Error fetching pant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createPant = async (req, res) => {
  try {
    const { name, image, price, description, size, color, material, brand, fit, waist_size, length, style, gender, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newPant] = await sequelize.query(
      `INSERT INTO pants (name, image, price, description, size, color, material, brand, fit, waist_size, length, style, gender, stock_quantity) 
       VALUES (:name, :image, :price, :description, :size, :color, :material, :brand, :fit, :waist_size, :length, :style, :gender, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          size: size || null,
          color: color || null,
          material: material || null,
          brand: brand || null,
          fit: fit || null,
          waist_size: waist_size || null,
          length: length || null,
          style: style || null,
          gender: gender || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newPant[0]);
  } catch (error) {
    console.error("Error creating pant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, size, color, material, brand, fit, waist_size, length, style, gender, stock_quantity } = req.body;
    const existingPant = await sequelize.query(
      'SELECT * FROM pants WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingPant.length === 0) {
      return res.status(404).json({ error: "Pant not found" });
    }
    const [updatedPant] = await sequelize.query(
      `UPDATE pants SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        size = COALESCE(:size, size),
        color = COALESCE(:color, color),
        material = COALESCE(:material, material),
        brand = COALESCE(:brand, brand),
        fit = COALESCE(:fit, fit),
        waist_size = COALESCE(:waist_size, waist_size),
        length = COALESCE(:length, length),
        style = COALESCE(:style, style),
        gender = COALESCE(:gender, gender),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, size, color, material, brand, fit, waist_size, length, style, gender, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedPant[0]);
  } catch (error) {
    console.error("Error updating pant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePant = async (req, res) => {
  try {
    const { id } = req.params;
    const existingPant = await sequelize.query(
      'SELECT * FROM pants WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingPant.length === 0) {
      return res.status(404).json({ error: "Pant not found" });
    }
    await sequelize.query(
      'DELETE FROM pants WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Pant deleted successfully" });
  } catch (error) {
    console.error("Error deleting pant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
