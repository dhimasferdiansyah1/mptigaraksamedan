"use server";

import prisma from "@/lib/db";
import fs from "fs";
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
    const purchaseOrder = await prisma.purchaseOrder.findUnique({
      where: {
        id: id,
      },
      select: {
        foto_po: true,
      },
    });
    // Setelah semua relasi dihapus, hapus data di tabel purchaseOrder
    const deletedPurchaseOrder = await prisma.purchaseOrder.delete({
      where: {
        id: id,
      },
    });
    const imageDeletePath = "public" + purchaseOrder?.foto_po;
    fs.unlinkSync(imageDeletePath);
    revalidatePath("/");
    return deletedPurchaseOrder;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
