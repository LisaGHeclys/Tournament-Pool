"use client";
import Header from "@/components/admin/header";
import { useLocale } from "next-intl";

export default function Dashboard() {
  const locale = useLocale();

  return (
    <div>
      <Header to={`${locale}/admin/dashboard`} breadcrumbName={"Dashboard"} />
      dashboard
    </div>
  );
}
