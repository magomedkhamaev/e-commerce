import  mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
const  ProdcategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    product: 
    [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
  },
  {
    timestamps: true,
  }
);

//Export the model
export default mongoose.model("PCategory", ProdcategorySchema);
