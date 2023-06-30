import mongoose from "mongoose";

// destructure the Schema Object from mongoose
const { Schema } = mongoose;

// define the Schema (according to the input data we got from project)
const userinteractionsSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "Organizations", required: true },
  name: { type: String, required: true },
  productImage: { type: String, required: true },
  pricePerPieceEuro: { type: Number, required: true },
  weightSize: { type: Number, required: true },
  unit: { type: String, required: true },
});

const UserInteractions =
  mongoose.models.UserInteractions ||
  mongoose.model("UserInteractions", userinteractionsSchema);

export default UserInteractions;
