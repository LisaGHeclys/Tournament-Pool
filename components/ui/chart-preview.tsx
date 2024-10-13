import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function ChartPreview() {
  return (
    <Card className="w-full h-[100px]">
      <CardHeader>
        <CardTitle>Title of the pool</CardTitle>
        <CardDescription>Description of the pool</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        {/*TODO: preview of the chart*/}
      </CardContent>
    </Card>
  );
}
