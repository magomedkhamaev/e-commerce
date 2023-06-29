import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model

const enqSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Submitted",
    enum: ["Submitted", "Contacted", "In Progress"],
  },
});

//Export the model
export default mongoose.model("Enquiry", enqSchema);