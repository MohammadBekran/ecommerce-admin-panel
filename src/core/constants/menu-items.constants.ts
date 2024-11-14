import {
  CircuitBoard,
  LayoutDashboard,
  LayoutList,
  ListOrdered,
  Palette,
  Ruler,
  Settings,
} from "lucide-react";

const MENU_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, pathname: "/" },
  { label: "Billboards", icon: CircuitBoard, pathname: "/billboards" },
  { label: "Categories", icon: LayoutList, pathname: "/categories" },
  { label: "Sizes", icon: Ruler, pathname: "/sizes" },
  { label: "Colors", icon: Palette, pathname: "/colors" },
  { label: "Products", icon: ListOrdered, pathname: "/products" },
  { label: "Orders", icon: ListOrdered, pathname: "/orders" },
  { label: "Settings", icon: Settings, pathname: "/settings" },
] as const;

export default MENU_ITEMS;
