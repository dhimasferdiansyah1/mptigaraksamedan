import { Card } from "@/components/ui/card";
import { getPurchaseOrderUniqe } from "@/app/(dashboard)/dashboard/main/action";
import { formatDateIsoFetch } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

export default async function PurchaseOrderCard({
  purchaseOrderId,
}: {
  purchaseOrderId: string;
}) {
  const purchaseOrder = await getPurchaseOrderUniqe(purchaseOrderId);
  return (
    <Card className="flex w-full flex-col overflow-auto text-wrap p-4 shadow-none dark:bg-zinc-900">
      <div className="flex items-start gap-2">
        <p className="min-w-12 max-w-24 text-balance">No. Purchase Order</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {purchaseOrder?.no_po || (
            <p className="text-destructive dark:text-red-400">Tidak memiliki</p>
          )}
        </div>
      </div>
      <hr className="my-1.5" />
      <div className="flex gap-2">
        <p className="min-w-24 max-w-24 break-all">Tgl. Purchase Order</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {formatDateIsoFetch(purchaseOrder?.tgl_po?.toISOString()) || (
            <p className="text-destructive dark:text-red-400">Tidak memiliki</p>
          )}
        </div>
      </div>
      <hr className="my-1.5" />
      <div className="flex gap-2">
        <p className="min-w-24 max-w-24 text-balance">Foto Purchase Order</p>
        <span>:</span>
        <div>
          <div className=" break-all text-muted-foreground">
            {purchaseOrder?.foto_po ? (
              <p></p>
            ) : (
              <p className="pb-2 text-center">⚠️silahkan upload foto</p>
            )}
            <Dialog>
              <DialogTrigger className="items center flex gap-2 rounded-md bg-muted p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700/65">
                <ImageIcon className="h-auto w-4 cursor-pointer text-primary" />
                Lihat
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="mb-4">
                    Foto purchase order {purchaseOrder?.no_po}
                  </DialogTitle>
                  <DialogDescription>
                    {purchaseOrder?.foto_po ? (
                      <>
                        <Image
                          src={purchaseOrder?.foto_po}
                          alt={`Foto purchase order ${purchaseOrder.no_po}`}
                          width={1000}
                          height={1000}
                          className="mb-4 h-[550px] w-auto"
                        />
                        <a
                          href={purchaseOrder?.foto_po}
                          target="_blank"
                          className="mt-4"
                        >
                          Lihat full resolusi gambar
                        </a>
                      </>
                    ) : (
                      <div className="rounded border border-dashed p-2 py-4 text-center text-gray-500">
                        <p>
                          Purchase order tidak memiliki gambar yang di upload
                        </p>
                      </div>
                    )}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Card>
  );
}
