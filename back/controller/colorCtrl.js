import Color  from "../models/colorModel.js";
// const asyncHandler = require("express-async-handler");
// const validateMongoDbId = require("../utils/validateMongodbId");

export const createColor = async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.json(newColor);
  } catch (error) {
    throw new Error(error);
  }
};
export const updateColor = async (req, res) => {
  const { id } = req.params;
 
  try {
    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedColor);
  } catch (error) {
    throw new Error(error);
  }
};
export const deleteColor = async (req, res) => {
  const { id } = req.params;
 
  try {
    const deletedColor = await Color.findByIdAndDelete(id);
    res.json(deletedColor);
  } catch (error) {
    throw new Error(error);
  }
};
export const getColor = async (req, res) => {
  const { id } = req.params;
 
  try {
    const getaColor = await Color.findById(id);
    res.json(getaColor);
  } catch (error) {
    throw new Error(error);
  }
};
export const getallColor = async (req, res) => {
  try {
    const getallColor = await Color.find();
    res.json(getallColor);
  } catch (error) {
    throw new Error(error);
  }
};
// module.exports = {
//   createColor,
//   updateColor,
//   deleteColor,
//   getColor,
//   getallColor,
// };