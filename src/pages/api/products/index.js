// --- import the Schema & Connection Function---
import dbConnect from "@/db/connect";
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
      const allProducts = await Products.find();

      // nothing loaded?
      if (!allProducts) {
        return response.status(404).json({ error: "no request done" });
      }

      // successfully loaded?
      return response.status(200).json(allProducts);
    }
  } else {
    response.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
}
