import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllInnerwears = async (req, res) => {
  try {
    const innerwears = await sequelize.query(
      'SELECT * FROM innerwears ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(innerwears);
  } catch (error) {
    console.error("Error fetching innerwears:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getInnerwearById = async (req, res) => {
  try {
    const { id } = req.params;
    const innerwear = await sequelize.query(
      'SELECT * FROM innerwears WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (innerwear.length === 0) {
      return res.status(404).json({ error: "Innerwear not found" });
    }
    res.status(200).json(innerwear[0]);
  } catch (error) {
    console.error("Error fetching innerwear:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createInnerwear = async (req, res) => {
  try {
    const { name, image, price, description, size, color, material, brand, type, pack_of, gender, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newInnerwear] = await sequelize.query(
      `INSERT INTO innerwears (name, image, price, description, size, color, material, brand, type, pack_of, gender, stock_quantity) 
       VALUES (:name, :image, :price, :description, :size, :color, :material, :brand, :type, :pack_of, :gender, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          size: size || null,
          color: color || null,
          material: material || null,
          brand: brand || null,
          type: type || null,
          pack_of: pack_of || null,
          gender: gender || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newInnerwear[0]);
  } catch (error) {
    console.error("Error creating innerwear:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateInnerwear = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, size, color, material, brand, type, pack_of, gender, stock_quantity } = req.body;
    const existingInnerwear = await sequelize.query(
      'SELECT * FROM innerwears WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingInnerwear.length === 0) {
      return res.status(404).json({ error: "Innerwear not found" });
    }
    const [updatedInnerwear] = await sequelize.query(
      `UPDATE innerwears SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        size = COALESCE(:size, size),
        color = COALESCE(:color, color),
        material = COALESCE(:material, material),
        brand = COALESCE(:brand, brand),
        type = COALESCE(:type, type),
        pack_of = COALESCE(:pack_of, pack_of),
        gender = COALESCE(:gender, gender),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, size, color, material, brand, type, pack_of, gender, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedInnerwear[0]);
  } catch (error) {
    console.error("Error updating innerwear:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteInnerwear = async (req, res) => {
  try {
    const { id } = req.params;
    const existingInnerwear = await sequelize.query(
      'SELECT * FROM innerwears WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingInnerwear.length === 0) {
      return res.status(404).json({ error: "Innerwear not found" });
    }
    await sequelize.query(
      'DELETE FROM innerwears WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Innerwear deleted successfully" });
  } catch (error) {
    console.error("Error deleting innerwear:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
