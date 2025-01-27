"use client";
import Header from "@/components/admin/header";
import { useLocale } from "next-intl";

export default function Dashboard() {
  const locale = useLocale();

  return (
    <div>
      <Header to={`${locale}/admin/dashboard`} breadcrumbName={"Dashboard"} />
      <div className="px-8 py-4 grid gap-4">
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-gray-200 p-4">First Element (50%)</div>
          <div className="bg-gray-200 p-4">Second Element (50%)</div>
        </div>
        <div className="bg-gray-200 p-4">Third Element (100%)</div>
      </div>
    </div>
  );
}
