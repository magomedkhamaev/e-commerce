import { Router } from 'express';
import { 
    createUser, 
    login, 
    getAllUser, 
    getUser, 
    deleteUser, 
    updateUser, 
    blockUser, 
    unBlockUser, 
    handleRefreshToken, 
    logout, 
    updatePassword, 
    forgotPasswordToken, 
    resetPassword, 
    loginAdmin, 
    getWishlist, 
    saveAddress,
    userCart,
    getUserCart,
    // emptyCart,
    // applyCoupon,
    createOrder,
    getOrders,
    // updateOrderStatus,
    // getAllOrders,
    delOrders,
    getMe,
    removeProductFromCart,
    updateProductQuantityFromCart,
    getMonthWiseOrderIncome,
    getYearlyTotalOrders,
}  from '../controller/userCtrl.js';
import { handleValidationErrors,  } from '../utils/index.js';
import { authMiddleware, isAdmin } from"../utils/authMiddleware.js";
import { checkout, paymentVerification } from '../controller/paymentCtrl.js';
const router = new Router();

// Register
// http://localhost:5000/api/auth/register
router.post('/register',  createUser);
router.post("/forgot-password-token", forgotPasswordToken);

router.put("/reset-password/:token", resetPassword);

router.put("/password", authMiddleware, updatePassword);
router.post('/login',  login);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/paymentVerification", authMiddleware, paymentVerification);
// router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/create-order", authMiddleware, createOrder);
router.get('/me', authMiddleware,  getMe);
router.get('/getAll',  getAllUser);
router.get("/get-orders", authMiddleware, getOrders);
// router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.get("/refresh",  handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);
router.get("/getMonthWiseOrderIncome", authMiddleware, getMonthWiseOrderIncome);
router.get("/getYearlyTotalOrders", authMiddleware, getYearlyTotalOrders);

router.get('/:id', authMiddleware, isAdmin, getUser);
router.delete("/delete-product-cart/:id", authMiddleware, removeProductFromCart);
router.delete("/del-orders/:id", authMiddleware, delOrders);
router.put("/update-product-cart/:cartItemId/:newQuantity", authMiddleware, updateProductQuantityFromCart);

// router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete('/:id',   deleteUser);
// router.put(
//     "/order/update-order/:id",
//     authMiddleware,
//     isAdmin,
//     updateOrderStatus
//   );
router.put('/edit-user', authMiddleware,  updateUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);



export default router;