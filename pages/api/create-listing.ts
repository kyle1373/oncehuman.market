// pages/api/receive-request.js

import { LOCATIONS_LIST, REGIONS_LIST } from "@constants/constants";
import { isOnceHumanServerFormatted } from "@utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";

export type CreateListingBody = {
  description?: string;
  region: string; // Enforce that it's only NA
  server: string;
  world: string;
  location: string; // Enforce that it's an approved location in the array
  oncehuman_username: string;
  items_listings_ask: {
    item_id: number;
    amount: number;
  }[];
  items_listings_sell: {
    item_id: number;
    amount: number;
    total_stock: number;
  }[];
  do_not_contact_discord: boolean;
};

function validateCreateListingBody(data: CreateListingBody) {
  const errors = [];

  // Validate region
  if (!data.region) {
    errors.push('Region is missing');
  } else if (!REGIONS_LIST.includes(data.region)) {
    errors.push('Region is invalid');
  }

  // Validate server
  if (!data.server) {
    errors.push('Server is missing');
  } else if (typeof data.server !== 'string' || !isOnceHumanServerFormatted(data.server)) {
    errors.push('Server is not a valid format');
  }

  // Validate world
  if (!data.world) {
    errors.push('World is missing');
  } else if (typeof data.world !== 'string' || data.world.length >= 20) {
    errors.push('World name is too long');
  }

  // Validate location
  if (!data.location) {
    errors.push('Location is missing');
  } else if (!LOCATIONS_LIST.includes(data.location)) {
    errors.push('Invalid location');
  }

  // Validate oncehuman_username
  if (!data.oncehuman_username) {
    errors.push('Once Human Username is missing');
  } else if (typeof data.oncehuman_username !== 'string' || data.oncehuman_username.length >= 30) {
    errors.push('Once Human Username too long');
  }

  // Validate items_listings_ask
  if (!Array.isArray(data.items_listings_ask) || data.items_listings_ask.length === 0) {
    errors.push('Ask list is empty');
  } else {
    for (const item of data.items_listings_ask) {
      if (typeof item.item_id !== 'number') {
        errors.push('Invalid item ask ID');
      }
      if (typeof item.amount !== 'number') {
        errors.push('Invalid item ask amount');
      }
      if (item.amount <= 0 || item.amount >= 9999) {
        errors.push('Item ask amount is either too small or too big');
      }
    }
  }

  // Validate items_listings_sell
  if (!Array.isArray(data.items_listings_sell) || data.items_listings_sell.length === 0) {
    errors.push('Offering list is empty');
  } else {
    for (const item of data.items_listings_sell) {
      if (typeof item.item_id !== 'number') {
        errors.push('Invalid sell item ID');
      }
      if (typeof item.amount !== 'number') {
        errors.push('Invalid sell item amount');
      }
      if (typeof item.total_stock !== 'number') {
        errors.push('Invalid total stock number for one item');
      }
      if (item.amount <= 0 || item.amount >= 9999) {
        errors.push('Sell item amount is either too small or too big');
      }
      if (item.total_stock <= 0 || item.total_stock >= 9999) {
        errors.push('Total stock amount is either too small or too big');
      }
      if (item.amount > item.total_stock) {
        errors.push('The amount is greater than the total stock');
      }
    }
  }

  // Validate do_not_contact_discord
  if (typeof data.do_not_contact_discord !== 'boolean') {
    errors.push('Invalid discord message response');
  }

  return errors;
}
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const data: CreateListingBody = req.body;

  // Validate the data here using the listingBody type
  const errors = validateCreateListingBody(data);

  if (errors.length > 0) {
    console.log(errors[0])
    return res.status(400).json({ error: errors[0] });
  }

  // Proceed with handling the valid request
  res.status(200).json({ message: 'Listing created successfully' });
}