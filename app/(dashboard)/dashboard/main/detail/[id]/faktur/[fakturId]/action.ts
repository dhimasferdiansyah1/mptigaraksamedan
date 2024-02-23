"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getFakturDetail(fakturId: string) {
  const faktur = await prisma.faktur.findUnique({
    where: { id: fakturId },
  });
  return faktur;
}

export async function createFakturDetail(formData: FormData, fakturId: string) {
  const purchaseOrderId = await prisma.faktur.findUnique({
    where: { id: fakturId },
    include: {
      purchase_order: true,
    },
  });

  const values = Object.fromEntries(formData.entries());

  await prisma.faktur.update({
    where: {
      id: fakturId,
    },
    data: {
      ...values,
    },
  });
  revalidatePath("/");
  redirect(`/dashboard/main/detail/${purchaseOrderId?.purchase_order.id}`);
}
