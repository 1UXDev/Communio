import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "@/db/connect";
import Users from "@/db/models/users";

export default async function handler(req, res) {
  try {
    await dbConnect();

    const session = await getServerSession(req, res, authOptions);
    console.log(session.user._id);
    if (req.method === "POST") {
      console.log("________Post Request____________");
      try {
        const { likedProducts } = req.body;
        console.log(likedProducts);

        await Users.updateOne(
          { id: "649406cbffa4deb8476cb99a" },
          { $addToSet: { liked: [] } }
        );

        return res.status(200).json({ message: "liked products created" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
      }
    }
    if (req.method === "PATCH") {
      console.log("___________Patch Request____________");
      try {
        const { likedProducts } = req.body;
        console.log(likedProducts);
        await Users.updateOne(
          { id: "649406cbffa4deb8476cb99a" },
          { $pull: { liked: ["123", "2345", "23456"] } }
        );

        return res.status(200).json({ message: "liked products updated" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}
