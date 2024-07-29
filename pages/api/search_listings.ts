// API Handler
import type { NextApiRequest, NextApiResponse } from 'next';
import { getListings } from '@utils/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { item_id, region, server } = req.query;

  if (!region) {
    return res.status(400).json({ error: 'Region is required' });
  }

  const listings = await getListings({ region, server, itemID: item_id });

  if (!listings) {
    return res.status(500).json({ error: 'Failed to fetch listings' });
  }

  return res.status(200).json(listings);
}