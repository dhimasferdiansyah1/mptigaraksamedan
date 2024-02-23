"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getDeliveryNoteDetail(id: string) {
  const purchaseOrder = await prisma.purchaseOrder.findUnique({
    where: {
      id: id,
    },
  });
  return purchaseOrder;
}

export async function createPurchaseOrderDetail(
  formData: FormData,
  id: string,
) {
  const purchaseOrderId = await prisma.purchaseOrder.findUnique({
    where: {
      id: id,
    },
  });
  const values = Object.fromEntries(formData.entries());

  await prisma.purchaseOrder.update({
    where: {
      id: id,
    },
    data: {
      ...values,
    },
  });
  revalidatePath("/");
  redirect(`/dashboard/main/detail/${purchaseOrderId?.id}`);
}
