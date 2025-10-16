import sequelize from "../db.config/db.js";
import { QueryTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_jwt_key_change_in_production";

// Generate JWT Token with 2 days expiry
const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role }, 
    JWT_SECRET, 
    { expiresIn: '2d' } // ✅ 2 days expiry
  );
};

// Register User
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    const existingUser = await sequelize.query(
      'SELECT * FROM users WHERE email = :email',
      { replacements: { email }, type: QueryTypes.SELECT }
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await sequelize.query(
      'INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, :role) RETURNING id, name, email, role',
      {
        replacements: { 
          name, 
          email, 
          password: hashedPassword, 
          role: role || 'customer' 
        },
        type: QueryTypes.INSERT
      }
    );

    const user = newUser[0];
    const token = generateToken(user.id, user.role);

    // Set cookie with 2 days expiry
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 2 * 24 * 60 * 60 * 1000 // ✅ 2 days in milliseconds
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const [user] = await sequelize.query(
      'SELECT * FROM users WHERE email = :email',
      { replacements: { email }, type: QueryTypes.SELECT }
    );

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user.id, user.role);

    // Set cookie with 2 days expiry
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 2 * 24 * 60 * 60 * 1000 // ✅ 2 days in milliseconds
    });

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Logout User
export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get current user
export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const [user] = await sequelize.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = :userId',
      { replacements: { userId }, type: QueryTypes.SELECT }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
