import Category from "../models/categoryModel.js";

/**
 * Get all categories
 * @route GET /api/categories
 */
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a single category by ID
 * @route GET /api/categories/:id
 */
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create a new category
 * @route POST /api/categories
 */
export const createCategory = async (req, res) => {
  try {
    const { name, type, color, icon } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name,
      type: type || "both",
      color: color || "#3B82F6",
      icon: icon || "📁",
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Update a category
 * @route PUT /api/categories/:id
 */
export const updateCategory = async (req, res) => {
  try {
    const { name, type, color, icon } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if new name already exists (excluding current category)
    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res
          .status(400)
          .json({ message: "Category name already exists" });
      }
    }

    category.name = name || category.name;
    category.type = type || category.type;
    category.color = color || category.color;
    category.icon = icon || category.icon;

    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete a category
 * @route DELETE /api/categories/:id
 */
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.deleteOne();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
