import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          lebel: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials!.email });
        if (!user) {
          throw new Error("Email is not registed");
        }
        // decrypt
        const isPasswordCorrect = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isPasswordCorrect) {
          throw new Error("Password is incorrect!!!");
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.provider = account?.provider;
        token.first_name = user.first_name
        token.last_name= user.last_name
      }
      return token;
    },
    async session({session,token}){
        if(session.user){
            session.user.provider = token.provider
            session.user.first_name = token.first_name
            session.user.last_name = token.last_name
        }
        return session
    }
  },
});
