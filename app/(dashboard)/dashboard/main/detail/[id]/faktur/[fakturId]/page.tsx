import { Suspense } from "react";
import { getFakturDetail } from "./action";
import { Skeleton } from "@/components/ui/skeleton";
import TambahFaktur from "@/components/(dashboard)/detail/faktur/TambahFaktur";
import { getAllDetail, getFakturUniqe } from "../../../../action";
import { notFound } from "next/navigation";

export default async function FakturDetail({
  params,
}: {
  params: { fakturId: string };
}) {
  const fakturId = params.fakturId;
  const faktur = await getFakturDetail(fakturId);

  if (!faktur) {
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
            <TambahFaktur fakturId={faktur} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
