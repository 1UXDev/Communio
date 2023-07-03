import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// // adapter
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongoose";

// // manual Mongo Connection
import dbConnect from "@/db/connect";
import Users from "@/db/models/users";
import { isPasswordValid, isPasswordMatch } from "@/lib/hash";

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
      // Maybe change this later
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // CredentialsProvider({
    //   // The name to display on the sign-in form (e.g., 'Email')
    //   name: "Credentials",
    //   credentials: {
    //     username: { label: "Username", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     // this was inspired by https://github.com/AhmedAlqurafi/next-auth-credentials/
    //     await dbConnect();

    //     const user = await Users.findOne({ name: credentials.username });
    //     console.log(user);

    //     // Check if user exists
    //     if (!user) {
    //       return null;
    //     }

    //     // Validate password
    //     const isPasswordMatch = await isPasswordValid(
    //       credentials.password,
    //       user.password
    //     );

    //     if (!isPasswordMatch) {
    //       return null;
    //     }

    //     return {
    //       name: user.name,
    //       email: user.email,
    //     };
    //   },
    // }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session({ session, user }) {
      session.user._id = user.id;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `/`;
    },
    // async signIn({ user, account, profile, isNewUser }) {
    //   if (isNewUser) {
    //     // Redirect new users to onboarding page
    //     return "/hello";
    //   } else {
    //     // Redirect recurring users to default index page
    //     return "/";
    //   }
    // },
  },
};

export default NextAuth(authOptions);
