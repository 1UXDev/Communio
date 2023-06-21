import Organizations from "@/db/models/organizations";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;
  if (!id) {
    console.log("waiting for ID");
  }

  // --- Defining GET APIroute ---
  if (request.method === "GET") {
    // Assign the Org with corresponding id to place
    const organization = await Organizations.findById(id);

    // nothing loaded?
    if (!organization) {
      return response.status(404).json({ error: "nothing found :(" });
    }

    // successfully loaded?
    return response.status(200).json(organization);
  }

  // --- Defining PATCH APIroute ---
  if (request.method === "PATCH") {
    // Update the corresponding item
    const organizationUpdate = await Organizations.findByIdAndUpdate(id, {
      $set: request.body,
    });

    return response.status(200).json(organizationUpdate);
  }
}
