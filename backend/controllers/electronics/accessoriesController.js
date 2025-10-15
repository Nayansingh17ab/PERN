import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllAccessories = async (req, res) => {
  try {
    const accessories = await sequelize.query(
      'SELECT * FROM accessories ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(accessories);
  } catch (error) {
    console.error("Error fetching accessories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAccessoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const accessory = await sequelize.query(
      'SELECT * FROM accessories WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (accessory.length === 0) {
      return res.status(404).json({ error: "Accessory not found" });
    }
    res.status(200).json(accessory[0]);
  } catch (error) {
    console.error("Error fetching accessory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createAccessory = async (req, res) => {
  try {
    const { name, image, price, description, brand, type, compatibility, color, material, warranty_period, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newAccessory] = await sequelize.query(
      `INSERT INTO accessories (name, image, price, description, brand, type, compatibility, color, material, warranty_period, stock_quantity) 
       VALUES (:name, :image, :price, :description, :brand, :type, :compatibility, :color, :material, :warranty_period, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          brand: brand || null,
          type: type || null,
          compatibility: compatibility || null,
          color: color || null,
          material: material || null,
          warranty_period: warranty_period || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newAccessory[0]);
  } catch (error) {
    console.error("Error creating accessory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateAccessory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, brand, type, compatibility, color, material, warranty_period, stock_quantity } = req.body;
    const existingAccessory = await sequelize.query(
      'SELECT * FROM accessories WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingAccessory.length === 0) {
      return res.status(404).json({ error: "Accessory not found" });
    }
    const [updatedAccessory] = await sequelize.query(
      `UPDATE accessories SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        brand = COALESCE(:brand, brand),
        type = COALESCE(:type, type),
        compatibility = COALESCE(:compatibility, compatibility),
        color = COALESCE(:color, color),
        material = COALESCE(:material, material),
        warranty_period = COALESCE(:warranty_period, warranty_period),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, brand, type, compatibility, color, material, warranty_period, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedAccessory[0]);
  } catch (error) {
    console.error("Error updating accessory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteAccessory = async (req, res) => {
  try {
    const { id } = req.params;
    const existingAccessory = await sequelize.query(
      'SELECT * FROM accessories WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingAccessory.length === 0) {
      return res.status(404).json({ error: "Accessory not found" });
    }
    await sequelize.query(
      'DELETE FROM accessories WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Accessory deleted successfully" });
  } catch (error) {
    console.error("Error deleting accessory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
