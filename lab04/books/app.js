// app.js

import "dotenv/config";

import express from "express";

// 1. Inicjalizacja Express
const app = express();
const port = 3000;

import database from "./database.js";
import routesBooks from "./routes/routesBook.js";

import cookieParser from "cookie-parser"; // npm install cookie-parser

app.use(express.json()); // Middleware do parsowania JSON
app.use(cookieParser());
app.use("/api/books", routesBooks);

// 2. Połączenie z bazą
database
    .sync() // Zapewnia, że tabele istnieją (alternatywa dla db:migrate)
    .then(() => {
        app.listen(port, () => {
            console.log(`Serwer działa na http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Nie udało się połączyć z bazą danych:", err);
    });
