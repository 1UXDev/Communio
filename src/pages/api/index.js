// --- import the Schema & Connection Function---
import dbConnect from "@/db/connect";
import Organizations from "@/db/models/organizations";
import Users from "@/db/models/users";
import Products from "@/db/models/products";

export default async function handler(request, response) {
  // connect to DB
  await dbConnect();

  // --- Defining GET APIroute  ---
  if (request.method === "GET") {
    const userID = request.cookies.userID;
    const specificUser = await Users.findById(userID).exec();

    const organization = await Organizations.find({
      bezirk: specificUser.bezirk,
    });

    const products = await Products.find();

    // nothing loaded?
    if (!organization || !products || !specificUser) {
      return response.status(404).json({ error: "no request done" });
    }

    // successfully loaded?
    return response.status(200).json([specificUser, organization, products]);
  }
}
