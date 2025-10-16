import sequelize from "../db.config/db.js";
import { QueryTypes } from "sequelize";

// Create new order
export const createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const userId = req.user.id;
    const {
      cart,
      totalAmount,
      taxAmount,
      shippingAddress,
      city,
      state,
      pincode,
      phone,
      paymentMethod
    } = req.body;

    console.log("📦 Creating order for user:", userId);
    console.log("🛒 Cart:", cart);

    // Validation
    if (!cart || cart.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Create order - Using replacements instead of bind
    const orderResult = await sequelize.query(
      `INSERT INTO orders (user_id, total_amount, tax_amount, shipping_address, city, state, pincode, phone, payment_method, payment_status, order_status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'completed', 'processing') 
       RETURNING *`,
      {
        bind: [userId, totalAmount, taxAmount, shippingAddress, city, state, pincode, phone, paymentMethod],
        type: QueryTypes.INSERT,
        transaction
      }
    );

    const order = orderResult[0][0]; // Get the first row from the result
    console.log("✅ Order created:", order);

    // Insert order items
    for (const item of cart) {
      await sequelize.query(
        `INSERT INTO order_items (order_id, product_id, product_name, department, subcategory, price, quantity, image) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        {
          bind: [order.id, item.id, item.name, item.department, item.subcategory, item.price, item.quantity, item.image],
          type: QueryTypes.INSERT,
          transaction
        }
      );

      // Update stock - BE CAREFUL with table name
      try {
        await sequelize.query(
          `UPDATE ${item.subcategory} SET stock_quantity = stock_quantity - $1 WHERE id = $2`,
          {
            bind: [item.quantity, item.id],
            type: QueryTypes.UPDATE,
            transaction
          }
        );
      } catch (stockError) {
        console.warn(`⚠️ Could not update stock for ${item.subcategory}:`, stockError.message);
        // Continue without failing the entire order
      }
    }

    await transaction.commit();
    console.log("✅ Order completed successfully");

    res.status(201).json({
      message: "Order placed successfully",
      order: order
    });

  } catch (error) {
    await transaction.rollback();
    console.error("❌ Error creating order:", error);
    res.status(500).json({ 
      error: "Failed to create order",
      details: error.message 
    });
  }
};

// Get user orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const orders = await sequelize.query(
      `SELECT 
        o.*,
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_id', oi.product_id,
            'product_name', oi.product_name,
            'department', oi.department,
            'subcategory', oi.subcategory,
            'price', oi.price,
            'quantity', oi.quantity,
            'image', oi.image
          )
        ) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.user_id = $1
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      {
        bind: [userId],
        type: QueryTypes.SELECT
      }
    );

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Get single order
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const [order] = await sequelize.query(
      `SELECT * FROM orders WHERE id = $1 AND user_id = $2`,
      {
        bind: [orderId, userId],
        type: QueryTypes.SELECT
      }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const items = await sequelize.query(
      `SELECT * FROM order_items WHERE order_id = $1`,
      {
        bind: [orderId],
        type: QueryTypes.SELECT
      }
    );

    res.json({ order, items });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// Admin: Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await sequelize.query(
      `SELECT 
        o.*,
        u.name as user_name,
        u.email as user_email
       FROM orders o
       JOIN users u ON o.user_id = u.id
       ORDER BY o.created_at DESC`,
      {
        type: QueryTypes.SELECT
      }
    );

    res.json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Admin: Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const updated = await sequelize.query(
      `UPDATE orders SET order_status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
      {
        bind: [orderStatus, orderId],
        type: QueryTypes.UPDATE
      }
    );

    if (!updated || updated[0].length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(updated[0][0]);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Failed to update order" });
  }
};
