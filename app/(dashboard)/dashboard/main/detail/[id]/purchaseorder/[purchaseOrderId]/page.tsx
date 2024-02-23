import React, { Suspense } from "react";
import { getPurchaseOrderUniqe } from "../../../../action";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import TambahPurchaseOrder from "@/components/(dashboard)/detail/purchaseorder/TambahPurchaseOrder";

export default async function purchaseOrderDetail({
  params,
}: {
  params: { purchaseOrderId: string };
}) {
  const id = params.purchaseOrderId;
  const purchaseOrder = await getPurchaseOrderUniqe(id);

  if (!purchaseOrder) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <Suspense
            fallback={
              <Skeleton className="my-8 h-[400px] w-[200px] lg:h-[600px] lg:w-[500px]" />
            }
          >
            <TambahPurchaseOrder idPurchaseOrder={purchaseOrder} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
