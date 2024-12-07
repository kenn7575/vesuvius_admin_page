export interface MenuItemData {
  items: MenuItem[];
  meta: MenuItemMetaData;
}
export interface MenuItemMetaData {
  total: number;
  page: number;
  perPage: number;
  pageCount: number;
}
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  type_id: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  price_in_oere: number;
  comment: string;
  is_lacking_ingredient: boolean;
  is_sold_out: boolean;
  image_path: string;
  type: string;
}
