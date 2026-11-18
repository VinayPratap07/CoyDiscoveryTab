require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./Database/Connection");
const { mockMiddleware } = require("./Middleware/User_Middleware");

//Routes
const SwipeRoutes = require("./Routes/Swipe_Routes");
const ProfileRoutes = require("./Routes/Profile_Routes");
const MatchRoutes = require("./Routes/Match_Routes");

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
app.use("/feed", ProfileRoutes);
app.use("/swipe", SwipeRoutes);
app.use("/matches", MatchRoutes);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
