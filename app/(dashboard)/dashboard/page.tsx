import { Card } from "@/components/ui/card";
import {
  AlignRight,
  ChevronDown,
  NotebookPen,
  Receipt,
  ShoppingCart,
  Truck,
  X,
  ActivitySquare,
  Store,
} from "lucide-react";
import Link from "next/link";

const menu = [
  {
    icon: <ActivitySquare className="h-14 w-14" />,
    label: "Main monitoring",
    href: "/dashboard/main",
  },
  {
    icon: <Store className="h-14 w-14" />,
    label: "Customer",
    href: "/dashboard/customer",
  },
  {
    icon: <ShoppingCart className="h-14 w-14" />,
    label: "Purchase order",
    href: "/dashboard/purchaseorder",
  },
  {
    icon: <Truck className="h-14 w-14" />,
    label: "Delivery note",
    href: "/dashboard/deliverynote",
  },
  {
    icon: <Receipt className="h-14 w-14" />,
    label: "Faktur",
    href: "/dashboard/faktur",
  },
  {
    icon: <Receipt className="h-14 w-14" />,
    label: "Faktur pajak",
    href: "/dashboard/fakturpajak",
  },
  {
    icon: <NotebookPen className="h-14 w-14" />,
    label: "Tanda terima tagihan",
    href: "/dashboard/tandaterimatagihans",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto my-12 max-w-7xl">
      <div className="container mx-auto px-0">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-8 ml-4 text-left text-2xl font-bold">
            Dashboard menu
          </h1>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {menu.map((item) => (
              <Link href={item.href} key={item.href}>
                <Card className="flex h-[140px] w-[140px] items-center justify-center border p-8 text-muted-foreground duration-300 hover:bg-card hover:text-black hover:duration-300 dark:bg-zinc-900 dark:text-muted-foreground dark:hover:bg-card dark:hover:text-zinc-50 sm:h-[200px] sm:w-[200px]">
                  <div>
                    <div className="flex w-full flex-col items-center gap-4 text-center">
                      {item.icon}
                      <span className="text-lg font-bold">{item.label}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
