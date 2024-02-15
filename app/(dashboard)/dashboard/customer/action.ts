"use server";
import prisma from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import fs from "fs";
import { redirect } from "next/navigation";

export async function getAllCustomer() {
  const response = await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const customer = response;
  return customer;
}

export async function deleteCustomer(id: string) {
  try {
    // Find all purchase orders related to the customer
    const purchaseOrders = await prisma.purchaseOrder.findMany({
      where: {
        customer_id: id,
      },
      select: {
        foto_po: true,
      },
    });
    // Delete the customer and all related purchase orders and models
    const deletedCustomer = await prisma.customer.delete({
      where: {
        id: id,
      },
    });
    // Delete all photos related to the purchase orders
    await Promise.all(
      purchaseOrders.map((po) => {
        // Check if the purchase order and the photo exist
        if (po && po.foto_po) {
          // Construct the image path
          const imageDeletePath = "public" + po.foto_po;
          fs.unlinkSync(imageDeletePath);
        }
      }),
    );
    // Revalidate the data on the customer page
    revalidatePath("/dashboard/customer");
    return deletedCustomer;
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
    const updatedCustomer = await prisma.customer.update({
      where: {
        id,
      },
      data: {
        ...values,
      },
    });
    // Return a success message and the updated customer object
    return {
      success: true,
      message: "Customer updated successfully",
      customer: updatedCustomer,
    };
  } catch (error) {
    // Return a failure message and the error object
    console.error(error);
  }
  revalidateTag("customer");
  redirect("/dashboard/customer"); // Navigate to the new post page
}
