export type UserData = {
  discord_name: string;
  discord_email: string;
  discord_image: string;
  discord_id: string;
  user_id: number;
};

type ListingListingData = {
  id: number;
  created_at: string;
  description: string;
  region: string;
  server: string;
  world: string;
  location: string;
  do_not_contact_discord: string;
  is_closed: boolean;
  oncehuman_username: string;
};

type UserListingData = {
    id: number;
    created_at: string;
    discord_id: string;
    discord_image: string;
    discord_name: string;
    last_online: string;
}

export type ItemListingData = {
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
    listing: ListingListingData;
    user_info: UserListingData;
    items_selling: ItemListingData[];
    items_asking: ItemListingData[];
    ratio?: number;
}

export type SearchItemsEntry = {
    id: number;
    created_at: string;
    name: string;
    description: string;
    s3_image_path: string;
    category_id: string;
    categories: {
      id: number;
      name: string;
      description: string;
      s3_image_path: string;
    }[];
  };