// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import router from "./routes/userRoute.js";

// dotenv.config();

// const app = express();
// app.use(bodyParser.json());
// const PORT = process.env.PORT || 7000;
// const MONGO_URL = process.env.MONGO_URL 

// mongoose.connect(MONGO_URL).then(
//  ()=>{
//     console.log("Connected to MongoDB");
//     app.listen(PORT, ()=>{
//         console.log(`Server is running on port ${PORT}`);
//     }); 
//  } 
// ).catch((err)=>{
//     console.error("Error connecting to MongoDB:", err);
  
//   })

//   app.use('/api', router);



import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // <-- import cors
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/userRoute.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL that is allowed to access backend
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // if you need cookies/authentication
  })
);

app.use(bodyParser.json());

const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/api", router);

  

