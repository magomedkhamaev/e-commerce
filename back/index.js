import  express from 'express';
import mongoose from "mongoose";
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser  from "cookie-parser";
import authRouter  from './routes/authRouter.js';
import productRouter from './routes/productRoute.js';
import blogRouter from './routes/blogRoute.js';
import categoryRouter  from "./routes/prodCategoryRoute.js";
import blogcategoryRouter  from "./routes/blogCatRoute.js";
import brandRouter  from "./routes/brandRoute.js";
import colorRouter  from "./routes/colorRoute.js";
import enqRouter from "./routes/enqRoute.js";
import couponRouter  from "./routes/couponRoute.js";
import uploadRouter  from "./routes/uploadRoute.js";


dotenv.config();

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
  origin: ['http://localhost:3000','http://localhost:3001'],
  credentials: true,
}
));

// Routes
// http://localhost:3002
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/upload", uploadRouter);
// app.use('/', (req,res) => {
//     res.send('HEllo world')
// });


mongoose.connect('mongodb+srv://glsiz:magakham88@cluster0.n7nan5n.mongodb.net/magaz?retryWrites=true&w=majority')
  .then(() => console.log('DB COOL'))
  .catch((err) => console.log('DB error', err))

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
})