import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["income", "expense", "both"],
      default: "both",
    },
    color: {
      type: String,
      default: "#3B82F6", // Default blue color
    },
    icon: {
      type: String,
      default: "📁",
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
