import { getAllData } from "@/actions/actionDashboard";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { ChevronRight, Info, SquarePen, Store, Trash2 } from "lucide-react";
import { formatDateIsoFetch, formatTimeAndDateIsoFetch } from "@/lib/utils";
import DeletePurchaseOrderCard from "./DeleteMainMonitoringList";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Suspense } from "react";
import { SkeletonReloadIcon } from "../../ui/skeletonreloadicon";
import { Skeleton } from "../../ui/skeleton";
import Link from "next/link";

export const MainMonitoringList = async () => {
  const data = await getAllData();

  return (
    <Suspense fallback={<SkeletonReloadIcon className="h-10 w-10" />}>
      <>
        {data.length > 0 ? (
          data.map((po) => (
            <Suspense
              fallback={<Skeleton className="lg:h-[322px] lg:w-[402px]" />}
              key={po.id}
            >
              <Card className="flex flex-col p-4 duration-200 hover:shadow hover:duration-200 dark:bg-zinc-900 dark:hover:shadow-zinc-800">
                <div className="flex-col">
                  <div className="flex flex-col gap-1">
                    <div className="lg: mb-3 flex flex-col justify-between gap-2 lg:w-[370px] lg:flex-row lg:gap-0">
                      <div className="flex gap-4">
                        <div className="flex gap-2">
                          <Store className="h-5 w-5" />
                          <h1 className="relative max-w-40 items-center gap-2 font-bold">
                            <span className="hover:max-height-full top-0 z-10 line-clamp-[*] block max-w-80 overflow-hidden truncate transition-all duration-300 ease-in-out hover:absolute hover:w-80 hover:overflow-visible hover:text-balance hover:rounded-md hover:bg-muted-foreground hover:px-2 hover:text-white">
                              {po.customer.customer_name}
                            </span>
                          </h1>
                        </div>
                        <Suspense
                          fallback={<Skeleton className="h-[50px] w-[200px]" />}
                        >
                          <Popover>
                            <PopoverTrigger className="w-fit" aria-label="info">
                              <Info className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-primary" />
                            </PopoverTrigger>
                            <PopoverContent className="z-10 mx-2 w-[320px] lg:mx-0 lg:w-[500px]">
                              <div className="flex w-[250px]  flex-col   lg:w-[500px]">
                                <div className="flex gap-2">
                                  <p className="w-24">Alamat</p>
                                  <span>:</span>
                                  <p>{po.customer?.alamat}</p>
                                </div>

                                <div className="flex gap-2">
                                  <p className="w-24">Nomor Telp</p>
                                  <span>:</span>
                                  <div>
                                    {po.customer?.no_telp || (
                                      <p className="text-destructive dark:text-red-400">
                                        Tidak memiliki
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  <p className="w-24">Email</p>
                                  <span>:</span>
                                  <div>
                                    {po.customer?.email || (
                                      <p className="text-destructive dark:text-red-400">
                                        Tidak memiliki
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </Suspense>
                      </div>

                      <span
                        className={`flex w-fit items-center rounded-full p-[2px] px-[10px] text-sm lg:w-auto ${po.status_po === "Berjalan" ? "bg-yellow-300/80 text-yellow-950 hover:bg-yellow-200 dark:bg-yellow-300/30 dark:text-yellow-100" : po.status_po === "Selesai" ? "bg-green-300 text-white hover:bg-green-200" : ""}`}
                      >
                        {po.status_po}
                      </span>
                    </div>
                    <Suspense
                      fallback={<Skeleton className="h-[50px] w-[200px]" />}
                    >
                      <div className="flex flex-col">
                        <p className="text-muted-foreground">
                          ( {po.customer.account} )
                        </p>

                        <div className="flex gap-2">
                          <p className="w-24">Nomor PO</p>
                          <span>:</span>
                          <p>{po.no_po}</p>
                        </div>

                        <div className="flex gap-2">
                          <p className="w-24">Nomor DN</p>
                          <span>:</span>
                          <div>
                            {po.delivery_note?.no_dn || (
                              <p className="text-destructive dark:text-red-400">
                                Belum memiliki
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <p className="w-24">Tanggal FK</p>
                          <span>:</span>
                          <div>
                            {formatDateIsoFetch(
                              po.faktur?.tgl_fk?.toISOString() ?? "",
                            ) || (
                              <p className="text-destructive dark:text-red-400">
                                Tidak memiliki
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <p className="w-24">Tanggal JT</p>
                          <span>:</span>
                          <div>
                            {formatDateIsoFetch(
                              po.faktur?.tgl_jt?.toISOString() ?? "",
                            ) || (
                              <p className="text-destructive dark:text-red-400">
                                Tidak memiliki
                              </p>
                            )}
                          </div>
                        </div>

                        {po.statusserahdokumen?.map((status) => (
                          <div
                            key={status.id}
                            className="mt-3 flex text-muted-foreground"
                          >
                            <div className="flex flex-col space-x-0 text-sm">
                              <p>{status.status_serah}</p>
                              <p>
                                {formatTimeAndDateIsoFetch(
                                  status.updatedAt.toISOString(),
                                )}
                              </p>
                              <p>{status.user}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Suspense>
                  </div>

                  <div className="mt-4 flex items-center justify-end gap-4">
                    <AlertDialog>
                      <AlertDialogTrigger name="delete" aria-label="delete">
                        <Trash2 className="h-8 w-8 cursor-pointer text-destructive transition-colors duration-300 ease-in-out hover:text-red-400 dark:text-red-400 dark:hover:text-red-300" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Apakah kamu yakin ingin menghapus purchase order{" "}
                            <span className="text-destructive">{po.no_po}</span>{" "}
                            dengan account customer{" "}
                            <span className="text-muted-foreground">
                              {po.customer.customer_name} ({po.customer.account}
                              )
                            </span>
                            ?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Tindakan ini tidak bisa dibatalkan. Ini akan
                            menghapus secara permanen Purchase order {po.no_po}{" "}
                            dan seluruh dokumen terkait purchase order tersebut.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <DeletePurchaseOrderCard id={po.id} />
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Link href={`/dashboard/main/detail/${po.id}`}>
                      <Button variant="secondary">
                        Detail <ChevronRight className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </Suspense>
          ))
        ) : (
          <div>
            <h1 className="text-muted-foreground">
              Tidak ada data monitoring yang tersedia
            </h1>
          </div>
        )}
      </>
    </Suspense>
  );
};
