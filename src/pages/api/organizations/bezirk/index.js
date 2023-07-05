import Organizations from "@/db/models/organizations";
import dbConnect from "@/db/connect";
import Products from "@/db/models/products";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;
  if (!id) {
    console.log("waiting for ID");
  }
  console.log(id);

  const bezirk = id.charAt(0).toUpperCase() + id.slice(1);

  // --- Defining GET API route ---
  if (request.method === "GET") {
    // Assign the Org with corresponding id to place
    const organizations = await Organizations.find({ bezirk: bezirk });

    const products = await Products.find();

    const OrganizationWithProducts = organizations.map((org) => {
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
    if (!organizations) {
      return response.status(404).json({ error: "nothing found :(" });
    }

    // successfully loaded?

    return response.status(200).json(OrganizationWithProducts);
  }

  // --- Defining PATCH API route ---
  if (request.method === "PATCH") {
    // Update the corresponding org
    const organizationUpdate = await Organizations.findByIdAndUpdate(id, {
      $set: request.body,
    });

    return response.status(200).json(organizationUpdate);
  }
}
