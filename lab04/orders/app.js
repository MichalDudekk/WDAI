// app.js
import express from "express";

// 1. Inicjalizacja Express
const app = express();
const port = 3003;

import database from "./database.js";
import routesOrders from "./routes/routesOrder.js";

import cookieParser from "cookie-parser"; // npm install cookie-parser

app.use(express.json()); // Middleware do parsowania JSON
app.use(cookieParser());
app.use("/api/orders", routesOrders);

// 2. Połączenie z bazą
database
    .sync() // Zapewnia, że tabele istnieją
    .then(() => {
        app.listen(port, () => {
            console.log(`Serwer działa na http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Nie udało się połączyć z bazą danych:", err);
    });
