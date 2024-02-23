export const dynamic = "force-dynamic";
import { getAllPurchaseOrder } from "@/app/(dashboard)/dashboard/purchaseorder/action";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DeletePurchaseOrderList from "./DeletePurchaseOrderList";
import { ImageIcon, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatDateIsoFetch } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function PurchaseOrderList() {
  const purchaseOrderList = await getAllPurchaseOrder();
  return (
    <Table className="mx-auto mt-4 w-[1200px] rounded-md lg:w-full">
      <TableCaption>List data purchase order</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="px-4 py-2">No.</TableHead>
          <TableHead className="px-4 py-2">No. Purchase Order</TableHead>
          <TableHead className="px-4 py-2">Customer Account</TableHead>
          <TableHead className="px-4 py-2">Tgl. Purchase Order</TableHead>
          <TableHead className="px-4 py-2">Status Purchase Order</TableHead>
          <TableHead className="px-4 py-2">Foto Purchase Order</TableHead>
          <TableHead className="px-4 py-2 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchaseOrderList.length > 0 ? (
          purchaseOrderList.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="px-4 py-2 text-left font-medium">
                {index + 1}
              </TableCell>
              <TableCell aria-label="account customer" className="px-4 py-2">
                {item.no_po}
              </TableCell>
              <TableCell aria-label="nama customer" className="px-4 py-2">
                {item.customer.account}
              </TableCell>
              <TableCell
                aria-label="alamat customer"
                className="px-4 py-2 sm:table-cell"
              >
                {formatDateIsoFetch(item.tgl_po.toISOString())}
              </TableCell>
              <TableCell className="px-4 py-2">{item.status_po}</TableCell>
              <TableCell className="px-4 py-2">
                <Dialog>
                  <DialogTrigger className="items center flex gap-2 rounded-md bg-muted p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700/65">
                    <ImageIcon className="h-auto w-4 cursor-pointer text-primary" />
                    Lihat
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="mb-4">
                        Foto purchase order {item.no_po}
                      </DialogTitle>
                      <DialogDescription>
                        {item.foto_po ? (
                          <>
                            <Image
                              src={item.foto_po}
                              alt={`Foto purchase order ${item.no_po}`}
                              width={1000}
                              height={1000}
                              className="mb-4 h-[550px] w-auto"
                            />
                            <a
                              href={item.foto_po}
                              target="_blank"
                              className="mt-4"
                            >
                              Lihat full resolusi gambar
                            </a>
                          </>
                        ) : (
                          <div className="rounded border border-dashed p-2 py-4 text-center text-gray-500">
                            <p>
                              Purchase order tidak memiliki gambar yang di
                              upload
                            </p>
                          </div>
                        )}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell className=" px-4 py-2 text-right">
                <div className="flex gap-4">
                  <Link
                    href={`/dashboard/purchaseorder/editpurchaseorder/${item.id}`}
                    className="flex gap-2 rounded-md bg-muted px-3 py-2 transition-colors duration-300 ease-in-out hover:bg-zinc-200 dark:hover:bg-zinc-700/65"
                  >
                    Edit
                    <Pencil className="hover:text-primary-400 h-4 w-4 cursor-pointer text-primary" />
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger
                      name="delete"
                      className="rounded-md bg-destructive p-2"
                    >
                      <Trash2 className="h-4 w-4 cursor-pointer text-white transition-colors duration-300 ease-in-out hover:text-red-200" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Apakah kamu yakin ingin menghapus keseluruhan purchase
                          order {item.no_po} dan semua data terkait purchase
                          order yang dimiliki customer{" "}
                          <span className="text-destructive dark:text-red-400">
                            {item.customer.customer_name}
                          </span>{" "}
                          dengan kode account customer{" "}
                          <span className="text-muted-foreground text-red-400">
                            ({item.customer.account})
                          </span>{" "}
                          ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Tindakan ini tidak bisa dibatalkan. Ini akan menghapus
                          secara permanen purchaser order {item.no_po} beserta
                          seluruh purchase order dan dokumen yang terkait.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <DeletePurchaseOrderList id={item.id} />
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="px-4 py-2 text-center">
              Tidak ada data purchase order yang tersedia.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
