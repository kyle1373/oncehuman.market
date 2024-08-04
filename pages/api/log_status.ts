import { logServerStats } from "@utils/logger";
import { getUserDataServer, logUserOnlineStatus } from "@utils/server";
import supabaseAdmin from "@utils/supabaseAdmin";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession, useSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userData = await getUserDataServer(req, res);

  if (!userData) {
    return res.status(401).json({ error: "Unauthenticated" });
  }

  await logUserOnlineStatus(userData.discord_id)

  return res.json({data: "User online status logged"});
}
