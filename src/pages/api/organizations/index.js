// --- import the Schema & Connection Function---
import dbConnect from "@/db/connect";
import Organizations from "@/db/models/organizations";

export default async function handler(request, response) {
  // connect to DB
  await dbConnect();

  // --- Defining GET APIroute  ---
  if (request.method === "GET") {
    // Put all entries from Organizations into organization with Org-Schema
    const organization = await Organizations.find();

    // nothing loaded?
    if (!organization) {
      return response.status(404).json({ error: "no request done" });
    }

    // successfully loaded?
    return response.status(200).json(organization);
  }
}
