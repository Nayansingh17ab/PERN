import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllFilesFolders = async (req, res) => {
  try {
    const filesFolders = await sequelize.query(
      'SELECT * FROM files_folders ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(filesFolders);
  } catch (error) {
    console.error("Error fetching files and folders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFilesFolderById = async (req, res) => {
  try {
    const { id } = req.params;
    const filesFolder = await sequelize.query(
      'SELECT * FROM files_folders WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (filesFolder.length === 0) {
      return res.status(404).json({ error: "Files/Folder not found" });
    }
    res.status(200).json(filesFolder[0]);
  } catch (error) {
    console.error("Error fetching files/folder:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createFilesFolder = async (req, res) => {
  try {
    const { name, image, price, description, brand, type, size, material, color, capacity, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newFilesFolder] = await sequelize.query(
      `INSERT INTO files_folders (name, image, price, description, brand, type, size, material, color, capacity, stock_quantity) 
       VALUES (:name, :image, :price, :description, :brand, :type, :size, :material, :color, :capacity, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          brand: brand || null,
          type: type || null,
          size: size || null,
          material: material || null,
          color: color || null,
          capacity: capacity || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newFilesFolder[0]);
  } catch (error) {
    console.error("Error creating files/folder:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateFilesFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, brand, type, size, material, color, capacity, stock_quantity } = req.body;
    const existingFilesFolder = await sequelize.query(
      'SELECT * FROM files_folders WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingFilesFolder.length === 0) {
      return res.status(404).json({ error: "Files/Folder not found" });
    }
    const [updatedFilesFolder] = await sequelize.query(
      `UPDATE files_folders SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        brand = COALESCE(:brand, brand),
        type = COALESCE(:type, type),
        size = COALESCE(:size, size),
        material = COALESCE(:material, material),
        color = COALESCE(:color, color),
        capacity = COALESCE(:capacity, capacity),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, brand, type, size, material, color, capacity, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedFilesFolder[0]);
  } catch (error) {
    console.error("Error updating files/folder:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteFilesFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const existingFilesFolder = await sequelize.query(
      'SELECT * FROM files_folders WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingFilesFolder.length === 0) {
      return res.status(404).json({ error: "Files/Folder not found" });
    }
    await sequelize.query(
      'DELETE FROM files_folders WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Files/Folder deleted successfully" });
  } catch (error) {
    console.error("Error deleting files/folder:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
