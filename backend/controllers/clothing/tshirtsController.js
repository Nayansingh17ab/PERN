import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllTshirts = async (req, res) => {
  try {
    const tshirts = await sequelize.query(
      'SELECT * FROM tshirts ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(tshirts);
  } catch (error) {
    console.error("Error fetching t-shirts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTshirtById = async (req, res) => {
  try {
    const { id } = req.params;
    const tshirt = await sequelize.query(
      'SELECT * FROM tshirts WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (tshirt.length === 0) {
      return res.status(404).json({ error: "T-shirt not found" });
    }
    res.status(200).json(tshirt[0]);
  } catch (error) {
    console.error("Error fetching t-shirt:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createTshirt = async (req, res) => {
  try {
    const { name, image, price, description, size, color, material, brand, pattern, sleeve_type, neck_type, fit, gender, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newTshirt] = await sequelize.query(
      `INSERT INTO tshirts (name, image, price, description, size, color, material, brand, pattern, sleeve_type, neck_type, fit, gender, stock_quantity) 
       VALUES (:name, :image, :price, :description, :size, :color, :material, :brand, :pattern, :sleeve_type, :neck_type, :fit, :gender, :stock_quantity) 
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
          neck_type: neck_type || null,
          fit: fit || null,
          gender: gender || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newTshirt[0]);
  } catch (error) {
    console.error("Error creating t-shirt:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTshirt = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, size, color, material, brand, pattern, sleeve_type, neck_type, fit, gender, stock_quantity } = req.body;
    const existingTshirt = await sequelize.query(
      'SELECT * FROM tshirts WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingTshirt.length === 0) {
      return res.status(404).json({ error: "T-shirt not found" });
    }
    const [updatedTshirt] = await sequelize.query(
      `UPDATE tshirts SET
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
        neck_type = COALESCE(:neck_type, neck_type),
        fit = COALESCE(:fit, fit),
        gender = COALESCE(:gender, gender),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, size, color, material, brand, pattern, sleeve_type, neck_type, fit, gender, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedTshirt[0]);
  } catch (error) {
    console.error("Error updating t-shirt:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTshirt = async (req, res) => {
  try {
    const { id } = req.params;
    const existingTshirt = await sequelize.query(
      'SELECT * FROM tshirts WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingTshirt.length === 0) {
      return res.status(404).json({ error: "T-shirt not found" });
    }
    await sequelize.query(
      'DELETE FROM tshirts WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "T-shirt deleted successfully" });
  } catch (error) {
    console.error("Error deleting t-shirt:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
