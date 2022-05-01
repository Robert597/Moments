import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./dbConfig.js";
import dotenv from "dotenv";
import router from "./routes/posts.js";
dotenv.config();
import authRoute from "./routes/auth.js";
const app = express();

app.use(bodyParser.json({limit: "30mb" , extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
connectDB();
const PORT = process.env.PORT || 5000

//bringing in our routes
app.get('/', (req, res) => {
    res.send("App is running");
})
app.use("/posts", router);
app.use("/auth", authRoute);
mongoose.connection.once("connected", () => {
    app.listen(PORT, () => {console.log("server running on:" + PORT)})
})


