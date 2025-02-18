"use client";
import Footer from "@/components/ui/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PieChartComponent from "@/components/charts/pie-chart";
import Autoplay from "embla-carousel-autoplay";
import PointsPreview from "@/components/ui/points-preview";
import { BarChartComponent } from "@/components/charts/bar-chart";
import { UserNav } from "@/components/navbar/user-nav";
import { useTournamentsById } from "@/backend-calls";
import { useLocale, useTranslations } from "next-intl";

export default function ShowTournament() {
  const id = useParams().id;
  const t = useTranslations();
  const locale = useLocale();
  const { data, isFetching } = useTournamentsById({
    id: Array.isArray(id) ? id[0] : id,
    refetchInterval: 45000,
  });

  if (isFetching) {
    return (
      <div className="min-h-screen max-w-screen gap-2 sm:p-14 p-8 sm:gap-6 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center font-[family-name:var(--font-geist-sans)]">
        <header className="md:p-8 w-full md:h-fit flex flex-row items-center justify-between">
          <Skeleton className="h-12 w-full" />
        </header>
        <main className="gap-2 h-full w-full flex flex-col lg:flex-row md:gap-6 row-start-2 items-center justify-between">
          <Skeleton className="flex flex-col h-[400px] md:h-[440px] p-2r md:px-16 w-full lg:w-2/3 lg:h-full" />
          <Skeleton className="py-2 px-4 lg:py-8 lg:px-16 w-full lg:w-1/3 lg:h-full flex flex-col" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-screen gap-2 sm:p-14 p-8 sm:gap-6 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center font-[family-name:var(--font-geist-sans)]">
      <UserNav
        title={"none"}
        username={data?.name ?? ""}
        isBack
        backPath={`/${locale}/`}
        centered
      />
      <main className="gap-2 h-full w-full flex flex-col lg:flex-row md:gap-6 row-start-2 items-center justify-between">
        <Card className="flex flex-col h-[440px] md:h-[440px] p-2 md:px-16 w-full lg:w-2/3 lg:h-full">
          <CardHeader>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${locale}/`}>
                    {t("pages.homepage")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{data?.name ?? ""}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <CardTitle>{t("tournament.title")}</CardTitle>
            <CardDescription>{t("tournament.description")} </CardDescription>
          </CardHeader>
          <div className="w-full h-full flex">
            {data && Array.isArray(data?.points) && (
              <Carousel
                className="w-full h-full flex justify-center items-center"
                opts={{ loop: true }}
                plugins={[Autoplay({ delay: 10000 })]}
              >
                <CarouselContent className="flex md:w-full md:h-full gap-4">
                  <CarouselItem className="w-[160px] h-[240px] md:h-full">
                    <PieChartComponent tournament={data} />
                  </CarouselItem>
                  <CarouselItem className="w-[20px] md:w-[160px] h-[240px] md:h-full">
                    <BarChartComponent tournament={data} />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            )}
          </div>
        </Card>
        <Card className="py-2 px-4 lg:py-8 lg:px-16 w-full lg:w-1/3 lg:h-full flex flex-col">
          <CardHeader>
            <CardTitle>{t("points.teams")}</CardTitle>
            <CardDescription>{t("points.teams-description")}</CardDescription>
          </CardHeader>
          <CardContent className="flex w-full h-full p-2 md:p-6">
            <ScrollArea className="w-full h-[460px] md:h-[600px] flex-nowrap rounded-md p-0 md:px-2 pointer-events-none">
              {data && Array.isArray(data.points) ? (
                <>
                  <div
                    className={`flex flex-col h-fit gap-2 p-1 md:gap-4 md:p-2 ${data.points.length > 3 && "animate-infinite-scroll delay-5s"}`}
                  >
                    {Array.isArray(data.points) && data.points.length > 40
                      ? data.points
                          .slice(0, 40)
                          .map((point, index) => (
                            <PointsPreview
                              isShowing
                              point={point}
                              key={index}
                            />
                          ))
                      : data.points.map((point, index) => (
                          <PointsPreview isShowing point={point} key={index} />
                        ))}
                  </div>
                  {data.points.length > 3 && (
                    <div className="flex flex-col h-fit gap-2 p-1 md:gap-4 md:p-2 animate-infinite-scroll">
                      {Array.isArray(data.points) && data.points.length > 40
                        ? data.points
                            .slice(0, 40)
                            .map((point, index) => (
                              <PointsPreview
                                isShowing
                                point={point}
                                key={index}
                              />
                            ))
                        : data.points.map((point, index) => (
                            <PointsPreview
                              isShowing
                              point={point}
                              key={index}
                            />
                          ))}
                    </div>
                  )}
                </>
              ) : (
                <h1 className="flex items-center justify-center text-xs md:text-md font-extrabold lg:text-xl text-muted-foreground ">
                  {t("no.no-points")}
                </h1>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
