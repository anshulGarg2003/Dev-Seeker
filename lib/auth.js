import Account from "@/database/model/account";
import User from "@/database/model/user";
import connectDB from "@/database/mongoose";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Use JWT for sessions
    maxAge: 1 * 60 * 60, // Session will expire after 1 hours
    updateAge: 60 * 30, // Session will be refreshed every  0.5hour
  },
  callbacks: {
    async signIn({ user, account }) {
      await connectDB();

      let existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        existingUser = await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }

      let existingAccount = await Account.findOne({
        provider: account.provider,
        providerAccountId: account.providerAccountId,
      });

      if (!existingAccount) {
        await Account.create({
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          type: account.type,
          accessToken: account.access_token,
          idToken: account.id_token,
          userId: existingUser._id,
        });
      }

      user.id = existingUser._id;

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.image;
      return session;
    },
  },
};

export async function getSession() {
  return await getServerSession(authOptions);
}
