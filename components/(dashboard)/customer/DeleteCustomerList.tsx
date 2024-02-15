"use client";
import { useToast } from "@/components/ui/use-toast";
import { formatTimeAndDateIsoFetch } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { deleteCustomer } from "@/app/(dashboard)/dashboard/customer/action";

export default function DeleteCustomerList({ id }: { id: string }) {
  const { toast } = useToast();
  const handleDelete = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      await deleteCustomer(id);
      toast({
        title: "Data berhasil dihapus",
        description: formatTimeAndDateIsoFetch(new Date().toString()),
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Data gagal dihapus",
        description: formatTimeAndDateIsoFetch(new Date().toString()),
        variant: "destructive",
      });
    }
  };

  return (
    <form>
      <Button onClick={handleDelete}>Lanjut</Button>
    </form>
  );
}
