import { BookmarkList } from "@/components/bookmark-list";
import { Loader } from "@/components/loader";
import { ModeToggle } from "@/components/theme-toggle";
import { Data } from "@/lib/types";
import { getBookmarkItems } from "@/utils/raindrop";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const data: Data | null = await getBookmarkItems();
  const { count } = data ? data : { count: "" };
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ModeToggle count={count} />
      <main className="font-[family-name:var(--font-geist-mono)] max-w-2xl">
        <Suspense fallback={<Loader />}>
          <BookmarkList initialData={data} />
        </Suspense>
      </main>
      <footer>
        <Link
          href="https://adhiraj.tech/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 text-blue-700 visited:text-zinc-700 inline-flex items-center gap-x-2"
        >
          <Image
            src="/bytehead.jpg"
            className="aspect-square rounded-full"
            alt="avatar"
            width={40}
            height={40}
          />
          byt3h3ad
        </Link>
      </footer>
    </div>
  );
}
