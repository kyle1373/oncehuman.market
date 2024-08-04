export type UserData = {
  discord_name: string;
  discord_email: string;
  discord_image: string;
  discord_id: string;
};

type Listing = {
  id: number;
  created_at: string;
  description: string;
  region: string;
  server: string;
  world: string;
  location: string;
  can_discord_contact_when_offline: string;
  is_closed: boolean;
  oncehuman_username: string;
};

type UserInfo = {
    id: number;
    created_at: string;
    discord_id: string;
    discord_image: string;
    discord_name: string;
    last_online: string;
}

type Item = {
    item_id: number;
    total_stock?: number;
    amount: number;
    name: string;
    description: string;
    s3_image_path: string;
    category_name: string;
    category_image_path: string;
}

export type ListingData = {
    listing: Listing;
    user_info: UserInfo;
    items_selling: Item[];
    items_asking: Item[];
    ratio?: number;
}