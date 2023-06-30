import Organizations from "@/db/models/organizations";
import dbConnect from "@/db/connect";
import Products from "@/db/models/products";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;
  if (!id) {
    console.log("waiting for ID");
  }

  // --- Defining GET API route ---
  if (request.method === "GET") {
    // Assign the Org with corresponding id to place
    const organization = await Organizations.findById(id);
    const products = await Products.find();

    const mappingOrgProducts = organization.products.map((orgProduct) => {
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

    const OrganizationWithProducts = {
      ...organization.toObject(),
      products: mappingOrgProducts,
    };

    // nothing loaded?
    if (!organization) {
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
