import { notFound } from "next/navigation";
import { getCustomerUniqe } from "../../action";
import EditCustomerList from "@/components/(dashboard)/customer/EditCustomerList";

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
          <EditCustomerList customer={customer} />
        </div>
        ;
      </div>
      ;
    </div>
  );
}
