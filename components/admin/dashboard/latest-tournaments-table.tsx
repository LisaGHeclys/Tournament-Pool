import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { teamBody, tournamentBody } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import React from "react";
import { ColumnType } from "@/components/admin/table-component";

type Props = {
  data: tournamentBody[];
};
export default function LatestTournamentsTable({ data }: Props) {
  const columns: ColumnType<tournamentBody>[] = [
    { key: "id", label: "ID", className: "font-semibold" },
    { key: "name", label: "Name", className: "font-normal" },
    { key: "teams", label: "Teams", className: "font-normal" },
    { key: "createdBy", label: "Created By", className: "font-normal" },
    { key: "createdAt", label: "Created At", className: "font-normal" },
  ];
  console.log(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Tournaments</CardTitle>
        <CardDescription>
          Showing the last 3 tournaments created
        </CardDescription>
      </CardHeader>
      {data.length > 0 ? (
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
            {data.map((item, rowIndex) => (
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
      ) : (
        <p className="text-center py-4">No tournaments found.</p>
      )}
    </Card>
  );
}
