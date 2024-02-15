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
import { purchaseOrderSchema } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn, formatDateIsoFetch, formatTimeAndDateIsoFetch } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as React from "react";
import LiveSearchForward from "./SearchCustomerId";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingButton from "@/components/LoadingButton";
import { createPurchaseOrder } from "@/app/(dashboard)/dashboard/tambah-purchaseorder/action";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function FormSubmitPurchaseOrder() {
  const form = useForm<z.infer<typeof purchaseOrderSchema>>({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: {
      customer_id: "",
      no_po: "",
      tgl_po: undefined,
      foto_po: undefined,
      status_po: "Berjalan",
      status_serah: "Sales menerima purchase order dari toko",
      user: "Admin",
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    formState: { isSubmitting },
  } = form;

  const handleSubmit = async (values: z.infer<typeof purchaseOrderSchema>) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (value instanceof File || typeof value === "string") {
          formData.append(key, value);
        }
      }
    });
    try {
      await createPurchaseOrder(formData);
      toast({
        title: "Purchase Order berhasil ditambahkan",
        description: formatTimeAndDateIsoFetch(new Date().toString()),
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Purchase Order gagal ditambahkan",
        description: formatTimeAndDateIsoFetch(new Date().toString()),
        variant: "destructive",
      });
      console.error(error);
    }
    const { reset } = form;
    reset();
    const fileInput = document.getElementById("fileUpload") as HTMLInputElement;
    fileInput.value = "";
    const url = "/dashboard/";
    startTransition(() => router.push(url));
    startTransition(() => router.refresh());
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="my-8 w-full sm:px-20 md:px-32 lg:max-w-3xl"
      >
        <Card className="space-y-4 p-8">
          <CardHeader className="-m-6 mb-2">
            <CardTitle>Tambah Purchase Order</CardTitle>
            <CardDescription>
              Silahkan memilih account customer, mengisi nomor purchase order,
              dan lainnya dibawah ini.
            </CardDescription>
          </CardHeader>
          <FormField
            name="customer_id"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="customer_id">
                  Kode Account Customer
                </FormLabel>
                <FormControl>
                  <LiveSearchForward
                    {...field}
                    setFormValue={({ customer_id }: any) =>
                      form.setValue("customer_id", customer_id)
                    }
                    ref={field.ref}
                    onCustomerSelected={(customer_id: string) => {
                      form.setValue("customer_id", customer_id);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="no_po"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Purchase Order</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nomor Purchase Order..."
                    type="number"
                    {...field}
                  />
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
                            <span>Pilih tanggal purchase order</span>
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
                        onDayClick={(date) =>
                          field.onChange(date.toISOString())
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
          <FormField
            name="foto_po"
            control={form.control}
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>
                <Label htmlFor="fileUpload">
                  Foto Berkas Purchase Order{" "}
                  <span className="text-muted-foreground">
                    (Max file: 10MB)
                  </span>
                </Label>
                <FormControl>
                  <Input
                    id="fileUpload"
                    type="file"
                    placeholder="Foto Berkas Purchase Order..."
                    accept="image/png, image/jpeg"
                    {...fieldValues}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      fieldValues.onChange(file);
                    }}
                  />
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
                <FormControl>
                  <Input
                    placeholder="Berjalan"
                    disabled
                    {...field}
                    className="hidden border-yellow-300 bg-yellow-200 text-yellow-700 placeholder-yellow-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="status_serah"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Berjalan"
                    disabled
                    {...field}
                    className="hidden"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="user"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Berjalan"
                    disabled
                    {...field}
                    className="hidden"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            className="w-full"
          >
            Submit
          </LoadingButton>
        </Card>
      </form>
    </Form>
  );
}
