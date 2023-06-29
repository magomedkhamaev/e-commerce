import  User from "../models/userModel.js";
import  Product from "../models/productModel.js";
import  Cart from "../models/cartModel.js";
import  Coupon from "../models/couponModel.js";
import  Order from "../models/orderModel.js";
import  uniqid from "uniqid";

import bcrypt from 'bcrypt';
import  { generateToken } from "../config/jwtToken.js";
import  {validateMongoDbId} from "../utils/validateMongodbId.js";
import  { generateRefreshToken } from "../config/refreshtoken.js";
import  crypto from "crypto";
import  jwt from "jsonwebtoken";
import { log } from "console";

// import  {sendEmail} from "./emailCtrl.js";


export const createUser = async (req, res) => {
    /**
     * TODO:Get the email from req.body
     */
    const email = req.body.email;
    /**
     * TODO:With the help of email find the user exists or not
     */
    const findUser = await User.findOne({ email: email });
  
    if (!findUser) {
      /**
       * TODO:if user not found user create a new user
       */
      const newUser = await User.create(req.body);
      res.json(newUser);
    } else {
      /**
       * TODO:if user found then thow an error: User already exists
       */
      throw new Error("User Already Exists");
    }
  };
  
  // Login a user
  export const login = async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(findUser?._id);
      const updateuser = await User.findByIdAndUpdate(
        findUser.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        _id: findUser?._id,
        firstname: findUser?.firstname,
        lastname: findUser?.lastname,
        email: findUser?.email,
        mobile: findUser?.mobile,
        token: generateToken(findUser?._id),
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  };

// admin login

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
};


  export const handleRefreshToken = async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error(" No Refresh token present in db or not matched");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err || user.id !== decoded.id) {
        throw new Error("There is something wrong with refresh token");
      }
      const accessToken = generateToken(user?._id);
      res.json({ accessToken });
    });
  };

  export const logout = async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204); // forbidden
    }
    await User.findOneAndUpdate(refreshToken, {
      refreshToken: "",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204); // forbidden
  };

  // Update a single user
  export const updateUser = async (req, res) => {
    const { _id } = req.user;
    // validateMongoDbId(_id);
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
          firstname: req?.body?.firstname,
          lastname: req?.body?.lastname,
          email: req?.body?.email,
          mobile: req?.body?.mobile,
        },
        {
          new: true,
        }
      );
      res.json(updatedUser);
    } catch (error) {
      throw new Error(error);
    }
  };

  // save user Address

