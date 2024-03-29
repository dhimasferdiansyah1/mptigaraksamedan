"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DeliveryNoteSchema } from "@/lib/main/validationsMain";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn, formatTimeAndDateIsoFetch } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/components/ui/use-toast";
import { UploadDropzone } from "@/utils/uploadthings";
import { Suspense, useState } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { PurchaseOrder } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { editPurchaseOrderSchema } from "@/lib/validations";
import { createPurchaseOrderDetail } from "@/app/(dashboard)/dashboard/main/detail/[id]/purchaseorder/[purchaseOrderId]/action";

export default function TambahPurchaseOrder({
  idPurchaseOrder,
}: {
  idPurchaseOrder: PurchaseOrder;
}) {
  const form = useForm<z.infer<typeof editPurchaseOrderSchema>>({
    resolver: zodResolver(editPurchaseOrderSchema),
    defaultValues: {
      no_po: idPurchaseOrder.no_po,
      tgl_po: idPurchaseOrder.tgl_po.toISOString(),
      foto_po: idPurchaseOrder.foto_po || undefined,
    },
  });

  const { toast } = useToast();

  const [imageUrl, setImageUrl] = useState("");

  const [showP, setShowP] = useState(true);
  const hideP = () => {
    setShowP(false);
  };

  const {
    formState: { isSubmitting },
  } = form;

  const handleSubmitPurchaseOrder = async (
    values: z.infer<typeof editPurchaseOrderSchema>,
  ) => {
    const formData = new FormData();
    const id = idPurchaseOrder.id;

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await createPurchaseOrderDetail(formData, id);
      toast({
        title: "Delivery Note berhasil di tambahkan",
        description: formatTimeAndDateIsoFetch(new Date().toString()),
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Delivery Note gagal di tambahkan",
        description: formatTimeAndDateIsoFetch(new Date().toString()),
        variant: "default",
      });
    }
  };

  return (
    <Form {...form}>
      {idPurchaseOrder ? (
        <form
          onSubmit={form.handleSubmit(handleSubmitPurchaseOrder)}
          className="my-8 w-full sm:px-20 md:px-32 lg:max-w-3xl"
        >
          <Card className="space-y-4 p-8 dark:bg-zinc-900">
            <CardHeader className="-m-6 mb-2">
              <CardTitle>Tambah / Ubah Delivery Note</CardTitle>
              <CardDescription>
                Silahkan menambahkan atau mengubah data delivery note dibawah
                ini.
              </CardDescription>
            </CardHeader>
            <Suspense fallback={<p>Loading...</p>}>
              <FormField
                name="no_po"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. Delivery Note</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="No. Delivery Note..." />
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
              {idPurchaseOrder.foto_po ? (
                <div className="my-4">
                  <p>Foto Purchase Order tersedia</p>
                  <Image
                    src={idPurchaseOrder.foto_po || ""}
                    width={512}
                    height={512}
                    className="h-auto w-auto rounded-md"
                    alt="Foto purchase order lama"
                  />
                </div>
              ) : (
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  Tidak ada foto sebelum Delivery, silahkan mengupload!
                </p>
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
                        Ubah/Upload Foto sebelum Delivery{" "}
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
