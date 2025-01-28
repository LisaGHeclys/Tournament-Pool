"use client";
import Header from "@/components/admin/header";
import { useLocale } from "next-intl";
import { useLatestTournaments } from "@/backend-calls";

export default function Dashboard() {
  const locale = useLocale();
  const { data, isFetching } = useLatestTournaments();

  console.log(data);
  return (
    <div className="flex flex-col h-screen">
      <Header to={`${locale}/admin/dashboard`} breadcrumbName={"Dashboard"} />
      {isFetching ? (
        <div className="flex-1 px-8 py-4 grid grid-rows-3 grid-cols-2 gap-4">
          <div className="bg-gray-200 p-4 row-span-2"></div>
          <div className="bg-gray-200 p-4 row-span-2">
            Second Element (spans 2 rows)
          </div>
          <div className="bg-gray-200 p-4 col-span-2">
            Third Element (spans full row)
          </div>
        </div>
      ) : (
        <div className="flex-1 px-8 py-4 grid grid-rows-3 grid-cols-2 gap-4">
          <div className="bg-gray-200 p-4 row-span-2"></div>
          <div className="bg-gray-200 p-4 row-span-2">
            Second Element (spans 2 rows)
          </div>
          <div className="bg-gray-200 p-4 col-span-2">
            Third Element (spans full row)
          </div>
        </div>
      )}
    </div>
  );
}
