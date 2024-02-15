"use client";
import { deletePurchaseOrder } from "@/actions/actionDashboard";
import { useToast } from "../ui/use-toast";
import { formatTimeAndDateIsoFetch } from "@/lib/utils";
import { Button } from "../ui/button";

export default function DeletePurchaseOrderCard({ id }: { id: string }) {
  const { toast } = useToast();
  const handleDelete = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      await deletePurchaseOrder(id);
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
