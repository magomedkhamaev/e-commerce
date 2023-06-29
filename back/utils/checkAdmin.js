import UserModel from "../models/userModel.js";

export default async (req, res, next) => {
    const { email } = req.user;
    const adminUser = await UserModel.findOne({ email });
    if (adminUser.role !== "admin") {
        return res.status(403).json({
            message: 'not admin'
           });
    } else {
      next();
    }
};