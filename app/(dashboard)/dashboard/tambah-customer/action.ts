"use server";
import prisma from "@/lib/db";
import { customerSchema } from "@/lib/validations";
import { uuidModified } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCustomer(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const { customer_name, account, alamat, no_telp, email } =
    customerSchema.parse(values);

  const kodeAccountCustomer = account;
  const kodeAccountCustomerWithoutExt = kodeAccountCustomer;
  const idFormat = uuidModified() + "-" + kodeAccountCustomerWithoutExt;
  try {
    await prisma.customer.create({
      data: {
        id: idFormat,
        customer_name,
        account,
        alamat,
        no_telp,
        email,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
  revalidatePath("/dashboard/customer");
  redirect("/dashboard/customer");
}
