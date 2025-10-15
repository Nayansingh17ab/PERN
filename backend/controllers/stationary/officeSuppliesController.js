import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllOfficeSupplies = async (req, res) => {
  try {
    const officeSupplies = await sequelize.query(
      'SELECT * FROM office_supplies ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(officeSupplies);
  } catch (error) {
    console.error("Error fetching office supplies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOfficeSupplyById = async (req, res) => {
  try {
    const { id } = req.params;
    const officeSupply = await sequelize.query(
      'SELECT * FROM office_supplies WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (officeSupply.length === 0) {
      return res.status(404).json({ error: "Office supply not found" });
    }
    res.status(200).json(officeSupply[0]);
  } catch (error) {
    console.error("Error fetching office supply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createOfficeSupply = async (req, res) => {
  try {
    const { name, image, price, description, brand, type, material, color, size, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newOfficeSupply] = await sequelize.query(
      `INSERT INTO office_supplies (name, image, price, description, brand, type, material, color, size, stock_quantity) 
       VALUES (:name, :image, :price, :description, :brand, :type, :material, :color, :size, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          brand: brand || null,
          type: type || null,
          material: material || null,
          color: color || null,
          size: size || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newOfficeSupply[0]);
  } catch (error) {
    console.error("Error creating office supply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateOfficeSupply = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, brand, type, material, color, size, stock_quantity } = req.body;
    const existingOfficeSupply = await sequelize.query(
      'SELECT * FROM office_supplies WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingOfficeSupply.length === 0) {
      return res.status(404).json({ error: "Office supply not found" });
    }
    const [updatedOfficeSupply] = await sequelize.query(
      `UPDATE office_supplies SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        brand = COALESCE(:brand, brand),
        type = COALESCE(:type, type),
        material = COALESCE(:material, material),
        color = COALESCE(:color, color),
        size = COALESCE(:size, size),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, brand, type, material, color, size, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedOfficeSupply[0]);
  } catch (error) {
    console.error("Error updating office supply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteOfficeSupply = async (req, res) => {
  try {
    const { id } = req.params;
    const existingOfficeSupply = await sequelize.query(
      'SELECT * FROM office_supplies WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingOfficeSupply.length === 0) {
      return res.status(404).json({ error: "Office supply not found" });
    }
    await sequelize.query(
      'DELETE FROM office_supplies WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Office supply deleted successfully" });
  } catch (error) {
    console.error("Error deleting office supply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
