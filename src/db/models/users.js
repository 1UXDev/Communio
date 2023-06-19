import mongoose from "mongoose";

// destructure the Schema Object from mongoose
const { Schema } = mongoose;

const usersSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  userID: { type: String, required: true },
  name: { type: String, required: true },
  coordinates: {
    type: [Number],
    required: true,
  },
  radiusInKM: { type: String, required: true },
  bezirk: { type: String, required: true },
  kiez: { type: String, required: false },
  straße: { type: String, required: true },
  hausnummer: { type: Number, required: true },
  plz: { type: Number, required: true },
  preferredPaymentMethod: {
    type: [String],
    required: true,
  },
  paymentCache: [
    {
      paymentMethod: { type: String, required: true },
      userName: { type: String, required: false },
      ccNumber: { type: Number, required: false },
      name: { type: String, required: false },
      valid: { type: [Number], required: false },
    },
  ],
  favOrgs: { type: [String], required: true },
  purchaseHistory: [
    {
      purchaseID: { type: String, required: true },
      paymentMethod: { type: String, required: true },
      priceInEuro: { type: Number, required: true },
      purchasedProducts: [
        {
          productID: { type: String, required: true },
          amount: { type: Number, required: true },
        },
      ],
    },
  ],
});

const Users = mongoose.models.Users || mongoose.model("Users", usersSchema);

export default Users;
