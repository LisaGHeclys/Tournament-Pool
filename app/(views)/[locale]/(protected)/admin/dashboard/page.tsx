"use client";
import Header from "@/components/admin/header";

export default function Dashboard() {
  return (
    <div>
      <Header to={"/admin/dashboard"} breadcrumbName={"Dashboard"} />
      dashboard
    </div>
  );
}
