"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import MENU_ITEMS from "@/core/constants/menu-items.constants";
import { cn } from "@/core/utils";

const Navbar = () => {
  const pathname = usePathname();
  const params = useParams();

  return (
    <nav>
      <ul className="flex gap-4">
        {MENU_ITEMS.map((menuItem, index) => {
          const { label, icon: Icon, pathname: menuItemPathname } = menuItem;

          const dynamicRoute = `/${params.storeId}${menuItemPathname}`;

          return (
            <li
              key={`${pathname}-${index}`}
              className={cn(
                "text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors font-medium",
                pathname === dynamicRoute && "text-gray-900 dark:text-gray-300"
              )}
            >
              <Link href={dynamicRoute} className="flex items-center gap-x-1">
                <Icon className="size-4"></Icon>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
