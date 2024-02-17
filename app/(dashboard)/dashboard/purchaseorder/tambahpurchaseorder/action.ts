"use server";

import prisma from "@/lib/db";
import { purchaseOrderSchema } from "@/lib/validations";
import { uuidModified } from "@/lib/utils";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPurchaseOrder(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const { customer_id, no_po, tgl_po, foto_po, status_po, status_serah } =
    purchaseOrderSchema.parse(values);

  const nomorPurchaseOrder = no_po;
  const nomorPurchaseOrderWithoutExt = nomorPurchaseOrder;
  const idFormat = uuidModified() + "-" + nomorPurchaseOrderWithoutExt;

  try {
    await prisma.purchaseOrder.create({
      data: {
        id: idFormat,
        customer_id,
        no_po,
        tgl_po,
        foto_po, // Convert File to string
        status_po,

        // Menambahkan data status serah dokumen
        statusserahdokumen: {
          create: {
            id: idFormat,
            status_serah: status_serah,
            user: "Admin",
            // Add other required fields from StatusSerahDokumen model
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }

  revalidatePath("/dashboard/purchaseorder");
  redirect("/dashboard/purchaseorder");
}
