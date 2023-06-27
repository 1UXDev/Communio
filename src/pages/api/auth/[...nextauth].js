import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// // adapter
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongoose";

export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);

//   callbacks: {
//     async signIn(user, account, profile) {
//       // users first singin?
//       if (account.provider === ("github" || "google") && user.sub) {
//         // create user in "users"-collection
//         await createUser({
//           id: user.id,
//           name: user.name,
//           email: user.email, //new!
//           image: user.image, //new!
//           // coordinates: [],
//           // radiusInKM: null,
//           // bezirk: "",
//           // kiez: "",
//           // street: "",
//           // streetNumber: null,
//           // plz: null,
//           // preferredPaymentMethod: [],
//           // paymentCache: [],
//           // favOrgs: [],
//           // purchaseHistory: [],
//         });
//       }
//     },
//   },
// };
