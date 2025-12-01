import express from "express";
import Book from "../models/book.js";
import e from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// część frameworka - wszystko po : staje się zmienną
router.get("/:bookId", async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.bookId);
        return book
            ? res.status(200).json(book)
            : res.status(404).json({ error: "Book not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, author, year } = req.body;
        const newBook = await Book.create({ title, author, year });
        res.status(201).json(newBook.id);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:bookId", async (req, res) => {
    try {
        const deletedRowsCount = await Book.destroy({
            where: {
                id: req.params.bookId,
            },
        });
        if (deletedRowsCount === 0) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
