import dbConnect from "@/db/connect";
import Users from "@/db/models/users";

export async function createUser(newUser) {
  try {
    const db = await dbConnect();

    if (!db) {
      throw new Error("Failed to connect to the database");
    }

    const existingUser = await Users.findById(newUser._id);

    if (existingUser) {
      return null; // User already exists
    }
    // Create new user
    const createdUser = await Users.create(newUser);
    // return user / inserted documents (we only inserted one)
    return createdUser;
  } catch (error) {
    console.error("error", error);
  }
}
