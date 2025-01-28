"use client";
import Header from "@/components/admin/header";
import { useLocale } from "next-intl";
import { useLatestTournaments } from "@/backend-calls";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { ColumnType } from "@/components/admin/table-component";
import { teamBody, tournamentBody } from "@/types/types";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const locale = useLocale();
  const latestTournamentsQuery = useLatestTournaments();

  const columns: ColumnType<tournamentBody>[] = [
    { key: "id", label: "ID", className: "font-semibold" },
    { key: "name", label: "Name", className: "font-normal" },
    { key: "teams", label: "Teams", className: "font-normal" },
    { key: "createdBy", label: "Created By", className: "font-normal" },
    { key: "createdAt", label: "Created At", className: "font-normal" },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header to={`${locale}/admin/dashboard`} breadcrumbName={"Dashboard"} />
      <div className="flex-1 px-8 pb-8 pt-4 grid grid-rows-3 grid-cols-2 gap-4">
        <div className="row-span-2 shadow-xl rounded-2xl">
          {latestTournamentsQuery.isPending ? (
            <Skeleton className="h-full w-full flex rounded-2xl" />
          ) : (
            <Skeleton className="h-full w-full flex rounded-2xl" />
          )}
        </div>
        <div className="row-span-2 shadow-xl rounded-2xl">
          {latestTournamentsQuery.isPending ? (
            <Skeleton className="h-full w-full flex rounded-2xl" />
          ) : (
            <Skeleton className="h-full w-full flex rounded-2xl" />
          )}
        </div>
        <div className="col-span-2 shadow-xl rounded-2xl">
          {latestTournamentsQuery.isPending ? (
            <Skeleton className="h-full w-full flex rounded-2xl" />
          ) : (
            <div className="p-2">
              <h2 className="m-2 text-xl font-extrabold">Latest Tournaments</h2>
              <Separator className="m-2 w-1/6" />
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHead
                        key={String(column.key)}
                        className={column.className}
                      >
                        {column.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {latestTournamentsQuery?.data &&
                    latestTournamentsQuery?.data.map((item, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {columns.map((column) => (
                          <TableCell
                            key={String(column.key)}
                            className={column.className || "font-normal"}
                          >
                            {(() => {
                              switch (column.key) {
                                case "teams":
                                  return (
                                    <div className="flex flex-wrap gap-2">
                                      {(item[column.key] as teamBody[]).map(
                                        (team, index) => (
                                          <Badge
                                            variant={"secondary"}
                                            key={index}
                                            style={{
                                              backgroundColor: team.color,
                                              color: "white",
                                            }}
                                          >
                                            {team.name}
                                          </Badge>
                                        ),
                                      )}
                                    </div>
                                  );
                                case "createdAt":
                                  return formatDate(String(item[column.key]));
                                default:
                                  return String(item[column.key]);
                              }
                            })()}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
