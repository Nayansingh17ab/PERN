import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllTelevisions = async (req, res) => {
  try {
    const televisions = await sequelize.query(
      'SELECT * FROM televisions ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(televisions);
  } catch (error) {
    console.error("Error fetching televisions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTelevisionById = async (req, res) => {
  try {
    const { id } = req.params;
    const television = await sequelize.query(
      'SELECT * FROM televisions WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (television.length === 0) {
      return res.status(404).json({ error: "Television not found" });
    }
    res.status(200).json(television[0]);
  } catch (error) {
    console.error("Error fetching television:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createTelevision = async (req, res) => {
  try {
    const { name, image, price, description, brand, model, screen_size, resolution, display_type, smart_tv, refresh_rate, connectivity, warranty_period, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newTelevision] = await sequelize.query(
      `INSERT INTO televisions (name, image, price, description, brand, model, screen_size, resolution, display_type, smart_tv, refresh_rate, connectivity, warranty_period, stock_quantity) 
       VALUES (:name, :image, :price, :description, :brand, :model, :screen_size, :resolution, :display_type, :smart_tv, :refresh_rate, :connectivity, :warranty_period, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          brand: brand || null,
          model: model || null,
          screen_size: screen_size || null,
          resolution: resolution || null,
          display_type: display_type || null,
          smart_tv: smart_tv || false,
          refresh_rate: refresh_rate || null,
          connectivity: connectivity || null,
          warranty_period: warranty_period || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newTelevision[0]);
  } catch (error) {
    console.error("Error creating television:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTelevision = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, brand, model, screen_size, resolution, display_type, smart_tv, refresh_rate, connectivity, warranty_period, stock_quantity } = req.body;
    const existingTelevision = await sequelize.query(
      'SELECT * FROM televisions WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingTelevision.length === 0) {
      return res.status(404).json({ error: "Television not found" });
    }
    const [updatedTelevision] = await sequelize.query(
      `UPDATE televisions SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        brand = COALESCE(:brand, brand),
        model = COALESCE(:model, model),
        screen_size = COALESCE(:screen_size, screen_size),
        resolution = COALESCE(:resolution, resolution),
        display_type = COALESCE(:display_type, display_type),
        smart_tv = COALESCE(:smart_tv, smart_tv),
        refresh_rate = COALESCE(:refresh_rate, refresh_rate),
        connectivity = COALESCE(:connectivity, connectivity),
        warranty_period = COALESCE(:warranty_period, warranty_period),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, brand, model, screen_size, resolution, display_type, smart_tv, refresh_rate, connectivity, warranty_period, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedTelevision[0]);
  } catch (error) {
    console.error("Error updating television:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTelevision = async (req, res) => {
  try {
    const { id } = req.params;
    const existingTelevision = await sequelize.query(
      'SELECT * FROM televisions WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingTelevision.length === 0) {
      return res.status(404).json({ error: "Television not found" });
    }
    await sequelize.query(
      'DELETE FROM televisions WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Television deleted successfully" });
  } catch (error) {
    console.error("Error deleting television:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
