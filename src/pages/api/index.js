// --- import the Schema & Connection Function---
import dbConnect from "@/db/connect";
import Organizations from "@/db/models/organizations";
import Users from "@/db/models/users";
import Products from "@/db/models/products";
// authentication
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);

  if (session) {
    // connect to DB
    await dbConnect();

    // --- Defining GET APIroute  ---
    if (request.method === "GET") {
      const userID = "649406cbffa4deb8476cb99a";
      const specificUser = await Users.findById(userID).exec();

      const organizations = await Organizations.find({
        bezirk: specificUser.bezirk,
      });

      const products = await Products.find();

      const OrganizationWithProducts = organizations.map((org) => {
        // Map through the Products this "org" needs

        let mappedProducts = org.products.map((orgProduct) => {
          // find the Product where the _id is equal to the one the Organization requires
          const filteredProducts = products.find((product) => {
            return product._id.equals(orgProduct.productId);
          });
          // console.log("FilteredProducts", filteredProducts);

          //console.log("orgProduct: ", orgProduct);
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

      console.log(
        "the cleanOrganizations product after the map",
        OrganizationWithProducts[0].products
      );

      // nothing loaded?
      if (!organizations || !products || !specificUser) {
        return response.status(404).json({ error: "no request done" });
      }

      // successfully loaded?
      return response
        .status(200)
        .json([specificUser, OrganizationWithProducts, products]);
    }
  } else {
    response.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
}
