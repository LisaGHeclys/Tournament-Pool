"use client";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import Footer from "@/components/ui/footer";
import { useToast } from "@/hooks/use-toast";
import { useLocale, useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/navbar/theme-toggle";

export default function Login() {
  const router = useRouter();
  const t = useTranslations();
  const { toast } = useToast();
  const { status } = useSession();
  const locale = useLocale();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn("github", { redirectTo: `/${locale}/user` });
      toast({
        title: t("toast.login-success.title"),
        description: t("toast.login-success.description"),
      });
    } catch (e) {
      toast({
        title: t("toast.login-fail.title") + e,
        description: t("toast.login-fail.description"),
        variant: "destructive",
      });
    }
  };

  if (status === "authenticated") redirect(`/${locale}/user`);

  return (
    <div className="min-h-screen p-8 sm:pb-20 gap-16 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="md:p-8 w-full md:h-fit flex flex-col md:flex-row md:items-center justify-between">
        <Button
          className="hover:scale-105 transition ease-in-out delay-150"
          onClick={() => {
            router.push(`/${locale}/`);
          }}
        >
          {t("pages.homepage")}
        </Button>
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight lg:text-5xl">
          {t("navbar.welcome-login")}
        </h1>
        <ThemeToggle />
      </header>
      <main className="w-full flex flex-col gap-8 justify-center items-center">
        <Card className="w-full md:w-[400px]">
          <CardHeader>
            <CardTitle>{t("navbar.login")}</CardTitle>
            <CardDescription>{t("navbar.login-description")}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <form onSubmit={handleSignIn}>
              <Button
                className="hover:scale-105 transition ease-in-out delay-250"
                type="submit"
              >
                <Github className="mr-2" /> {t("navbar.login-github")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
