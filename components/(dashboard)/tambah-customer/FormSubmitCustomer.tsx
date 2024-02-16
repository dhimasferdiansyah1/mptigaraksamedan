"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { createCustomer } from "@/app/(dashboard)/dashboard/tambah-customer/action";
import { formatTimeAndDateIsoFetch } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export default function FormSubmitCustomer() {
  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      customer_name: "",
      account: "",
      alamat: "",
      no_telp: "",
      email: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const { toast } = useToast();

  const handleSubmit = async (values: z.infer<typeof customerSchema>) => {
    console.log(values);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    try {
      await createCustomer(formData);
      toast({
        title: "Customer berhasil ditambahkan",
        description: formatTimeAndDateIsoFetch(new Date().toString()),
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Customer gagal ditambahkan",
        description: formatTimeAndDateIsoFetch(new Date().toString()),
        variant: "destructive",
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="my-8 w-full sm:px-20 md:px-32 lg:max-w-3xl"
      >
        <Card className="space-y-4 p-8">
          <CardHeader className="-m-6 mb-2">
            <CardTitle>Tambah Customer</CardTitle>
            <CardDescription>
              Silahkan mengisi data customer key account modern.
            </CardDescription>
          </CardHeader>
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
                  <Input {...field} type="tel" placeholder="Nomor telepon..." />
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
