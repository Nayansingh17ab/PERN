import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllMobiles = async (req, res) => {
  try {
    const mobiles = await sequelize.query(
      'SELECT * FROM mobiles ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(mobiles);
  } catch (error) {
    console.error("Error fetching mobiles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMobileById = async (req, res) => {
  try {
    const { id } = req.params;
    const mobile = await sequelize.query(
      'SELECT * FROM mobiles WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (mobile.length === 0) {
      return res.status(404).json({ error: "Mobile not found" });
    }
    res.status(200).json(mobile[0]);
  } catch (error) {
    console.error("Error fetching mobile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createMobile = async (req, res) => {
  try {
    const { name, image, price, description, brand, model, ram, storage, display_size, processor, camera, battery, color, warranty_period, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newMobile] = await sequelize.query(
      `INSERT INTO mobiles (name, image, price, description, brand, model, ram, storage, display_size, processor, camera, battery, color, warranty_period, stock_quantity) 
       VALUES (:name, :image, :price, :description, :brand, :model, :ram, :storage, :display_size, :processor, :camera, :battery, :color, :warranty_period, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          brand: brand || null,
          model: model || null,
          ram: ram || null,
          storage: storage || null,
          display_size: display_size || null,
          processor: processor || null,
          camera: camera || null,
          battery: battery || null,
          color: color || null,
          warranty_period: warranty_period || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newMobile[0]);
  } catch (error) {
    console.error("Error creating mobile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateMobile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, brand, model, ram, storage, display_size, processor, camera, battery, color, warranty_period, stock_quantity } = req.body;
    const existingMobile = await sequelize.query(
      'SELECT * FROM mobiles WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingMobile.length === 0) {
      return res.status(404).json({ error: "Mobile not found" });
    }
    const [updatedMobile] = await sequelize.query(
      `UPDATE mobiles SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        brand = COALESCE(:brand, brand),
        model = COALESCE(:model, model),
        ram = COALESCE(:ram, ram),
        storage = COALESCE(:storage, storage),
        display_size = COALESCE(:display_size, display_size),
        processor = COALESCE(:processor, processor),
        camera = COALESCE(:camera, camera),
        battery = COALESCE(:battery, battery),
        color = COALESCE(:color, color),
        warranty_period = COALESCE(:warranty_period, warranty_period),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, brand, model, ram, storage, display_size, processor, camera, battery, color, warranty_period, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedMobile[0]);
  } catch (error) {
    console.error("Error updating mobile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteMobile = async (req, res) => {
  try {
    const { id } = req.params;
    const existingMobile = await sequelize.query(
      'SELECT * FROM mobiles WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingMobile.length === 0) {
      return res.status(404).json({ error: "Mobile not found" });
    }
    await sequelize.query(
      'DELETE FROM mobiles WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Mobile deleted successfully" });
  } catch (error) {
    console.error("Error deleting mobile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
