import FormSubmitPurchaseOrder from "@/components/(dashboard)/purchaseorder/tambah-purchaseorder/FormSubmitPurchaseOrder";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function TambahPurchaseOrderPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <Suspense
            fallback={
              <Skeleton className="my-8 h-[150px] w-[200px] lg:h-[600px] lg:w-[500px]" />
            }
          >
            <FormSubmitPurchaseOrder />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
