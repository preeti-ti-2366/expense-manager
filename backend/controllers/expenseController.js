const Expense = require("../models/Expense");

// Add expense
exports.addExpense = async (req, res) => {
    try {
        const { title, amount, category } = req.body;

        const expense = await Expense.create({
            user: req.user.id, // from JWT middleware
            title,
            amount,
            category
        });

        res.status(201).json(expense);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all expenses of logged-in user (latest first)
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense
            .find({ user: req.user.id })
            .sort({ createdAt: -1 }); // newest first

        res.json(expenses);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};