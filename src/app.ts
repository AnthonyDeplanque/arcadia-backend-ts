require('dotenv').config();
import express from "express";
import cors from "cors";
// import cors = require('cors');
import path from 'path';
import { router } from "./routes";



// const express = require('express');
const app = express();

const port: string | number = process.env.PORT || 1234;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());


// router(app);
router(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
