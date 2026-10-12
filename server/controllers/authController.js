import bcrypt from "bcrypt";
import prisma from "../prisma.js";
import jwt from 'jsonwebtoken'
import { signupSchema ,loginSchema} from "../validators.js";

export const signup = async (req, res) => {
  try {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.issues[0].message });
    }

    const { email, password } = result.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    res.status(201).json({ message: "User created", userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors });
    }

    const { email, password } = validation.data;

   
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

   
    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

  
    return res.json({ message: "Login successful", token });

  } catch (error) {
   
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};