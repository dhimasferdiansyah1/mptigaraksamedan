import { MainMonitoringList } from "@/components/(dashboard)/main/MainMonitoringList";

export default function MainMonitoringPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="container mx-auto">
        <h1 className="my-4 text-center text-2xl font-bold">Main monitoring</h1>
        <div className="my-8 grid grid-cols-1 items-center justify-center gap-2 md:grid-cols-2 xl:grid-cols-3">
          <MainMonitoringList />
        </div>
      </div>
    </div>
  );
}
