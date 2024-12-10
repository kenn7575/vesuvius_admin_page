export interface RevenueChartDataPoint {
  period: string;
  revenue: number;
}
export interface RevenueChartDataWithMeta {
  period_type: "day" | "week" | "month" | "year";
  data: RevenueChartDataPoint[];
}
export interface TopMenuItemDataPoint {
  menuItemId: number;
  name: string;
  count: number;
  image_path: string;
}
