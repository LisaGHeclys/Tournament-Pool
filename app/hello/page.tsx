"use client"
import {useRouter} from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-8 sm:pb-20 gap-16 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="p-8 w-full h-fit flex flex-wrap sm:flex-row justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Hi, first time around ?
        </h1>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/*TODO: Card for first time user, enter info*/}
      </main>
    </div>
  );
}
