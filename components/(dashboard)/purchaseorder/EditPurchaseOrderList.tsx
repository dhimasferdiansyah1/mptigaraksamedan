"use client";

import { Button } from "@/components/ui/button";
import { customerSchema, purchaseOrderSchema } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updatePurchaseOrder } from "@/app/(dashboard)/dashboard/purchaseorder/action";
import { PurchaseOrder } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { formatTimeAndDateIsoFetch } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditPurchaseOrderList({
  purchaseOrder,
}: {
  purchaseOrder: PurchaseOrder;
}) {
  const form = useForm<z.infer<typeof purchaseOrderSchema>>({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: {
      no_po: purchaseOrder.no_po,
      tgl_po: purchaseOrder.tgl_po
        ? purchaseOrder.tgl_po.toISOString()
        : undefined,
      status_po: purchaseOrder.status_po,
      foto_po: purchaseOrder.foto_po || undefined,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleUpdatePurchaseOrder = async (
    values: z.infer<typeof purchaseOrderSchema>,
  ) => {
    const formData = new FormData();
    const id = purchaseOrder.id; // Replace with the actual ID of the customer

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    try {
      await updatePurchaseOrder(id, formData);
      toast({
        title: "Purchase order berhasil diedit",
        description: formatTimeAndDateIsoFetch(new Date().toString()),
        variant: "default",
      });
      // Display success message or perform navigation
    } catch (error) {
      console.log(error);
      toast({
        title: "Purchase order gagal diedit",
        description: formatTimeAndDateIsoFetch(new Date().toString()),
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      {purchaseOrder ? (
        <form
          onSubmit={form.handleSubmit(handleUpdatePurchaseOrder)}
          className="my-8 w-full sm:px-20 md:px-32 lg:max-w-3xl"
        >
          <Card className="space-y-4 p-8 dark:bg-zinc-900">
            <Link href="/dashboard/purchaseorder">
              <Button variant="secondary" className="flex gap-2">
                <ChevronLeft className="h-5 w-5" />
                Kembali
              </Button>
            </Link>
            <CardHeader className="-m-6 mb-2">
              <CardTitle>Edit Purchase Order</CardTitle>
              <CardDescription>
                Silahkan mengubah data purchase order yang ingin diubah.
              </CardDescription>
            </CardHeader>
            <Suspense fallback={<p>Loading...</p>}>
              <FormField
                name="no_po"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No Purchase Order</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nama Customer..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="tgl_po"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Purchase Order</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Kode Account Customer..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="foto_po"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto Purchase Order</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Foto Purchase Order" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="status_po"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Status Purchase Order{" "}
                      <span className="text-muted-foreground">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="Status Purchase Order..."
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Suspense>
            <LoadingButton
              loading={isSubmitting}
              className="w-full"
              type="submit"
            >
              Submit
            </LoadingButton>
          </Card>
        </form>
      ) : (
        <Skeleton className="h-[200px] w-[200px]" />
      )}
    </Form>
  );
}
