import express from "express";
import {
  getTransactions,
  getSummary,
  createTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

// GET /api/transactions - Get all transactions
router.get("/", getTransactions);

// GET /api/transactions/summary - Get summary
router.get("/summary", getSummary);

// POST /api/transactions - Create new transaction
router.post("/", createTransaction);

// DELETE /api/transactions/:id - Delete transaction
router.delete("/:id", deleteTransaction);

export default router;
