// app.js

import "dotenv/config";

import express from "express";

const app = express();
const port = process.env.BOOKS_PORT || 3000;

import database from "./database.js";
import routesBooks from "./routes/routesBook.js";

import cookieParser from "cookie-parser"; // npm install cookie-parser

app.use(express.json()); // Middleware do parsowania JSON
app.use(cookieParser());
app.use("/api/books", routesBooks);

database
    .sync() // Zapewnia, że tabele istnieją (alternatywa dla db:migrate)
    .then(() => {
        app.listen(port, () => {
            console.log(`The server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        // console.error("Failed to connect to database:", err);
        console.error("Failed to connect to database");
    });
