import mongoose from "mongoose";

// destructure the Schema Object from mongoose
const { Schema } = mongoose;

// define the Schema (according to the input data we got from project)
const organizationSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: false },
  coordinates: {
    type: [Number], // think about working with 2dSphere here for later map-integrations
    required: false,
  },
  bezirk: { type: String, required: true },
  kiez: { type: String, required: false },
  street: { type: String, required: true },
  streetNumber: { type: Number, required: false },
  streetNumberAddition: { type: String, required: false },
  plz: { type: Number, required: true },
  // --- optional additional payment methods ---
  tel: { type: String, required: false },
  mobile: { type: String, required: false },
  website: { type: String, required: false },
  email: { type: String, required: false },
  // --- organizations bank account ---
  bankName: { type: String, required: true },
  bankAccountName: { type: String, required: true },
  blz: { type: Number, required: true },
  konto: { type: Number, required: true },
  iban: { type: String, required: true },
  bic: { type: String, required: true },
  // --- digital payment methods ---
  paypalToken: { type: String, required: false },
  applepayToken: { type: String, required: false },
  googlepayToken: { type: String, required: false },
  visaToken: { type: String, required: false },
  mastercardToken: { type: String, required: false },
  stripeToken: { type: String, required: false },
  sepaToken: { type: String, required: false }, // this means Sofortüberweisung
  klarnaToken: { type: String, required: false },
  paybackpayToken: { type: String, required: false },
  // --- products ---
  products: {
    type: [
      {
        productId: { type: Schema.Types.ObjectId, required: true },
        amountNeeded: { type: Number, required: false },
        amountSold: { type: Number, required: false },
        priority1to10: { type: Number, required: false },
        isDisplayed: { type: Boolean, required: true },
      },
    ],
  },
});

// define Organizations with Organizations if exist already, otherwise organizationsSchema
const Organizations =
  mongoose.models.Organizations ||
  mongoose.model("Organizations", organizationSchema);

export default Organizations;
