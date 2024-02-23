import { notFound } from "next/navigation";
import { getPurchaseOrderUniqe } from "../../action";
import EditCustomerList from "@/components/(dashboard)/customer/edit-customer/EditCustomerList";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import EditPurchaseOrderList from "@/components/(dashboard)/purchaseorder/edit-purchaseorder/EditPurchaseOrderList";

export default async function updateCustomerPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
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
            <EditPurchaseOrderList purchaseOrder={purchaseOrder} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
