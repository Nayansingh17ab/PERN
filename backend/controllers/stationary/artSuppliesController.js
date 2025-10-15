import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllArtSupplies = async (req, res) => {
  try {
    const artSupplies = await sequelize.query(
      'SELECT * FROM art_supplies ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(artSupplies);
  } catch (error) {
    console.error("Error fetching art supplies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getArtSupplyById = async (req, res) => {
  try {
    const { id } = req.params;
    const artSupply = await sequelize.query(
      'SELECT * FROM art_supplies WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (artSupply.length === 0) {
      return res.status(404).json({ error: "Art supply not found" });
    }
    res.status(200).json(artSupply[0]);
  } catch (error) {
    console.error("Error fetching art supply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createArtSupply = async (req, res) => {
  try {
    const { name, image, price, description, brand, type, color, quantity, material, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newArtSupply] = await sequelize.query(
      `INSERT INTO art_supplies (name, image, price, description, brand, type, color, quantity, material, stock_quantity) 
       VALUES (:name, :image, :price, :description, :brand, :type, :color, :quantity, :material, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          brand: brand || null,
          type: type || null,
          color: color || null,
          quantity: quantity || null,
          material: material || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newArtSupply[0]);
  } catch (error) {
    console.error("Error creating art supply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateArtSupply = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, brand, type, color, quantity, material, stock_quantity } = req.body;
    const existingArtSupply = await sequelize.query(
      'SELECT * FROM art_supplies WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingArtSupply.length === 0) {
      return res.status(404).json({ error: "Art supply not found" });
    }
    const [updatedArtSupply] = await sequelize.query(
      `UPDATE art_supplies SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        brand = COALESCE(:brand, brand),
        type = COALESCE(:type, type),
        color = COALESCE(:color, color),
        quantity = COALESCE(:quantity, quantity),
        material = COALESCE(:material, material),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, brand, type, color, quantity, material, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedArtSupply[0]);
  } catch (error) {
    console.error("Error updating art supply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteArtSupply = async (req, res) => {
  try {
    const { id } = req.params;
    const existingArtSupply = await sequelize.query(
      'SELECT * FROM art_supplies WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingArtSupply.length === 0) {
      return res.status(404).json({ error: "Art supply not found" });
    }
    await sequelize.query(
      'DELETE FROM art_supplies WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Art supply deleted successfully" });
  } catch (error) {
    console.error("Error deleting art supply:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
