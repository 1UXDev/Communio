import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// // adapter
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongoose";

let redirectNewUser = "";

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
