import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllVegetables = async (req, res) => {
  try {
    const vegetables = await sequelize.query(
      'SELECT * FROM vegetables ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(vegetables);
  } catch (error) {
    console.error("Error fetching vegetables:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getVegetableById = async (req, res) => {
  try {
    const { id } = req.params;
    const vegetable = await sequelize.query(
      'SELECT * FROM vegetables WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (vegetable.length === 0) {
      return res.status(404).json({ error: "Vegetable not found" });
    }
    res.status(200).json(vegetable[0]);
  } catch (error) {
    console.error("Error fetching vegetable:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createVegetable = async (req, res) => {
  try {
    const { name, image, price, description, type, origin, weight, organic, season, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newVegetable] = await sequelize.query(
      `INSERT INTO vegetables (name, image, price, description, type, origin, weight, organic, season, stock_quantity) 
       VALUES (:name, :image, :price, :description, :type, :origin, :weight, :organic, :season, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          type: type || null,
          origin: origin || null,
          weight: weight || null,
          organic: organic || false,
          season: season || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newVegetable[0]);
  } catch (error) {
    console.error("Error creating vegetable:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateVegetable = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, type, origin, weight, organic, season, stock_quantity } = req.body;
    const existingVegetable = await sequelize.query(
      'SELECT * FROM vegetables WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingVegetable.length === 0) {
      return res.status(404).json({ error: "Vegetable not found" });
    }
    const [updatedVegetable] = await sequelize.query(
      `UPDATE vegetables SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        type = COALESCE(:type, type),
        origin = COALESCE(:origin, origin),
        weight = COALESCE(:weight, weight),
        organic = COALESCE(:organic, organic),
        season = COALESCE(:season, season),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, type, origin, weight, organic, season, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedVegetable[0]);
  } catch (error) {
    console.error("Error updating vegetable:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteVegetable = async (req, res) => {
  try {
    const { id } = req.params;
    const existingVegetable = await sequelize.query(
      'SELECT * FROM vegetables WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingVegetable.length === 0) {
      return res.status(404).json({ error: "Vegetable not found" });
    }
    await sequelize.query(
      'DELETE FROM vegetables WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Vegetable deleted successfully" });
  } catch (error) {
    console.error("Error deleting vegetable:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
