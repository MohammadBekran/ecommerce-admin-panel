"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import MENU_ITEMS from "@/core/constants/menu-items.constants";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();
  const params = useParams();

  return (
    <nav>
      <ul className="flex gap-4">
        {MENU_ITEMS.map((menuItem) => {
          const dynamicRoute = `/${params.storeId}${menuItem.pathname}`;

          return (
            <li
              key={menuItem.pathname}
              className={cn(
                "text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium",
                pathname === dynamicRoute && "text-gray-900"
              )}
            >
              <Link href={dynamicRoute}>{menuItem.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
