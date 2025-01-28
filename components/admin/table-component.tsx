import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export type ColumnType<T> = {
  key: keyof T;
  label: string;
  className?: string;
};

export type Props<T> = {
  title: string;
  data: T[];
  columns: ColumnType<T>[];
};

//TODO: Ameliore this for the other tabs
export function TableComponent<T>({ title, data, columns }: Props<T>) {
  return (
    <div className="p-2">
      <h2 className="m-2 text-xl font-extrabold">{title}</h2>
      <Separator className="m-2 w-1/6" />
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={String(column.key)} className={column.className}>
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
                  {item[column.key] instanceof Date
                    ? (item[column.key] as Date).toLocaleDateString()
                    : String(item[column.key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
