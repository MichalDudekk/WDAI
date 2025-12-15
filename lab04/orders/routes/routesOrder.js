import express from "express";
import Order from "../models/order.js";
import authenticateCookie from "../middelware/authCookie.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.params.userId },
        });
        res.status(200).json(orders);
    } catch (error) {
        // res.status(500).json({ error: error.message });
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

router.patch("/:orderId", authenticateCookie, async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        const updates = req.body;
        await Order.update(updates, {
            where: {
                id: req.params.orderId,
            },
        });

        res.status(200).json({ message: "Order updated successfully" });
    } catch (error) {
        // res.status(500).json({ error: error.message });
        res.status(500).json({ error: "Failed to update order" });
    }
});

router.post("/", authenticateCookie, async (req, res) => {
    try {
        const { userId, bookId, quantity } = req.body;

        const response = await fetch(
            `http://localhost:3000/api/books/${bookId}`
        );

        if (!response.ok) {
            if (response.status === 404) {
                return res
                    .status(400)
                    .json({ error: "Book with given Id does not exist" });
            }
            throw new Error(`Book service error: Status ${response.status}`);
        }

        const newOrder = await Order.create({ userId, bookId, quantity });
        res.status(201).json(newOrder.id);
    } catch (error) {
        // res.status(500).json({ error: error.message });
        res.status(500).json({ error: "Failed to create order" });
    }
});

router.delete("/:orderId", authenticateCookie, async (req, res) => {
    try {
        const deletedRowsCount = await Order.destroy({
            where: {
                id: req.params.orderId,
            },
        });
        if (deletedRowsCount === 0) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        // res.status(500).json({ error: error.message });
        res.status(500).json({ error: "Failed to delete order" });
    }
});

export default router;
