import  Category from "../models/prodCategoryModel.js";
// import  asyncHandler from "express-async-handler";
// import  {validateMongoDbId} from "../utils/validateMongodbId.js";

export const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
};
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCategory);
  } catch (error) {
    throw new Error(error);
  }
};
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
};
export const getCategory = async (req, res) => {
  const { id } = req.params;
  
  try {
    const getaCategory = await Category.findById(id).populate('product');
    res.json(getaCategory);
  } catch (error) {
    throw new Error(error);
  }
};
export const getallCategory = async (req, res) => {
  try {
    const getallCategory = await Category.find().populate('product');
    res.json(getallCategory);
  } catch (error) {
    throw new Error(error);
  }
};