import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllPens = async (req, res) => {
  try {
    const pens = await sequelize.query(
      'SELECT * FROM pens ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(pens);
  } catch (error) {
    console.error("Error fetching pens:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPenById = async (req, res) => {
  try {
    const { id } = req.params;
    const pen = await sequelize.query(
      'SELECT * FROM pens WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (pen.length === 0) {
      return res.status(404).json({ error: "Pen not found" });
    }
    res.status(200).json(pen[0]);
  } catch (error) {
    console.error("Error fetching pen:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createPen = async (req, res) => {
  try {
    const { name, image, price, description, brand, type, color, ink_color, tip_size, pack_of, refillable, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newPen] = await sequelize.query(
      `INSERT INTO pens (name, image, price, description, brand, type, color, ink_color, tip_size, pack_of, refillable, stock_quantity) 
       VALUES (:name, :image, :price, :description, :brand, :type, :color, :ink_color, :tip_size, :pack_of, :refillable, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          brand: brand || null,
          type: type || null,
          color: color || null,
          ink_color: ink_color || null,
          tip_size: tip_size || null,
          pack_of: pack_of || null,
          refillable: refillable || false,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newPen[0]);
  } catch (error) {
    console.error("Error creating pen:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePen = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, brand, type, color, ink_color, tip_size, pack_of, refillable, stock_quantity } = req.body;
    const existingPen = await sequelize.query(
      'SELECT * FROM pens WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingPen.length === 0) {
      return res.status(404).json({ error: "Pen not found" });
    }
    const [updatedPen] = await sequelize.query(
      `UPDATE pens SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        brand = COALESCE(:brand, brand),
        type = COALESCE(:type, type),
        color = COALESCE(:color, color),
        ink_color = COALESCE(:ink_color, ink_color),
        tip_size = COALESCE(:tip_size, tip_size),
        pack_of = COALESCE(:pack_of, pack_of),
        refillable = COALESCE(:refillable, refillable),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, brand, type, color, ink_color, tip_size, pack_of, refillable, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedPen[0]);
  } catch (error) {
    console.error("Error updating pen:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePen = async (req, res) => {
  try {
    const { id } = req.params;
    const existingPen = await sequelize.query(
      'SELECT * FROM pens WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingPen.length === 0) {
      return res.status(404).json({ error: "Pen not found" });
    }
    await sequelize.query(
      'DELETE FROM pens WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Pen deleted successfully" });
  } catch (error) {
    console.error("Error deleting pen:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
