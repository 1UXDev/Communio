// --- import the Schema & Connection Function---
import dbConnect from "@/db/connect";
import Users from "@/db/models/users";

export default async function handler(request, response) {
  // connect to DB
  await dbConnect();

  // --- Defining GET APIroute  ---
  if (request.method === "GET") {
    // Put all entries from DB into hello with Hello-Schema
    const user = await Users.find();

    // nothing loaded?
    if (!user) {
      return response.status(404).json({ error: "no request done" });
    }

    // // successfully loaded?
    return response.status(200).json(user);
  }
}
