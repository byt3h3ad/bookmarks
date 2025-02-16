"use server";

import { formData } from "@/components/bookmark-submit";
import { getBookmarkItems } from "@/utils/raindrop";
import { cookies } from "next/headers";

export const getBookmarkItemsByPageIndex = async (pageIndex: number) => {
  return await getBookmarkItems(0, pageIndex);
};

export async function submitBookmark(formData: formData) {
  const cookieStore = await cookies();

  const formSubmissionCountCookie = cookieStore.get("formSubmissionCount");
  if (Number(formSubmissionCountCookie?.value) >= 30) {
    throw new Error(
      "You have reached the maximum number of submissions for today."
    );
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_BOOKMARKS_TABLE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          fields: {
            url: formData.url,
            type: formData.type || "Other",
            notes: formData.notes,
          },
        }),
        signal: AbortSignal.timeout(5000),
      }
    );

    cookieStore.set(
      formSubmissionCountCookie?.name ?? "formSubmissionCount", // Name
      (Number(formSubmissionCountCookie?.value ?? 0) + 1).toString(), // Value as string
      {
        maxAge: 60 * 60 * 24, // 24 hours
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.info(error);
    throw new Error("Failed to submit bookmark");
  }
}
