import  Brand from "../models/brandModel.js";
// import  asyncHandler from "express-async-handler";
// import  {validateMongoDbId} from "../utils/validateMongodbId.js";

export const createBrand = async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
};
export const updateBrand = async (req, res) => {
  const { id } = req.params;
  
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBrand);
  } catch (error) {
    throw new Error(error);
  }
};
export const deleteBrand = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);
    res.json(deletedBrand);
  } catch (error) {
    throw new Error(error);
  }
};
export const getBrand = async (req, res) => {
  const { id } = req.params;
  
  try {
    const getaBrand = await Brand.findById(id);
    res.json(getaBrand);
  } catch (error) {
    throw new Error(error);
  }
};
export const getallBrand = async (req, res) => {
  try {
    const getallBrand = await Brand.find();
    res.json(getallBrand);
  } catch (error) {
    throw new Error(error);
  }
};