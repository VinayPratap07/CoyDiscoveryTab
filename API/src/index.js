require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB, pool } = require("./Database/Connection");

const app = express();
const PORT = process.env.PORT;

//DB Connection
connectDB();

//CORS
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

//Routes
app.use("/", async (req, res) => {
  const [rows] = await pool.query("select * from users;");
  return res.status(200).json({ profiles: rows });
});

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
