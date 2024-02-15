import { getAllCustomer } from "@/app/(dashboard)/dashboard/customer/action";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DeleteCustomerList from "./DeleteCustomerList";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function CustomerList() {
  const customerList = await getAllCustomer();
  return (
    <Table className="mx-auto mt-4 w-[1200px] rounded-md lg:w-full">
      <TableCaption>List data customer key account modern</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="px-4 py-2">No.</TableHead>
          <TableHead className="px-4 py-2">Account</TableHead>
          <TableHead className="px-4 py-2">Customer Name</TableHead>
          <TableHead className="px-4 py-2">Alamat</TableHead>
          <TableHead className="px-4 py-2">No. Telp</TableHead>
          <TableHead className="px-4 py-2">Email</TableHead>
          <TableHead className="px-4 py-2 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customerList.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell className="px-4 py-2 text-left font-medium">
              {index + 1}
            </TableCell>
            <TableCell className="px-4 py-2">{item.account}</TableCell>
            <TableCell className="px-4 py-2">{item.customer_name}</TableCell>
            <TableCell className="px-4 py-2 sm:table-cell">
              {item.alamat}
            </TableCell>
            <TableCell className="px-4 py-2">{item.no_telp}</TableCell>
            <TableCell className="px-4 py-2">{item.email}</TableCell>
            <TableCell className=" px-4 py-2 text-right">
              <div className="flex gap-4">
                <Link
                  href={`/dashboard/customer/editcustomer/${item.id}`}
                  className="flex gap-2"
                >
                  <Pencil className="hover:text-primary-400 h-4 w-4 cursor-pointer text-primary transition-colors duration-300 ease-in-out hover:text-muted-foreground" />
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger name="delete">
                    <Trash2 className="h-4 w-4 cursor-pointer text-destructive transition-colors duration-300 ease-in-out hover:text-red-400" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Apakah kamu yakin ingin menghapus keseluruhan purchase
                        order dan semua data terkait purchase order yang
                        dimiliki customer{" "}
                        <span className="text-destructive">
                          {item.customer_name}
                        </span>{" "}
                        dengan kode account customer{" "}
                        <span className="text-muted-foreground">
                          ({item.account})
                        </span>{" "}
                        ?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Tindakan ini tidak bisa dibatalkan. Ini akan menghapus
                        secara permanen Customer {item.customer_name} dengan
                        kode account {item.account} terkait customer tersebut
                        beserta seluruh purchase order dan dokumen yang terkait
                        purchase order yang dimiliki oleh customer tersebut.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <DeleteCustomerList id={item.id} />
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
