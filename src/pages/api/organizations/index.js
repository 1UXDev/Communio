// --- import the Schema & Connection Function---
import dbConnect from "@/db/connect";
import Organizations from "@/db/models/organizations";
import Products from "@/db/models/products";
// authentication
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);

  if (session) {
    // connect to DB
    await dbConnect();

    // --- Defining GET APIroute  ---
    if (request.method === "GET") {
      const allOrganizations = await Organizations.find();

      const allProducts = await Products.find();

      const allOrganizationsWithProducts = allOrganizations.map((org) => {
        // Map through the Products this "org" needs

        let mappedProducts = org.products.map((orgProduct) => {
          // find the Product where the _id is equal to the one the Organization requires
          const filteredProducts = allProducts.find((product) => {
            return product._id.equals(orgProduct.productId);
          });

          return {
            ...orgProduct.toObject(),
            name: filteredProducts.name,
            description: filteredProducts.description,
            pricePerPieceEuro: filteredProducts.pricePerPieceEuro,
            productImage: filteredProducts.productImage,
            unit: filteredProducts.unit,
            weightSize: filteredProducts.weightSize,
          };
        });
        return {
          ...org.toObject(),
          products: mappedProducts,
        };
      });

      // nothing loaded?
      if (!allOrganizations || !allProducts) {
        return response.status(404).json({ error: "no request done" });
      }

      // successfully loaded?
      return response.status(200).json(allOrganizationsWithProducts);
    }
  } else {
    response.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
}
