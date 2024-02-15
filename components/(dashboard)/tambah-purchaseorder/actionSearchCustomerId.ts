"use server";

import prisma from "@/lib/db";

export async function getCustomers() {
  const customers = await prisma.customer.findMany();
  return {
    props: {
      customers,
    },
  };
}
