require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./Database/Connection");

//Routes
const SwipeRoutes = require("./Routes/Swipe_Routes");
const ProfileRoutes = require("./Routes/Profile_Routes");
const { mockMiddleware } = require("./Middleware/User_Middleware");

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
app.use(mockMiddleware);

//Routes
app.use("/profile", ProfileRoutes);
app.use("/", SwipeRoutes);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
