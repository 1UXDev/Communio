// --- import the Schema & Connection Function---
import dbConnect from "@/db/connect";
import Organizations from "@/db/models/organizations";

// import models
import UserInteractions from "@/db/models/userinteractions";
import Users from "@/db/models/users";

// authentication
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);

  if (session) {
    // connect to DB
    await dbConnect();

    // --- Defining GET APIroute  ---
    if (request.method === "GET") {
      const UserInteractions = await Users.findById(session.user._id);

      // nothing loaded?
      if (!UserInteractions) {
        return response.status(404).json({ error: "no request done" });
      }

      // successfully loaded?
      return response.status(200).json(UserInteractions);
    }
  } else {
    response.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
}

// if(req.method === "POST"){
//     // post the new product to db:
//     try {
//       const newProduct= new Product(req.body);
//       await newProduct.save();

//       // add the product to the product list of the corresponding user:
//       const userToUpdate = await User.findById(req.body.userId)
//       if( userToUpdate.products ){
//         await User.updateOne({ _id: req.body.userId }, { $push: { products: [newProduct._id] } });
//       } else {
//         await User.updateOne({ _id: req.body.userId }, { $set: { products: [newProduct._id] } });
//       }
//       res.status(201).json({status: "data posted"})

//     } catch (error) {
//       console.log(error);
//       res.status(400).json({error: error.message})
//     }
//   }

// import dbConnect from "../../../../db/connect"
// import User from "../../../../db/models/User"

// export default async function handler(req, res) {
//   await dbConnect();

//   if(req.method === "GET"){
//     const users = await User.find();
//     res.status(200).json(users);
//   }
//   if(req.method === "POST"){
//     try {
//       const userData= req.body;
//       const newUser= new User(userData);
//       await newUser.save();
//       res.status(201).json({status: "data posted"})
//     } catch (error) {
//       console.log(error);
//       res.status(400).json({error: error.message})
//     }
//   }
// }

// import dbConnect from "../../../../db/connect"
// import User from "../../../../db/models/User"

// export default async function handler(req, res) {
//   await dbConnect();
//   const {id} = req.query;

//   if (req.method === "PATCH") {
//     const userToUpdate = await User.findByIdAndUpdate(id, {
//       $set: req.body,
//     });
//     return res.status(200).json(userToUpdate);
//   }

//   if(req.method === "GET"){
//     const user = await User.findById(id).populate("products");

//     if (!user) {
//       return res.status(404).json({ status: "Not Found" });
//     }
//     return res.status(200).json(user);
//   }
// }
