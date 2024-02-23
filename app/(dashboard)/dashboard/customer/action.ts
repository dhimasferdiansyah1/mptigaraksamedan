"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllCustomer() {
  const response = await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return response;
}

export async function deleteCustomer(id: string) {
  try {
    // Find all purchase orders related to the customer
    // Delete the customer and all related purchase orders and models
    await prisma.customer.delete({
      where: {
        id: id,
      },
    });
    // Delete all photos related to the purchase orders
    // Revalidate the data on the customer page
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCustomerUniqe(id: string) {
  const customer = await prisma.customer.findUnique({
    where: {
      id: id,
    },
  });
  return customer;
}

export async function updateCustomer(id: string, formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  try {
    await prisma.customer.update({
      where: {
        id,
      },
      data: {
        ...values,
      },
    });
    // Return a success message and the updated customer object
  } catch (error) {
    // Return a failure message and the error object
    console.error(error);
  }
  revalidatePath("/dashboard/customer");
  redirect("/dashboard/customer"); // Navigate to the new post page
}
