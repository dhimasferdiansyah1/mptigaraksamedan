"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getDeliveryNoteDetail(deliveryNoteId: string) {
  const deliveryNote = await prisma.deliveryNote.findUnique({
    where: {
      id: deliveryNoteId,
    },
  });
  return deliveryNote;
}

export async function createDeliveryNoteDetail(
  formData: FormData,
  id: string,
  deliveryNoteId: string,
) {
  const purchaseOrderId = await prisma.deliveryNote.findUnique({
    where: {
      id: deliveryNoteId,
    },
    include: {
      purchase_order: true,
    },
  });
  const values = Object.fromEntries(formData.entries());

  await prisma.deliveryNote.update({
    where: {
      id: id,
    },
    data: {
      ...values,
    },
  });
  revalidatePath("/");
  redirect(`/dashboard/main/detail/${purchaseOrderId?.purchase_order.id}`);
}
