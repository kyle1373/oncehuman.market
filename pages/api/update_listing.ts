import { getUserDataServer } from "@utils/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const userData = await getUserDataServer(req, res);
  
    if (!userData) {
      return res.status(401).json({ error: "Unauthenticated" });
    }

    
    
    return res.json({data: "User online status logged"});
  }
  