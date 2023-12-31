// --- import the Schema & Connection Function---
import dbConnect from "@/db/connect";
import Users from "@/db/models/users";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  if (session) {
    // connect to DB
    await dbConnect();

    const id = session.user._id;

    if (!id) {
      console.log("waiting for ID");
    }

    // --- Defining GET APIroute  ---
    if (request.method === "GET") {
      const user = await Users.findById(id);
      // nothing loaded?
      if (!user) {
        return response.status(404).json({ error: "no request done" });
      }

      const productCounter = user.productCounter;
      // successfully loaded?
      return response.status(200).json(productCounter);
    }

    // --- Defining PATCH APIroute ---
    if (request.method === "PATCH") {
      // Update the corresponding user
      const productCounterUpdate = await Users.findByIdAndUpdate(id, {
        $set: request.body,
      });

      return response.status(200).json(productCounterUpdate);
    }
  } else {
    response.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
}
