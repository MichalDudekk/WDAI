import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import generateJWT from "../middelware/generateJWT.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } });
        if (user === null) throw new Error("DEV: User not found");
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw new Error("DEV: Invalid password");

        const token = generateJWT(user.email);
        res.cookie(`auth_token`, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure tylko w produkcji
            maxAge: 3600000, // 1 hour
            sameSite: "strict",
            // sameSite: "Lax",
        });

        // console.log("Generated token:", token);
        res.status(200).json({ id: user.id, email: user.email });
        return token;
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Failed to login" });
        return;
    }
});

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser !== null) {
            res.status(400).json({
                error: "User with this email already exists",
            });
            return -1;
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                email,
                password: hashedPassword,
            });
            res.status(201).json({ id: newUser.id, email: newUser.email });
            return newUser.id;
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to register" });
        return -1;
    }
});

export default router;
