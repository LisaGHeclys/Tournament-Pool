"use client";
import Header from "@/components/admin/header";
import { useLocale } from "next-intl";

export default function Users() {
  const locale = useLocale();

  return (
    <div>
      <Header to={`${locale}/admin/users`} breadcrumbName={"Users"} />
      users
    </div>
  );
}
