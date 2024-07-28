// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      (session.user as any).id = token.id;
      return session;
    },
    async jwt({ token, user, account }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});
