"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, AlignRight, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const NavbarDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  });

  const routes = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
    { href: "/dashboard/customer", label: "Customer" },
  ];

  const dropdownRoutes = [
    { href: "/dashboard/tambah-customer", label: "Tambah Customer" },
    { href: "/dashboard/tambah-purchaseorder", label: "Tambah Purchase Order" },
  ];

  return (
    <>
      <div className="bg-gradient-to-t from-green-300 to-emerald-500 p-1 text-white"></div>
      <nav className="sticky top-0 z-20 bg-white bg-opacity-70 p-3 backdrop-blur-md">
        <div className="mx-auto max-w-7xl">
          <div className="container">
            <div className="flex items-center justify-between">
              <div className="flex">
                <Link
                  href="/"
                  className="flex gap-2 font-bold duration-300 hover:text-muted-foreground hover:duration-300 lg:text-lg"
                >
                  <Activity />
                  Monitoring Piutang
                </Link>
              </div>
              <div className="hidden items-center gap-4 lg:flex">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`text-sm transition-colors hover:text-primary ${
                      pathname === route.href
                        ? " text-black dark:text-white"
                        : "font-medium text-muted-foreground"
                    }`}
                  >
                    {route.label}
                  </Link>
                ))}
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={`${navigationMenuTriggerStyle()} text-sm text-muted-foreground hover:text-black dark:text-white`}
                      >
                        Master
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        {dropdownRoutes.map((route) => (
                          <Link
                            key={route.href}
                            href={route.href}
                            legacyBehavior
                            passHref
                            className="w-40"
                          >
                            <NavigationMenuLink className="flex w-48 items-center gap-2 rounded-md px-4 py-2 text-base font-medium text-muted-foreground hover:text-black">
                              {route.label}
                            </NavigationMenuLink>
                          </Link>
                        ))}
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
              <div className="flex items-center lg:hidden">
                <motion.button
                  name="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X /> : <AlignRight />}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed left-0 top-0 z-50 h-full w-full border-r border-r-zinc-100 bg-white transition-all sm:w-80 lg:hidden"
              initial={{ x: "-100%" }} // Adjust initial position for full-width menu
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            >
              <div className="mb-1 mr-3 mt-3 flex justify-end rounded-lg p-2 text-zinc-300">
                <X
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 cursor-pointer rounded-md border hover:scale-75 hover:text-zinc-500 hover:duration-75"
                />
              </div>
              <nav>
                <ul className="flex flex-col gap-3 px-6">
                  {/* Other top-level links */}
                  <li className="flex flex-col gap-3">
                    {/* Master heading with bold text and chevron down */}
                    <Link
                      href="/"
                      className="flex cursor-pointer items-center gap-2 text-lg font-bold text-zinc-950 hover:text-black dark:text-white"
                    >
                      <Activity />
                      Monitoring Piutang
                    </Link>
                  </li>
                  <ul
                    className="ml-4 max-h-0 space-y-2 overflow-hidden transition duration-200"
                    style={{ maxHeight: isOpen ? "500px" : 0 }}
                  >
                    {routes.map((route) => (
                      <Link
                        key={route.href}
                        onClick={() => setIsOpen(false)}
                        href={route.href}
                        className={`dark:text-white" flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-base font-medium text-muted-foreground hover:bg-gray-100 hover:text-black ${
                          pathname === route.href
                            ? "font-bold text-black"
                            : "text-muted-foreground"
                        }`}
                      >
                        {route.label}
                      </Link>
                    ))}
                  </ul>

                  {/* Master heading with bold text and chevron down */}
                  <li className="flex cursor-pointer items-center justify-between text-lg font-bold text-zinc-950 hover:text-black dark:text-white">
                    Master
                    <ChevronDown size={16} className="ml-2" />
                  </li>
                  {/* Nested list for Master items: */}
                  <ul
                    className="ml-4 max-h-0 space-y-2 overflow-hidden transition duration-200"
                    style={{ maxHeight: isOpen ? "500px" : 0 }}
                  >
                    {dropdownRoutes.map((route) => (
                      <Link
                        onClick={() => setIsOpen(false)}
                        key={route.href}
                        href={route.href}
                        className="flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-base font-medium text-muted-foreground hover:bg-gray-100 hover:text-black dark:text-white"
                      >
                        {route.label}
                      </Link>
                    ))}
                  </ul>
                </ul>
              </nav>
            </motion.div>
            <motion.div
              className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarDashboard;
