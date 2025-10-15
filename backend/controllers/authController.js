import sequelize from "../db.config/db.js";
import { QueryTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_jwt_key_change_in_production";

// Generate JWT Token
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: '7d' });
};

// Register User
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    // Check if user already exists
    const existingUser = await sequelize.query(
      'SELECT * FROM users WHERE email = :email',
      { replacements: { email }, type: QueryTypes.SELECT }
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set role (default to customer, only allow admin if explicitly set)
    const userRole = role === 'admin' ? 'admin' : 'customer';

    // Create user
    const [newUser] = await sequelize.query(
      `INSERT INTO users (name, email, password, role) 
       VALUES (:name, :email, :password, :role) 
       RETURNING id, name, email, role, created_at`,
      {
        replacements: { name, email, password: hashedPassword, role: userRole },
        type: QueryTypes.INSERT
      }
    );

    // Generate token
    const token = generateToken(newUser[0].id, newUser[0].role);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser[0],
      token
    });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user
    const user = await sequelize.query(
      'SELECT * FROM users WHERE email = :email',
      { replacements: { email }, type: QueryTypes.SELECT }
    );

    if (user.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user[0].id, user[0].role);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        role: user[0].role
      },
      token
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Logout User
export const logout = async (req, res) => {
  try {
    res.cookie('token', '', { maxAge: 0 });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Current User
export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await sequelize.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = :id',
      { replacements: { id: userId }, type: QueryTypes.SELECT }
    );

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user[0]);
  } catch (error) {
    console.error("Error in getMe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
