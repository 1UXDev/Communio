// --- import the Schema & Connection Function---
import dbConnect from "@/db/connect";
import Organizations from "@/db/models/organizations";
import { uid } from "uid";

//-----------------
// This route is to get All the Organizations
//-----------------

export default async function handler(request, response) {
  // connect to DB
  await dbConnect();

  // --- Defining GET APIroute  ---
  if (request.method === "GET") {
    const organization = await Organizations.find();

    // nothing loaded?
    if (!organization) {
      return response.status(404).json({ error: "no request done" });
    }

    // Modify the organizations object
    const modifiedOrganizations = organization.map((org) => {
      const modifiedProducts = org.products.map((product) => {
        return {
          ...product,
          random: uid(8), // Append a random number to each product
        };
      });

      return {
        ...org,
        products: modifiedProducts,
      };
    });

    // successfully loaded?
    return response.status(200).json([modifiedOrganizations]);
  }
}
