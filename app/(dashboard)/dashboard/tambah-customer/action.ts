"use server";
import prisma from "@/lib/db";
import { customerSchema } from "@/lib/validations";
import { uuidModified } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createCustomer(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const { customer_name, account, alamat, no_telp, email } =
    customerSchema.parse(values);

  const kodeAccountCustomer = account;
  const kodeAccountCustomerWithoutExt = kodeAccountCustomer;
  const idFormat = uuidModified() + "-" + kodeAccountCustomerWithoutExt;
  try {
    const form = await prisma.customer.create({
      data: {
        id: idFormat,
        customer_name,
        account,
        alamat,
        no_telp,
        email,
      },
    });
    revalidatePath("/");
    return form;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
