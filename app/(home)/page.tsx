import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl">
      <div className="container mx-auto">
        <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
          <Activity className="my-2 h-20 w-20" />
          <div className="text-center text-2xl font-extrabold sm:w-2/4 lg:text-5xl">
            <h1>Selamat Datang di Demo Monitoring Piutang</h1>
          </div>
          <div className="text-md text-center font-normal text-muted-foreground sm:w-2/4 lg:text-2xl">
            <p>Dapatkan informasi terkini mengenai progres piutang</p>
          </div>
          <a href="/dashboard" className="my-2">
            <Button variant={"default"}>Dashboard</Button>
          </a>
        </div>
      </div>
    </main>
  );
}