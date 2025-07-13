import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.static("public"));
const dbuser = encodeURIComponent(process.env.DBUSER);
const dbpass = encodeURIComponent(process.env.DBPASS);

mongoose
  // .connect(`mongodb://${dbuser}:${dbpass}@localhost:27017/lpu?authsource=admin`)
  .connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.10aivni.mongodb.net/mern-db?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    app.listen(8080, () => {
      console.log("Server started");
    });
  });
app.use(express.json());
app.use("/api/users", userRouter);
