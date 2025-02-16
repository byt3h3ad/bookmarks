import { SubmitBookmarkForm } from "@/components/bookmark-submit";

export default function Page() {
  return (
    <div className="grid place-content-center font-[family-name:var(--font-geist-sans)] min-h-svh space-y-8">
      <SubmitBookmarkForm />
      <a
        href="https://airtable.com/app5ggckLfsOZAvcf/shrY77vklc6j38VGO/tbljSWBO3Ew8gtu96"
        target="_blank"
        className="opacity-60 text-center underline underline-offset-2 hover:opacity-75 transition-opacity duration-300"
      >
        database
      </a>
    </div>
  );
}
