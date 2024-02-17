import FormSubmitCustomer from "@/components/(dashboard)/customer/tambah-customer/FormSubmitCustomer";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function TambahCustomer() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <Suspense
            fallback={
              <Skeleton className="my-8 h-[150px] w-[200px] lg:h-[600px] lg:w-[500px]" />
            }
          >
            <FormSubmitCustomer />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
