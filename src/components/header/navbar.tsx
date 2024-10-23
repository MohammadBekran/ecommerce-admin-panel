"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import MENU_ITEMS from "@/core/constants/menu-items.constants";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        {MENU_ITEMS.map((menuItem) => {
          return (
            <li
              key={menuItem.pathname}
              className={cn(
                "text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium",
                pathname === menuItem.pathname && "text-gray-900"
              )}
            >
              {menuItem.label}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
