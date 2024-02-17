"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllPurchaseOrder() {
  const response = await prisma.purchaseOrder.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      customer: true,
    },
  });
  return response;
}

export async function deletePurchaseOrder(id: string) {
  try {
    await prisma.purchaseOrder.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
  revalidatePath("/dashboard/customer");
  redirect("/dashboard/customer");
}

export async function getPurchaseOrderUniqe(id: string) {
  const purchaseOrder = await prisma.purchaseOrder.findUnique({
    where: {
      id: id,
    },
  });
  return purchaseOrder;
}

export async function updatePurchaseOrder(id: string, formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  try {
    await prisma.purchaseOrder.update({
      where: {
        id,
      },
      data: {
        ...values,
      },
    });
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/dashboard/customer");
  redirect("/dashboard/customer");
}
