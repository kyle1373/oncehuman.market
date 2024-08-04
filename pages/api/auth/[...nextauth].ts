import { NEXTAUTH_OPTIONS } from "@utils/server";
import supabaseAdmin from "@utils/supabaseAdmin";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: { ...NEXTAUTH_OPTIONS.callbacks },
});
