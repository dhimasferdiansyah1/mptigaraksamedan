"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { editPurchaseOrderSchema } from "@/lib/validations";
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
import { cn, formatTimeAndDateIsoFetch } from "@/lib/utils";
import { CalendarIcon, ChevronLeft, Pencil } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/utils/uploadthings";
import { format } from "date-fns";

export default function EditPurchaseOrderList({
  purchaseOrder,
}: {
  purchaseOrder: PurchaseOrder;
}) {
  const form = useForm<z.infer<typeof editPurchaseOrderSchema>>({
    resolver: zodResolver(editPurchaseOrderSchema),
    defaultValues: {
      no_po: purchaseOrder.no_po,
      tgl_po: purchaseOrder.tgl_po.toDateString(),
      foto_po: purchaseOrder.foto_po || undefined,
    },
  });

  const [imageUrl, setImageUrl] = useState("");

  const [showP, setShowP] = useState(true);
  const hideP = () => {
    setShowP(false);
  };

  const {
    formState: { isSubmitting },
  } = form;

  const handleUpdatePurchaseOrder = async (
    values: z.infer<typeof editPurchaseOrderSchema>,
  ) => {
    console.log("Values to be submitted:", values);
    const formData = new FormData();
    const id = purchaseOrder.id;

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
                      <Input {...field} placeholder="Nomor Purchase Order..." />
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
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Tanggal purchase order</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(date?.toISOString())
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {purchaseOrder.foto_po ? (
                <div className="my-4">
                  <p>Foto Purchase Order tersedia</p>
                  <Image
                    src={purchaseOrder.foto_po || ""}
                    width={512}
                    height={512}
                    className="h-auto w-auto rounded-md"
                    alt="Foto purchase order lama"
                  />
                </div>
              ) : (
                <p>Tidak ada foto purchase order, silahkan mengupload!</p>
              )}

              {imageUrl && (
                <Button
                  variant="secondary"
                  onClick={() => setImageUrl("")}
                  type="button"
                  className="flex w-full gap-2"
                >
                  <Pencil className="h-5 w-5" />
                  <span>Ganti foto</span>
                </Button>
              )}
              {imageUrl ? (
                <div className="h-auto w-full">
                  {showP ? ( // Jika nilai showP adalah true
                    <p className="">Loading...</p> // Tampilkan <p>
                  ) : null}
                  <Image
                    src={imageUrl}
                    alt="Foto purchase order"
                    width={512}
                    height={512}
                    className="h-auto w-full rounded border p-2"
                  />
                </div>
              ) : (
                <FormField
                  name="foto_po"
                  control={form.control}
                  render={({ field: { value, ...fieldValues } }) => (
                    <FormItem>
                      <Label>
                        Ubah/Upload Foto Berkas Purchase Order{" "}
                        <span className="text-muted-foreground">
                          (Max file: 8MB)
                        </span>
                      </Label>
                      <FormControl>
                        <UploadDropzone
                          config={{ mode: "auto" }}
                          appearance={{
                            button: {
                              background: "black",
                            },
                            container: {
                              display: "flex",
                              color: "black",
                            },
                            label: {
                              color: "GrayText",
                            },
                          }}
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            setShowP(true);
                            setTimeout(hideP, 2000);

                            setImageUrl(res[0].url);
                            form.setValue("foto_po", res[0].url);
                          }}
                          onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
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
