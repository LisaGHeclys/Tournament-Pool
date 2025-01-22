import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();

  if (session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return (
      <div className="min-h-screen sm:p-16 p-8 gap-6 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center font-[family-name:var(--font-geist-sans)]">
        <header className="p-8 w-full h-fit flex flex-wrap sm:flex-row items-center justify-between">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Admin Hi !
          </h1>
        </header>
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {children}
        </main>
      </div>
    );
  } else redirect("/");
}
