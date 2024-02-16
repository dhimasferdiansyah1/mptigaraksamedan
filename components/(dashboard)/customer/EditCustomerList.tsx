"use client";

import { Button } from "@/components/ui/button";
import { customerSchema } from "@/lib/validations";
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
import { updateCustomer } from "@/app/(dashboard)/dashboard/customer/action";
import { Customer } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { formatTimeAndDateIsoFetch } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function EditCustomerList({ customer }: { customer: Customer }) {
  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      customer_name: customer.customer_name,
      account: customer.account,
      alamat: customer.alamat,
      no_telp: customer.no_telp || undefined,
      email: customer.email || undefined,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleUpdateCustomer = async (
    values: z.infer<typeof customerSchema>,
  ) => {
    const formData = new FormData();
    const id = customer.id; // Replace with the actual ID of the customer

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    try {
      await updateCustomer(id, formData);
      toast({
        title: "Customer berhasil diedit",
        description: formatTimeAndDateIsoFetch(new Date().toString()),
        variant: "default",
      });
      // Display success message or perform navigation
    } catch (error) {
      console.log(error);
      toast({
        title: "Customer gagal diedit",
        description: formatTimeAndDateIsoFetch(new Date().toString()),
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateCustomer)}
        className="my-8 w-full sm:px-20 md:px-32 lg:max-w-3xl"
      >
        <Card className="space-y-4 p-8">
          <Link href="/dashboard/customer">
            <Button variant="secondary" className="flex gap-2">
              <ChevronLeft className="h-5 w-5" />
              Kembali
            </Button>
          </Link>
          <CardHeader className="-m-6 mb-2">
            <CardTitle>Edit Customer</CardTitle>
            <CardDescription>
              Silahkan mengubah data customer key account modern yang ingin
              diubah.
            </CardDescription>
          </CardHeader>
          <Suspense fallback={<p>Loading...</p>}>
            <FormField
              name="customer_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Customer</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nama Customer..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="account"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kode Account Customer</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Kode Account Customer..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="alamat"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Alamat..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="no_telp"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nomor telepon{" "}
                    <span className="text-muted-foreground">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Nomor telepon..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email{" "}
                    <span className="text-muted-foreground">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Email..." />
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
    </Form>
  );
}
