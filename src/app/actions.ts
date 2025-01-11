"use server";

import { getBookmarkItems } from "@/utils/raindrop";

export const getBookmarkItemsByPageIndex = async (pageIndex: number) => {
  return await getBookmarkItems(pageIndex);
};
