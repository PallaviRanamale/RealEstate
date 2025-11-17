import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { check, validationResult } from "express-validator";

// Register validation rules
const registerValidationRules = [
  check('username', 'Username is required and should be at least 3 characters')
    .isString()
    .isLength({ min: 3 }),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password should be at least 6 characters').isLength({ min: 6 }),
];

// Login validation rules
const loginValidationRules = [
  check('username', 'Username is required').isString(),
  check('password', 'Password is required').exists(),
];

// Error handler middleware to process validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const register = [
  // Validation rules for registration - spread the array
  ...registerValidationRules,
  validate,
  async (req, res) => {
    const { username, email, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { username },
            { email }
          ]
        }
      });

      if (existingUser) {
        if (existingUser.username === username) {
          return res.status(400).json({ message: "Username already exists!" });
        }
        if (existingUser.email === email) {
          return res.status(400).json({ message: "Email already exists!" });
        }
      }

      // HASH THE PASSWORD
      const hashedPassword = await bcrypt.hash(password, 10);

      // CREATE A NEW USER AND SAVE TO DB
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      console.error("Registration error:", err);
      
      // Handle Prisma errors
      if (err.code === 'P2002') {
        return res.status(400).json({ message: "Username or email already exists!" });
      }
      
      if (err.message && err.message.includes('DATABASE_URL')) {
        return res.status(500).json({ message: "Database connection error. Please check your DATABASE_URL in .env file!" });
      }

      res.status(500).json({ 
        message: err.message || "Failed to create user!",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  }
];

export const login = [
  // Validation rules for login - spread the array
  ...loginValidationRules,
  validate,
  async (req, res) => {
    const { username, password } = req.body;

    try {
      // CHECK IF THE USER EXISTS
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

      // CHECK IF THE PASSWORD IS CORRECT
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid)
        return res.status(400).json({ message: "Invalid Credentials!" });

      // Check if JWT_SECRET_KEY is set
      if (!process.env.JWT_SECRET_KEY) {
        return res.status(500).json({ message: "Server configuration error. JWT_SECRET_KEY is missing!" });
      }

      // GENERATE COOKIE TOKEN AND SEND TO THE USER
      const age = 1000 * 60 * 60 * 24 * 7;

      const token = jwt.sign(
        {
          id: user.id,
          isAdmin: false,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: age }
      );

      const { password: userPassword, ...userInfo } = user;

      res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: age,
        })
        .status(200)
        .json(userInfo);
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ 
        message: err.message || "Failed to login!",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  }
];

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};


