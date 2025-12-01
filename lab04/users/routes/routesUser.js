import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } });
        if (user === null) throw new Error("DEV: User not found");
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw new Error("DEV: Invalid password");
        res.status(200).json({ id: user.id, email: user.email });
        return;
    } catch (error) {
        res.status(500).json({ error: "Logowanie nie powiodło się" });
        // res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: "Rejestracja nie powiodła się" });
        return -1;
    }
});

export default router;