export const saveAddress = async (req, res, next) => {
  const { _id } = req.user;
  // validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
};

  // Get all user
  export const getAllUser = async (req, res) => {
    try {
      const getUsers = await User.find();
      res.json(getUsers);
    } catch (error) {
      throw new Error(error);
    }
  };
  
  // Get a single user
  
  export const getUser = async (req, res) => {
    const { id } = req.params;
    // validateMongoDbId(id);
  
    try {
      const getaUser = await User.findById(id);
      res.json({
        getaUser,
      });
    } catch (error) {
      throw new Error(error);
    }
  };


  // GET ME
  export const getMe = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
  
      if (!user) {
        return res.status(404).json({
          message: 'Пользователь не найден',
        });
      }
  
      const {...userData } = user._newUser;
  
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Нет доступа',
      });
    }
  };
  // delete a single user
  export const deleteUser = async (req, res) => {
    const { id } = req.params;
    // validateMongoDbId(id);
  
    try {
      const deleteaUser = await User.findByIdAndDelete(id);
      res.json({
        deleteaUser,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
  
  // block a single user
  export const blockUser =async (req, res) => {
    const { id } = req.params;
    // validateMongoDbId(id);
  
    try {
      const blockusr = await User.findByIdAndUpdate(
        id,
        {
          isBlocked: true,
        },
        {
          new: true,
        }
      );
      res.json(blockusr);
    } catch (error) {
      throw new Error(error);
    }
  };

  // Unblock a single user
  export const unBlockUser = async (req, res) => {
    const { id } = req.params;
    // validateMongoDbId(id);
  
    try {
      const unblock = await User.findByIdAndUpdate(
        id,
        {
          isBlocked: false,
        },
        {
          new: true,
        }
      );
      res.json({
        message: "User UnBlocked",
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  export const updatePassword = async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    // validateMongoDbId(_id);
    const user = await User.findById(_id);
    if (password) {
      user.password = password;
      const updatedPassword = await user.save();
      res.json(updatedPassword);
    } else {
      res.json(user);
    }
  };
  
  export const forgotPasswordToken = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found with this email");
    try {
      const token = await user.createPasswordResetToken();
      await user.save();
      const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`;
      const data = {
        to: email,
        text: "Hey User",
        subject: "Forgot Password Link",
        htm: resetURL,
      };
      sendEmail(data);
      res.json(token);
    } catch (error) {
      throw new Error(error);
    }
  };
  
  export const resetPassword = async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error(" Token Expired, Please try again later");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
  };

  export const getWishlist = async (req, res) => {
    const { _id } = req.user;
    try {
      const findUser = await User.findById(_id).populate("wishlist");
      res.json(findUser);
    } catch (error) {
      throw new Error(error);
    }
  };
  
  export const userCart = async (req, res) => {
    const { productId,color,quantity,price } = req.body;
    const { _id } = req.user;
    try {
      // let products = [];
      // const user = await User.findById(_id);
      // // check if user already have product in cart
      // const alreadyExistCart = await Cart.findOne({ orderby: user._id });
      // if (alreadyExistCart) {
      //   alreadyExistCart.remove();
      // }
      // for (let i = 0; i < cart.length; i++) {
      //   let object = {};
      //   object.product = cart[i]._id;
      //   object.count = cart[i].count;
      //   object.color = cart[i].color;
      //   let getPrice = await Product.findById(cart[i]._id).select("price").exec();
      //   object.price = getPrice.price;
      //   products.push(object);
      // }
      // let cartTotal = 0;
      // for (let i = 0; i < products.length; i++) {
      //   cartTotal = cartTotal + products[i].price * products[i].count;
      // }
      let newCart = await new Cart({
        userId: _id,
        productId,
        color,
        price,
        quantity,
      }).save();
      res.json(newCart);
    } catch (error) {
      throw new Error(error);
    }
  };
  
  export const getUserCart = async (req, res) => {
    const { _id } = req.user;
    try {
      const cart = await Cart.find({ userId: _id }).populate(
        "productId"
      ).populate("color");
      res.json(cart);
    } catch (error) {
      throw new Error(error);
    }
  };

  export const removeProductFromCart = async (req, res) => {
    const { _id } = req.user;
    const {id} = req.params;
    try {
      const deleteProductFromCart = await Cart.deleteOne({ userId: _id, _id:id })
      res.json(deleteProductFromCart);
    } catch (error) {
      throw new Error(error);
    }
  }
  export const updateProductQuantityFromCart = async (req, res) => {
    const { _id } = req.user;
    const {cartItemId, newQuantity} = req.params;
    try {
      const cartItem = await Cart.findOne({ userId: _id, _id:cartItemId })
      cartItem.quantity=newQuantity;
      cartItem.save()
      res.json(cartItem);
    } catch (error) {
      throw new Error(error);
    }
  }

 export  const createOrder = async (req, res) => {
    const {shippingInfo, orderItems,totalPrice,totalPriceAfterDiscount,paymentInfo} = req.body;
    const {_id} = req.user;
    try {
       const order = await Order.create({
        shippingInfo,orderItems,totalPrice,totalPriceAfterDiscount,paymentInfo, user: _id
    })
    res.json({
      order,
      succes:true
    })
    }
    catch (error) {
       throw new Error(error)
    }
  }
  // export const emptyCart = async (req, res) => {
  //   const { _id } = req.user;
  //   try {
  //     const user = await User.findOne({ _id });
  //     const cart = await Cart.findOneAndRemove({ orderby: user._id });
  //     res.json(cart);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };

  // export const applyCoupon = async (req, res) => {
  //   const { coupon } = req.body;
  //   const { _id } = req.user;
    
  //   const validCoupon = await Coupon.findOne({ name: coupon });
  //   if (validCoupon === null) {
  //     throw new Error("Invalid Coupon");
  //   }
  //   const user = await User.findOne({ _id });
  //   let { cartTotal } = await Cart.findOne({
  //     orderby: user._id,
  //   }).populate("products.product");
  //   let totalAfterDiscount = (
  //     cartTotal -
  //     (cartTotal * validCoupon.discount) / 100
  //   ).toFixed(2);
  //   await Cart.findOneAndUpdate(
  //     { orderby: user._id },
  //     { totalAfterDiscount },
  //     { new: true }
  //   );
  //   res.json(totalAfterDiscount);
  // };
  
  // export const createOrder = async (req, res) => {
  //   const { COD, couponApplied } = req.body;
  //   const { _id } = req.user;
    
  //   try {
  //     if (!COD) throw new Error("Create cash order failed");
  //     const user = await User.findById(_id);
  //     let userCart = await Cart.findOne({ orderby: user._id });
  //     let finalAmout = 0;
  //     if (couponApplied && userCart.totalAfterDiscount) {
  //       finalAmout = userCart.totalAfterDiscount;
  //     } else {
  //       finalAmout = userCart.cartTotal;
  //     }
  
  //     let newOrder = await new Order({
  //       products: userCart.products,
  //       paymentIntent: {
  //         id: uniqid(),
  //         method: "COD",
  //         amount: finalAmout,
  //         status: "Cash on Delivery",
  //         created: Date.now(),
  //         currency: "usd",
  //       },
  //       orderby: user._id,
  //       orderStatus: "Cash on Delivery",
  //     }).save();
  //     let update = userCart.products.map((item) => {
  //       return {
  //         updateOne: {
  //           filter: { _id: item.product._id },
  //           update: { $inc: { quantity: -item.count, sold: +item.count } },
  //         },
  //       };
  //     });
  //     const updated = await Product.bulkWrite(update, {});
  //     res.json({ message: "success" });
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };
  

  export const getOrders = async (req, res) => {
    const { _id } = req.user;
    
    try {
      const userorders = await Order.find({ user: _id })
        .populate("orderItems.product")
        .populate("user")
        .exec();
      res.json(userorders);
    } catch (error) {
      throw new Error(error);
    }
  };
  export const delOrders = async (req, res) => {
    const { _id } = req.user;
    const {id} = req.params;
    try {
      const usorders = await Order.findByIdAndDelete({ user: _id, _id:id })
      res.json(usorders);
    } catch (error) {
      throw new Error(error);
    }
  };
  
  export const getMonthWiseOrderIncome = async (req, res) => {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const d = new Date();
    let endDate = "";
    d.setDate(1)
    for (let index = 0; index < 11; index++) {
      d.setMonth(d.getMonth() - 1)
      endDate = monthNames[d.getMonth()] + " " + d.getFullYear()
      
    }
    
    const data = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $lte: new Date(),
            $gte: new Date(endDate)
          }
        }
      }, {
        $group: {
          _id: {
            month: "$month"
          },amount:{$sum: "$totalPriceAfterDiscount"},count: {$sum: 1}
        }
      }
    ])
    res.json(data)
  };
  
  export const getYearlyTotalOrders = async (req, res) => {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const d = new Date();
    let endDate = "";
    d.setDate(1)
    for (let index = 0; index < 11; index++) {
      d.setMonth(d.getMonth() - 1)
      endDate = monthNames[d.getMonth()] + " " + d.getFullYear()
      
    }
    const data = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $lte: new Date(),
            $gte: new Date(endDate)
          }
        }
      }, {
        $group: {
          _id: null,
          count: {$sum: 1},
          amount: {$sum: "$totalPriceAfterDiscount"}
        }
      }
    ])
    res.json(data)
  };
  
  // export const removeProductFromCart = async (req, res) => {
  //   const { _id } = req.user;
  //   const {id} = req.params;
  //   try {
  //     const deleteProductFromCart = await Cart.deleteOne({ userId: _id, _id:id })
  //     res.json(deleteProductFromCart);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
  // export const getAllOrders = async (req, res) => {
  //   try {
  //     const alluserorders = await Order.find()
  //       .populate("products.product")
  //       .populate("orderby")
  //       .exec();
  //     res.json(alluserorders);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };


  // export const updateOrderStatus = async (req, res) => {
  //   const { status } = req.body;
  //   const { id } = req.params;
    
  //   try {
  //     const updateOrderStatus = await Order.findByIdAndUpdate(
  //       id,
  //       {
  //         orderStatus: status,
  //         paymentIntent: {
  //           status: status,
  //         },
  //       },
  //       { new: true }
  //     );
  //     res.json(updateOrderStatus);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };


// export const createUser = async(req, res) => {
    
//     try {
//     //   const errors = validationResult(req);
//     //     if(!errors.isEmpty()) {
//     //         return res.status(400).json(errors.array());
//     //     }
     
//         const password = req.body.password; 
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(password, salt);
    
//         const doc = new UserModel({
//           firstname: req.body.firstname,
//           lastname: req.body.lastname,
//           email: req.body.email,
//           mobile: req.body.mobile,
//           passwordHash : hash,
//         });
    
//          const user = await doc.save();
//          const token = jwt.sign({
//             _id: user._id,
//          },
//          'secret123',
//          {
//             expiresIn: '30d',
//          } 
//          );
         
//          const {passwordHash, ...userData} = user._doc;
//         res.json({
//             ...userData,
//             token,
//         });
//         // res.json(user);
//     }
//     catch (err) {
//         console.log(err);
//     res.status(500).json({
//         message: 'Не удалось зарегистрироваться',
//     });
//     }
// };

// export const login = async(req, res) => {
//     try {
//       const user = await UserModel.findOne({ email: req.body.email });
//       if (!user) {
//         return res.status(404).json({
//             message: 'User not defined'
//         });
//       }
//       const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
//       if(!isValidPass) {
//         return res.status(400).json({
//             message: 'неверный логин или пароль'
//         });
//       }
//       const token = jwt.sign({
//         _id: user._id,
//      },
//      'secret123',
//      {
//         expiresIn: '30d',
//      } 
//      );
//      const {passwordHash, ...userData} = user._doc;
//         res.json({
//             ...userData,
//             token,
//         });    
// }
//     catch (err) {
//         console.log(err);
//     res.status(500).json({
//         message: 'Не удалось авторизоваться',
//     });
//     }
// };

// export const getAllUser = async (req,res) => {
//     try {
//         const getUsers = await UserModel.find();
//         res.json(getUsers);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'Не удалось get allUsers',
//         });
//     }
// }

// export const deleteUser = async (req,res) => {
//     try {
//         const userId = req.params.id;
        
//          UserModel.findOneAndDelete(
//             {
//             _id: userId,
//          },
//          (err, doc) => {
//             if (err) {
//             console.log(err);
//             return res.status(500).json({
//                 message: 'Не удалось delete user',
//             });
//             }
    
//             if(!doc) {
//                 return res.status(404).json({
//                     message: 'user not found',
//                 });
//             }
    
//              res.json({
//                 success: true,
//              });
//             },
//          );
         
//         // res.json(getUsers);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'Не удалось delete user',
//         });
//     }
// }

// // export const getMe = async (req, res) => {
// //     try {
// //       const user = await UserModel.findById(req.userId);
  
// //       if (!user) {
// //         return res.status(404).json({
// //           message: 'Пользователь не найден',
// //         });
// //       }
  
// //       const { passwordHash, ...userData } = user._doc;
  
// //       res.json(userData);
// //     } catch (err) {
// //       console.log(err);
// //       res.status(500).json({
// //         message: 'Нет доступа',
// //       });
// //     }
// //   };

// export const getUser = async (req, res) => {
//     const { id } = req.params;
    // validateMongoDbId(id);
  
//     try {
//       const getUser = await UserModel.findById(id);
//       res.json({
//         getUser,
//       });
//     } catch (error) {
//       throw new Error(error);
//     }
//   };

//   export const updateUser = async (req, res) => {
//     const { id } = req.params;
    // validateMongoDbId(_id);
  
//     try {
//       const updatedUser = await UserModel.findByIdAndUpdate(
//         id,
//         {
//             firstname: req?.body?.firstname,
//             lastname: req?.body?.lastname,
//             email: req?.body?.email,
//             mobile: req?.body?.mobile,
//         },
//         {
//           new: true,
//         }
//       );
//       res.json(updatedUser);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'Не удалось update user',
//         })
//   }
// }