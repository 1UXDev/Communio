// --- import the Schema & Connection Function---
import dbConnect from "@/db/connect";
import Users from "@/db/models/users";

export default async function handler(request, response) {
  // This Information will be replaced by the cookie set into the users browser, but right now there is no cookies
  const currentUser = "649054d177fb907308aa9e1a";
  // connect to DB
  await dbConnect();

  // --- Defining GET APIroute  ---
  if (request.method === "GET") {
    // Put all entries from DB into hello with Hello-Schema
    const user = await Users.find({
      _id: currentUser,
    });

    // nothing loaded?
    if (!user) {
      return response.status(404).json({ error: "no request done" });
    }

    // // successfully loaded? Then get the first entry from the users array (it only should have one but its an array ...)
    return response.status(200).json(user[0]);
  }
}
