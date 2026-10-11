import "dotenv/config";
import express from "express";
import cors from "cors";
import prisma from "./prisma.js";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => { 
  res.send("Server is running"); 
});


app.get("/test-db", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));