import { z } from "zod";

//Customer
const numericCustomerRequiredString = z
  .string()
  .min(1, "Nomor purchase order tidak boleh kosong")
  .regex(/^\d+$/, "Harus berupa angka");

export const customerSchema = z.object({
  customer_name: z
    .string({
      required_error: "Nama customer tidak boleh kosong",
    })
    .min(3, "Nama customer harus berisi minimal lebih dari 3 karakter")
    .max(255),
  account: numericCustomerRequiredString,
  alamat: z
    .string({
      required_error: "Alamat tidak boleh kosong",
    })
    .min(3, "Alamat harus berisi minimal lebih dari 3 karakter")
    .max(255),
  no_telp: z.string().optional(),
  email: z.string().optional(),
});

//Purchase Order
const imagePurchaseOrderSchema = z
  .string()
  .refine((file) => !!file, "Silahkan memilih file gambar");

const numericPurchaseOrderRequiredString = z
  .string()
  .min(1, "Nomor purchase order tidak boleh kosong")
  .regex(/^\d+$/, "Harus berupa angka");
  
export const purchaseOrderSchema = z.object({
  customer_id: z
    .string()
    .min(1, "Kode Account Customer harus di pilih terlebih dahulu")
    .max(255),
  no_po: numericPurchaseOrderRequiredString,
  tgl_po: z.string({
    required_error: "Tanggal purchase order tidak boleh kosong",
  }),
  foto_po: z.optional(
    imagePurchaseOrderSchema.transform((file) => {
      console.log("File:", file);
      return file;
    }),
  ),
  status_po: z.string().refine((value) => {
    return value === "Berjalan" || value === "Selesai";
  }, "Status harus berupa Berjalan atau Selesai"),
  status_serah: z.string().min(1, "Status serah dokumen tidak boleh kosong"),
  user: z.string().min(1),
});

//EditPurchaseOrderSchema
export const editPurchaseOrderSchema = z.object({
  no_po: numericPurchaseOrderRequiredString,
  tgl_po: z.string({
    required_error: "Tanggal purchase order tidak boleh kosong",
  }),
  foto_po: z.string().optional(),
});

