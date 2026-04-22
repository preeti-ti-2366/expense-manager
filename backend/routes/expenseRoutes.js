const express = require("express");
const router = express.Router();

const { addExpense, getExpenses } = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected routes
router.post("/", authMiddleware, addExpense);
router.get("/", authMiddleware, getExpenses);

module.exports = router;