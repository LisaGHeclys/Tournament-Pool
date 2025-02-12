"use client";
import Header from "@/components/admin/header";
import { useLocale } from "next-intl";
import React from "react";
import TournamentsCharts from "@/components/admin/dashboard/tournaments-charts";
import LatestTournamentsTable from "@/components/admin/dashboard/latest-tournaments-table";
import { useLatestTournaments, useYearTournaments } from "@/backend-calls";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const locale = useLocale();
  const lastYearTournamentsQuery = useYearTournaments();
  const latestTournamentsQuery = useLatestTournaments();

  return (
    <div className="flex flex-col h-screen">
      <Header to={`${locale}/admin/dashboard`} breadcrumbName={"Dashboard"} />
      <div className="flex-1 px-8 pb-8 pt-4 grid grid-rows-3 grid-cols-2 gap-4">
        <div className="row-span-2 shadow-xl rounded-2xl">
          {lastYearTournamentsQuery.isPending ? (
            <Skeleton className="h-full w-full flex rounded-2xl" />
          ) : (
            lastYearTournamentsQuery.data && (
              <TournamentsCharts data={lastYearTournamentsQuery.data} />
            )
          )}
        </div>
        <div className="row-span-2 shadow-xl rounded-2xl">
          {/*{latestTournamentsQuery.isPending ? (*/}
          {/*  <Skeleton className="h-full w-full flex rounded-2xl" />*/}
          {/*) : (*/}
          {/*  <TournamentsCharts />*/}
          {/*)}*/}
        </div>
        <div className="col-span-2 shadow-xl rounded-2xl">
          {/*{latestTournamentsQuery.isPending ? (*/}
          {/*  <Skeleton className="h-full w-full flex rounded-2xl" />*/}
          {/*) : (*/}
          {/*  <LatestTournamentsTable*/}
          {/*    data={*/}
          {/*      lastYearTournamentsQuery.data && lastYearTournamentsQuery.data*/}
          {/*    }*/}
          {/*  />*/}
          {/*)}*/}
        </div>
      </div>
    </div>
  );
}
