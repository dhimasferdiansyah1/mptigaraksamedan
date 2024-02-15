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

  // const name = foto_po?.name;

  const nameWithoutExt = nomorPurchaseOrder;
  const fileName =
    uuidModified() + "-" + nameWithoutExt + "." + foto_po!.type.split("/")[1];
  const imagePath = "/images/purchaseOrder/" + fileName;
  const imageSavePath = "public/images/purchaseOrder/" + fileName;

  const buffer = await foto_po!.arrayBuffer();
  fs.writeFileSync(imageSavePath, Buffer.from(buffer));

  try {
    const form = await prisma.purchaseOrder.create({
      data: {
        id: idFormat,
        customer_id,
        no_po,
        tgl_po,
        foto_po: imagePath,
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

    revalidatePath("/");
    return form;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
