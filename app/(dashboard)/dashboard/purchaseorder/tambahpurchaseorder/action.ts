"use server";

import prisma from "@/lib/db";
import { purchaseOrderSchema } from "@/lib/validations";
import { uuidModified, uuidModifiedShort } from "@/lib/utils";
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
  const idDeliveryNoteFormat =
    nomorPurchaseOrderWithoutExt + "-" + "dn" + uuidModifiedShort();
  const idFakturFormat =
    nomorPurchaseOrderWithoutExt + "-" + "fk" + uuidModifiedShort();
  const idFakturPajakFormat =
    nomorPurchaseOrderWithoutExt + "-" + "fkp" + uuidModifiedShort();
  const idTandaTerimaTagihanFormat =
    nomorPurchaseOrderWithoutExt + "-" + "ttt" + uuidModifiedShort();
  const idStatusSerahDokumenFormat =
    nomorPurchaseOrderWithoutExt + "-" + "ssd" + uuidModifiedShort();

  try {
    await prisma.purchaseOrder.create({
      data: {
        id: idFormat,
        customer_id,
        no_po,
        tgl_po,
        foto_po, // Convert File to string
        status_po,

        delivery_note: {
          create: {
            id: idDeliveryNoteFormat,
            no_dn: "",
          },
        },

        faktur: {
          create: {
            id: idFakturFormat,
            tgl_fk: undefined,
          },
        },

        faktur_pajak: {
          create: {
            id: idFakturPajakFormat,
            tgl_fkp: undefined,
          },
        },

        tandaterimatagihan: {
          create: {
            id: idTandaTerimaTagihanFormat,
          },
        },

        statusserahdokumen: {
          create: {
            id: idStatusSerahDokumenFormat,
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
