import { notFound } from "next/navigation";
import { getCustomerUniqe } from "../../action";
import EditCustomerList from "@/components/(dashboard)/customer/EditCustomerList";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function updateCustomerPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const customer = await getCustomerUniqe(id);

  if (!customer) {
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
            <EditCustomerList customer={customer} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
