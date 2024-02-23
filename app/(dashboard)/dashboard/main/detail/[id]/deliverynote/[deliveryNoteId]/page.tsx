import TambahDeliveryNote from "@/components/(dashboard)/detail/deliverynote/TambahDeliveryNote";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { getAllDetail, getDeliveryNoteUniqe } from "../../../../action";
import { getDeliveryNoteDetail } from "./action";
import { notFound } from "next/navigation";

export default async function DeliveryNoteDetail({
  params,
}: {
  params: { deliveryNoteId: string };
}) {
  const id = params.deliveryNoteId;

  // Fetch delivery note data (implement error handling)
  const deliveryNote = await getDeliveryNoteDetail(id);

  if (!deliveryNote) {
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
            <TambahDeliveryNote deliveryNoteId={deliveryNote} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
