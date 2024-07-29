import { logServerStats } from "@utils/logger";
import { getUserDataServer, logUserOnlineStatus } from "@utils/server";
import supabaseAdmin from "@utils/supabaseAdmin";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Validate the search parameter
    const { search } = req.query;

    if (typeof search !== "string" || !search.trim()) {
      return res.status(400).json({ error: "Invalid search parameter" });
    }

    // Perform the search on the items table using the name column
    const { data, error } = await supabaseAdmin
      .from("items")
      .select(
        `
      id,
      created_at,
      name,
      description,
      s3_image_path,
      category_id,
      categories ( id, name, description, s3_image_path )
    `
      )
      .ilike("name", `%${search}%`)
      .limit(10);

    if (error) {
      throw error;
    }

    // Group items by categories
    const groupedData = data.reduce((acc, item) => {
      const category = item.categories as any;
      if (!acc[category.id]) {
        acc[category.id] = {
          id: category.id,
          name: category.name,
          description: category.description,
          s3_image_path: category.s3_image_path,
          items: [],
        };
      }
      acc[category.id].items.push({
        id: item.id,
        created_at: item.created_at,
        name: item.name,
        description: item.description,
        s3_image_path: item.s3_image_path,
        category_id: item.category_id,
      });
      return acc;
    }, {});

    // Convert the grouped data object to an array
    const result = Object.values(groupedData).sort((a: any, b: any) => a.name.localeCompare(b.name));

    // Return the grouped search results
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in /search_items:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
