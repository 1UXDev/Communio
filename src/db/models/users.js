import mongoose from "mongoose";

// destructure the Schema Object from mongoose
const { Schema } = mongoose;

const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  providerAccountId: { type: String },
  image: { type: String, required: false },
  coordinates: {
    type: [Number],
    required: false,
  },
  radiusInKM: { type: String, required: false },
  bezirk: { type: String, required: false },
  kiez: { type: String, required: false },
  street: { type: String, required: false },
  streetNumber: { type: Number, required: false },
  plz: { type: Number, required: false },
  preferredPaymentMethod: {
    type: [String],
    required: false,
  },
  paymentCache: [
    {
      paymentMethod: { type: String, required: false },
      userName: { type: String, required: false },
      ccNumber: { type: Number, required: false },
      name: { type: String, required: false },
      valid: { type: [Number], required: false },
    },
  ],
  favOrgs: { type: [String], required: false },
  favProducts: [
    [{ type: Schema.Types.ObjectId }, { type: Schema.Types.ObjectId }],
  ],
  purchaseHistory: [
    {
      purchaseId: { type: String, required: false },
      paymentMethod: { type: String, required: false },
      priceInEuro: { type: Number, required: false },
      purchasedProducts: [
        {
          productId: { type: String, required: false },
          organizationId: { type: String, required: false },
          amount: { type: Number, required: false },
        },
      ],
    },
  ],
  favoriteIceCream: { type: String },
});

const Users = mongoose.models.Users || mongoose.model("Users", usersSchema);

export default Users;
