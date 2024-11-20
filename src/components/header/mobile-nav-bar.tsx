"use client";

import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { ModeToggle } from "@/components/header/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MENU_ITEMS from "@/core/constants/menu-items.constants";
import { cn } from "@/core/utils";

const MobileNavbar = () => {
  const pathname = usePathname();
  const params = useParams();

  return (
    <Sheet>
      <SheetTrigger className="rounded-md border p-2">
        <Menu className="size-[1.2rem]" />
      </SheetTrigger>
      <SheetContent side="left">
        <div className="size-full flex flex-col">
          <div>
            <h2 className="capitalize font-bold">ecommerce admin</h2>
            <ul className="space-y-3 mt-3">
              {MENU_ITEMS.map((menuItem, index) => {
                const {
                  label,
                  icon: Icon,
                  pathname: menuItemPathname,
                } = menuItem;

                const dynamicRoute = `/${params.storeId}${menuItemPathname}`;

                return (
                  <li
                    key={`${pathname}-${index}`}
                    className={cn(
                      "text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors font-medium",
                      pathname === dynamicRoute &&
                        "text-gray-900 dark:text-gray-300"
                    )}
                  >
                    <Link
                      href={dynamicRoute}
                      className="flex items-center gap-x-2"
                    >
                      <Icon className="size-4"></Icon>
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-auto flex justify-between items-center">
            <ModeToggle />
            <div>
              <UserButton />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
