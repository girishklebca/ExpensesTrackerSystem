import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Please add an amount"],
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Please add a type"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Please add a date"],
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
