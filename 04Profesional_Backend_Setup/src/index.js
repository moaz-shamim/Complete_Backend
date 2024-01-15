// require("dotenv").config({
//   path: "./env",
// });
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import connectDB from "./db/index.js";
import { app } from "./app.js";

/*
import express from "express";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
const app = express();

(async () => {  
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    app.on("error", (error) => {
      console.log("Express Error ::App DataBase Connection  :: error", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`Application Successfully listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
})();
*/

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Express Error ::App DataBase Connection  :: error", error);
      throw error;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️   Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection failed !!! ", error);
  });
