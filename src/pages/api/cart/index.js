// --- import the Schema & Connection Function---
import dbConnect from "@/db/connect";
import Organizations from "@/db/models/organizations";
import Products from "@/db/models/products";

//-----------------
// This route is to get All the Organizations with their products for the cart-page...
//-----------------

export default async function handler(request, response) {
  // connect to DB
  await dbConnect();

  // --- Defining GET APIroute  ---
  if (request.method === "GET") {
    const organizations = await Organizations.find();

    const products = await Products.find();

    const AllOrganizationWithProducts = organizations.map((org) => {
      // Map through the Products this "org" needs

      let mappedProducts = org.products.map((orgProduct) => {
        // find the Product where the _id is equal to the one the Organization requires
        const filteredProducts = products.find((product) => {
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
    if (!organizations || !products) {
      return response.status(404).json({ error: "no request done" });
    }

    // successfully loaded?
    return response.status(200).json(AllOrganizationWithProducts);
  }
}
