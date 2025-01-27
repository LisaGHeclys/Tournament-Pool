"use client";
import Header from "@/components/admin/header";
import { useLocale } from "next-intl";

export default function Tournaments() {
  const locale = useLocale();

  return (
    <div>
      <Header
        to={`${locale}/admin/tournaments`}
        breadcrumbName={"Tournaments"}
      />
      tournaments
    </div>
  );
}
