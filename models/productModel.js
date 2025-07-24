import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    productName: { type: String, required:true },
    description: { type: String },
    price: { type: Number, required: true},
    imgUrl: { type: String },
    imgPublicId: {type: String},
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);