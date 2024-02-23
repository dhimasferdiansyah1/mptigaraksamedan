"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getAllData(id?: string) {
  const response = await prisma.purchaseOrder.findMany({
    where: {
      id: {
        not: "",
      },
    },
    include: {
      customer: true,
      faktur: true,
      delivery_note: true,
      statusserahdokumen: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const purchaseOrder = response;
  return purchaseOrder;
}

export async function deletePurchaseOrder(id: string) {
  try {
    // Setelah semua relasi dihapus, hapus data di tabel purchaseOrder
    await prisma.purchaseOrder.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    throw error;
  }
}
