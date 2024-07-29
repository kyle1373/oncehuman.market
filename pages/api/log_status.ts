import { logServerStats } from "@utils/logger";
import { getUserDataServer, logUserOnlineStatus } from "@utils/server";
import supabaseAdmin from "@utils/supabaseAdmin";
import type { NextApiRequest, NextApiResponse } from "next";
import { UserData } from "next-auth/providers/42-school";
import { getSession, useSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userData: UserData = await getUserDataServer(req);

  if (!userData) {
    return res.status(401).json({ error: "Unauthenticated" });
  }

  await logUserOnlineStatus(userData.id)

  return res.json({data: "User online status logged"});
}
