import dbConnect from "@/db/connect";
import Users from "@/db/models/users";

export async function UserDataPopulation({ userId }, res) {
  try {
    const db = await dbConnect();

    if (!db) {
      throw new Error("Failed to connect to the database");
    }

    const existingUser = await Users.findById(userId);

    if (existingUser) {
      const extendedExistingUser = {
        ...existingUser.toObject(),
        coordinates: [],
        radiusInKM: null,
        bezirk: "",
        kiez: "",
        street: "",
        streetNumber: null,
        plz: null,
        preferredPaymentMethod: [],
        paymentCache: [],
        favOrgs: [],
        purchaseHistory: [],
        favoriteIceCream: "strawberry",
      };

      return res.status(200).json(extendedExistingUser);
    } else {
      res.send({
        error: "The matching did not work ;(",
      });
    }
  } catch (error) {
    console.error("error", error);
  }
}
