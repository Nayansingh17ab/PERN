import sequelize from "../../db.config/db.js";
import { QueryTypes } from 'sequelize';

export const getAllHomeAppliances = async (req, res) => {
  try {
    const appliances = await sequelize.query(
      'SELECT * FROM home_appliances ORDER BY created_at DESC',
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(appliances);
  } catch (error) {
    console.error("Error fetching home appliances:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getHomeApplianceById = async (req, res) => {
  try {
    const { id } = req.params;
    const appliance = await sequelize.query(
      'SELECT * FROM home_appliances WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (appliance.length === 0) {
      return res.status(404).json({ error: "Home appliance not found" });
    }
    res.status(200).json(appliance[0]);
  } catch (error) {
    console.error("Error fetching home appliance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createHomeAppliance = async (req, res) => {
  try {
    const { name, image, price, description, brand, model, type, capacity, power_consumption, color, energy_rating, warranty_period, stock_quantity } = req.body;
    if (!name || !image || !price) {
      return res.status(400).json({ error: "Name, image, and price are required" });
    }
    const [newAppliance] = await sequelize.query(
      `INSERT INTO home_appliances (name, image, price, description, brand, model, type, capacity, power_consumption, color, energy_rating, warranty_period, stock_quantity) 
       VALUES (:name, :image, :price, :description, :brand, :model, :type, :capacity, :power_consumption, :color, :energy_rating, :warranty_period, :stock_quantity) 
       RETURNING *`,
      {
        replacements: { 
          name, image, price, 
          description: description || null,
          brand: brand || null,
          model: model || null,
          type: type || null,
          capacity: capacity || null,
          power_consumption: power_consumption || null,
          color: color || null,
          energy_rating: energy_rating || null,
          warranty_period: warranty_period || null,
          stock_quantity: stock_quantity || 0
        },
        type: QueryTypes.INSERT
      }
    );
    res.status(201).json(newAppliance[0]);
  } catch (error) {
    console.error("Error creating home appliance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateHomeAppliance = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, description, brand, model, type, capacity, power_consumption, color, energy_rating, warranty_period, stock_quantity } = req.body;
    const existingAppliance = await sequelize.query(
      'SELECT * FROM home_appliances WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingAppliance.length === 0) {
      return res.status(404).json({ error: "Home appliance not found" });
    }
    const [updatedAppliance] = await sequelize.query(
      `UPDATE home_appliances SET
        name = COALESCE(:name, name),
        image = COALESCE(:image, image),
        price = COALESCE(:price, price),
        description = COALESCE(:description, description),
        brand = COALESCE(:brand, brand),
        model = COALESCE(:model, model),
        type = COALESCE(:type, type),
        capacity = COALESCE(:capacity, capacity),
        power_consumption = COALESCE(:power_consumption, power_consumption),
        color = COALESCE(:color, color),
        energy_rating = COALESCE(:energy_rating, energy_rating),
        warranty_period = COALESCE(:warranty_period, warranty_period),
        stock_quantity = COALESCE(:stock_quantity, stock_quantity),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = :id RETURNING *`,
      {
        replacements: { name, image, price, description, brand, model, type, capacity, power_consumption, color, energy_rating, warranty_period, stock_quantity, id },
        type: QueryTypes.UPDATE
      }
    );
    res.status(200).json(updatedAppliance[0]);
  } catch (error) {
    console.error("Error updating home appliance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteHomeAppliance = async (req, res) => {
  try {
    const { id } = req.params;
    const existingAppliance = await sequelize.query(
      'SELECT * FROM home_appliances WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );
    if (existingAppliance.length === 0) {
      return res.status(404).json({ error: "Home appliance not found" });
    }
    await sequelize.query(
      'DELETE FROM home_appliances WHERE id = :id',
      { replacements: { id }, type: QueryTypes.DELETE }
    );
    res.status(200).json({ message: "Home appliance deleted successfully" });
  } catch (error) {
    console.error("Error deleting home appliance:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
