import dbConnect from "@/db/connect";

export async function createUser(newUser) {
  try {
    const db = await dbConnect();

    const usersCollection = db.collection("users");

    // create new user
    const result = await usersCollection.insertOne(newUser);

    // return user / inserted documents (we only inserted one)
    return result.ops[0];
  } catch (error) {
    console.error("error", error);
  }
}
