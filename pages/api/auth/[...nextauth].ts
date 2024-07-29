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
  events: {
    async signIn({ user, account }) {
      const discord_id = user.id;
      const discord_email = user.email;
      const discord_image = user.image;
      const discord_name = user.name;

      try {
        const { data, error } = await supabaseAdmin
          .from("users")
          .select()
          .eq("discord_id", discord_id)
          .maybeSingle();

        if (error) {
          throw new Error(error.message);
        }

        if (!data) {
          // Insert new user
          const { error: insertError } = await supabaseAdmin
            .from("users")
            .insert({
              discord_id,
              discord_email,
              discord_image,
              discord_name,
            });

          if (insertError) {
            throw new Error(insertError.message);
          }
        } else {
          // Check if any data has changed
          let updateRequired = false;
          const updates: any = {};

          if (data.discord_email !== discord_email) {
            updates.discord_email = discord_email;
            updateRequired = true;
          }
          if (data.discord_image !== discord_image) {
            updates.discord_image = discord_image;
            updateRequired = true;
          }
          if (data.discord_name !== discord_name) {
            updates.discord_name = discord_name;
            updateRequired = true;
          }

          // Perform the update if necessary
          if (updateRequired) {
            const { error: updateError } = await supabaseAdmin
              .from("users")
              .update(updates)
              .eq("discord_id", discord_id);

            if (updateError) {
              throw new Error(updateError.message);
            }
          }
        }
      } catch (error) {
        console.error("Error in signIn event:", error);
        throw new Error("Database update failed. Please try again later.");
      }
    },
  },
});
