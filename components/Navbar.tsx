"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlignJustifyIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const routes = [
    { href: "/about", label: "About" },
    { href: "/login", label: "Login" },
  ];

  return (
    <nav className="border-b border-b-zinc-100 p-3">
      <div className="mx-auto max-w-7xl">
        <div className="container">
          <div className="flex justify-between">
            <Link href="/" className="font-bold lg:text-lg">
              Dhimas Ferdiansyah
            </Link>
            <div className="hidden items-center gap-4 lg:flex">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`hover:text-primary text-sm font-medium transition-colors ${
                    pathname === route.href
                      ? "text-black dark:text-white"
                      : "text-muted-foreground"
                  }`}
                >
                  {route.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center lg:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X /> : <AlignJustifyIcon />}
              </motion.button>
            </div>

            {/* Mobile */}
            <AnimatePresence>
              {isOpen && (
                <>
                  <motion.div
                    className="fixed left-0 top-0 z-50 h-full w-3/4 border-r border-r-zinc-100 bg-white transition-all sm:w-80 lg:hidden"
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                  >
                    <ul className="flex flex-col px-6 py-8">
                      <li className="mb-3">
                        <Link
                          onClick={() => setIsOpen(false)}
                          href="/"
                          className={`text-lg font-bold text-zinc-950 hover:text-black dark:text-white ${
                            pathname === "/"
                              ? "font-bold text-black"
                              : "text-muted-foreground"
                          }`}
                        >
                          Dhimas Ferdiansyah
                        </Link>
                      </li>
                      {routes.map((route) => (
                        <li key={route.href} className="mb-2">
                          <Link
                            onClick={() => setIsOpen(false)}
                            href={route.href}
                            className={`text-muted-foreground text-base font-medium hover:text-black dark:text-white ${
                              pathname === route.href
                                ? "font-bold text-black"
                                : "text-muted-foreground"
                            }`}
                          >
                            {route.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  <motion.div
                    className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    onClick={() => setIsOpen(false)}
                  />
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
