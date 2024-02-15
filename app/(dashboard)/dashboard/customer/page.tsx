import CustomerList from "@/components/(dashboard)/customer/CustomerList";
import { Card } from "@/components/ui/card";

export default function Customer() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="container mx-auto px-0">
        <div className="flex items-center justify-center">
          <Card className="my-4 overflow-x-auto p-4 lg:overflow-x-visible ">
            <h1 className=" text-center text-2xl font-bold">Data Customer</h1>
            <CustomerList />
          </Card>
        </div>
      </div>
    </div>
  );
}
