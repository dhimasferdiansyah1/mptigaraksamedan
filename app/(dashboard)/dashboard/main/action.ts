"use server";

import prisma from "@/lib/db";

export async function getAllDetail(id: string) {
  const detail = await prisma.purchaseOrder.findUnique({
    where: {
      id: id,
    },
    include: {
      customer: true,
      delivery_note: true,
      faktur: true,
      faktur_pajak: true,
      tandaterimatagihan: true,
      statusserahdokumen: true,
    },
  });
  return detail;
}

export async function getCustomerUniqe(id: string) {
  const customer = await prisma.customer.findUnique({
    where: {
      id: id,
    },
  });
  return customer;
}

export async function getPurchaseOrderUniqe(id: string) {
  const purchaseOrder = await prisma.purchaseOrder.findUnique({
    where: {
      id: id,
    },
  });
  return purchaseOrder;
}

export async function getDeliveryNoteUniqe(id: string) {
  const deliveryNote = await prisma.deliveryNote.findUnique({
    where: {
      id: id,
    },
  });
  return deliveryNote;
}

export async function getFakturUniqe(id: string) {
  const faktur = await prisma.faktur.findUnique({
    where: {
      id: id,
    },
  });
  return faktur;
}

export async function getFakturPajakUniqe(id: string) {
  const fakturPajak = await prisma.fakturPajak.findUnique({
    where: {
      id: id,
    },
  });
  return fakturPajak;
}

export async function getTandaTerimaTagihanUniqe(id: string) {
  const tandaTerimaTagihan = await prisma.tandaTerimaTagihan.findUnique({
    where: {
      id: id,
    },
  });
  return tandaTerimaTagihan;
}

export async function getStatusSerahDokumenUniqe(id: string) {
  const statusSerahDokumen = await prisma.statusSerahDokumen.findUnique({
    where: {
      id: id,
    },
  });
  return statusSerahDokumen;
}
