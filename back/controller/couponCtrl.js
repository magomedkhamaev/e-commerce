import  Coupon from "../models/couponModel.js";
// import  {validateMongoDbId} from "../utils/validateMongodbId.js";
// import  asynHandler from "express-async-handler";

export const createCoupon = async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
};
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    throw new Error(error);
  }
};
export const updateCoupon = async (req, res) => {
  const { id } = req.params;
  
  try {
    const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatecoupon);
  } catch (error) {
    throw new Error(error);
  }
};
export const deleteCoupon = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletecoupon = await Coupon.findByIdAndDelete(id);
    res.json(deletecoupon);
  } catch (error) {
    throw new Error(error);
  }
};
export const getCoupon = async (req, res) => {
  const { id } = req.params;
  
  try {
    const getAcoupon = await Coupon.findById(id);
    res.json(getAcoupon);
  } catch (error) {
    throw new Error(error);
  }
};