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
        res.status(500).json({ error: error.message });
    }
});

router.patch("/:orderId", authenticateCookie, async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        const updates = req.body;
        await Book.update(updates, {
            where: {
                id: req.params.bookId,
            },
        });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// router.post("/", authenticateCookie, async (req, res) => {
//     try {
//         const { title, author, year } = req.body;
//         const newOrder = await Order.create({ title, author, year });
//         res.status(201).json(newOrder.id);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

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
        res.status(500).json({ error: error.message });
    }
});

export default router;
