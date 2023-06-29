import  mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
const  BlogcategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
export default  mongoose.model("BCategory", BlogcategorySchema);