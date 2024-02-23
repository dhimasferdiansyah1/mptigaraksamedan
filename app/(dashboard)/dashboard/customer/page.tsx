import CustomerList from "@/components/(dashboard)/customer/CustomerList";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function CustomerPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="container mx-auto px-0">
        <div className="flex items-center justify-center">
          <Card className="my-4 overflow-x-auto p-4  lg:overflow-x-visible">
            <div className="flex w-auto items-center justify-end">
              <div className="flex w-full">
                <h1 className="vdeee3 ml-4 text-left font-bold lg:text-2xl">
                  Data Customer
                </h1>
              </div>
              <Button variant="secondary" className="flex gap-2">
                <Plus className="h-5 w-5" />
                <Link href="/dashboard/customer/tambahcustomer">
                  Tambah Customer
                </Link>
              </Button>
            </div>
            <CustomerList />
          </Card>
        </div>
      </div>
    </div>
  );
}
