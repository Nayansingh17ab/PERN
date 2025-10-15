import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllCleaningSupplies = async (req, res) => {
  try {
    const supplies = await sequelize.query(
      'SELECT * FROM cleaning_supplies ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(supplies);
  } catch (error) {
    console.error("Error fetching cleaning supplies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCleaningSupplyById = async (req, res) => {
  try {
    const { id } = req.params;
    const supply = await sequelize.query(
      'SELECT * FROM cleaning_supplies WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (supply.length === 0) {
      return res.status(404).json({ error: "Cleaning supply not found" });
    }
    res.status(200).json(supply[0]);
  } catch (error) {
    console.error("Error fetching cleaning supply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createCleaningSupply = async (req, res) => {
  try {
    const { name, image, price, description, brand, type, volume, scent, eco_friendly, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newSupply] = await sequelize.query(
      `INSERT INTO cleaning_supplies (name, image, price, description, brand, type, volume, scent, eco_friendly, stock_quantity) 
       VALUES (:name, :image, :price, :description, :brand, :type, :volume, :scent, :eco_friendly, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          brand: brand || null,
          type: type || null,
          volume: volume || null,
          scent: scent || null,
          eco_friendly: eco_friendly || false,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newSupply[0]);
  } catch (error) {
    console.error("Error creating cleaning supply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCleaningSupply = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, brand, type, volume, scent, eco_friendly, stock_quantity } = req.body;
    const existingSupply = await sequelize.query(
      'SELECT * FROM cleaning_supplies WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingSupply.length === 0) {
      return res.status(404).json({ error: "Cleaning supply not found" });
    }
    const [updatedSupply] = await sequelize.query(
      `UPDATE cleaning_supplies SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        brand = COALESCE(:brand, brand),
        type = COALESCE(:type, type),
        volume = COALESCE(:volume, volume),
        scent = COALESCE(:scent, scent),
        eco_friendly = COALESCE(:eco_friendly, eco_friendly),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, brand, type, volume, scent, eco_friendly, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedSupply[0]);
  } catch (error) {
    console.error("Error updating cleaning supply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteCleaningSupply = async (req, res) => {
  try {
    const { id } = req.params;
    const existingSupply = await sequelize.query(
      'SELECT * FROM cleaning_supplies WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingSupply.length === 0) {
      return res.status(404).json({ error: "Cleaning supply not found" });
    }
    await sequelize.query(
      'DELETE FROM cleaning_supplies WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Cleaning supply deleted successfully" });
  } catch (error) {
    console.error("Error deleting cleaning supply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
