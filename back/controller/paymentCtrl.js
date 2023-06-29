import RazorPay from "razorpay";
const instance = new RazorPay({
    key_id: "rzp_test_fBXA6TmKNuWo97", key_secret: "mAL25gGHSGzCPijN6qo8NJIe"
})

// export const checkout = async (req, res) => {
//     const option = {
//         amount: 50000,
//         currency: "INR"
//     }
//     const order = await instance.orders.create(option)
//     res.json({
//         success: true,
//         order
//     })
// }

export const checkout = async (req, res) => {
    const {amount} = req.body;
    try {
    const option = {
        amount: amount * 100, // amount in smallest currency unit
        currency: "INR",
        // receipt: "receipt_order_74394",
    };

    const order = await instance.orders.create(option);

    // if (!order) return res.status(500).send("Some error occured");

    res.json(order);
} catch (error) {
   return res.status(500).json({message: "Something Went Wrong"});
}
}

export const paymentVerification = async (req, res) => {
    const {razorpayOrderId, razorpayPaymentId} = req.body
    res.json({
        razorpayOrderId,razorpayPaymentId
    })
}