"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getAllData() {
  const response = await prisma.purchaseOrder.findMany({
    where: {
      customer_id: {
        not: "",
      },
    },
    include: {
      customer: true,
      faktur: true,
      faktur_pajak: true,
      delivery_note: true,
      tandaterimatagihan: true,
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
