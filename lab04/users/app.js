// app.js

import "dotenv/config";

import express from "express";

const app = express();
const port = process.env.USERS_PORT || 3002;

import database from "./database.js";
import routesUsers from "./routes/routesUser.js";

app.use(express.json()); // Middleware do parsowania JSON
app.use("/api", routesUsers);

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
