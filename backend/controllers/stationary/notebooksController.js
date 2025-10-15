import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllNotebooks = async (req, res) => {
  try {
    const notebooks = await sequelize.query(
      'SELECT * FROM notebooks ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(notebooks);
  } catch (error) {
    console.error("Error fetching notebooks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getNotebookById = async (req, res) => {
  try {
    const { id } = req.params;
    const notebook = await sequelize.query(
      'SELECT * FROM notebooks WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (notebook.length === 0) {
      return res.status(404).json({ error: "Notebook not found" });
    }
    res.status(200).json(notebook[0]);
  } catch (error) {
    console.error("Error fetching notebook:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createNotebook = async (req, res) => {
  try {
    const { name, image, price, description, brand, pages, size, ruling, binding, cover_type, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newNotebook] = await sequelize.query(
      `INSERT INTO notebooks (name, image, price, description, brand, pages, size, ruling, binding, cover_type, stock_quantity) 
       VALUES (:name, :image, :price, :description, :brand, :pages, :size, :ruling, :binding, :cover_type, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          brand: brand || null,
          pages: pages || null,
          size: size || null,
          ruling: ruling || null,
          binding: binding || null,
          cover_type: cover_type || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newNotebook[0]);
  } catch (error) {
    console.error("Error creating notebook:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateNotebook = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, brand, pages, size, ruling, binding, cover_type, stock_quantity } = req.body;
    const existingNotebook = await sequelize.query(
      'SELECT * FROM notebooks WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingNotebook.length === 0) {
      return res.status(404).json({ error: "Notebook not found" });
    }
    const [updatedNotebook] = await sequelize.query(
      `UPDATE notebooks SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        brand = COALESCE(:brand, brand),
        pages = COALESCE(:pages, pages),
        size = COALESCE(:size, size),
        ruling = COALESCE(:ruling, ruling),
        binding = COALESCE(:binding, binding),
        cover_type = COALESCE(:cover_type, cover_type),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, brand, pages, size, ruling, binding, cover_type, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedNotebook[0]);
  } catch (error) {
    console.error("Error updating notebook:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteNotebook = async (req, res) => {
  try {
    const { id } = req.params;
    const existingNotebook = await sequelize.query(
      'SELECT * FROM notebooks WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingNotebook.length === 0) {
      return res.status(404).json({ error: "Notebook not found" });
    }
    await sequelize.query(
      'DELETE FROM notebooks WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Notebook deleted successfully" });
  } catch (error) {
    console.error("Error deleting notebook:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
