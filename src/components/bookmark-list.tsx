"use client";

import { getBookmarkItemsByPageIndex } from "@/app/actions";
import { Data } from "@/lib/types";
import { ArrowDownIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { BookmarkCard } from "./bookmark-card";
import { Button } from "./ui/button";

interface Props {
  initialData: Data | null;
}

export const BookmarkList: React.FC<Props> = ({ initialData }) => {
  const [data, setData] = useState(
    initialData?.result ? initialData?.items : []
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    if (!isReachingEnd && !isLoading)
      setPageIndex((prevPageIndex) => prevPageIndex + 1);
  };

  const fetchInfiniteData = useCallback(async () => {
    setIsLoading(true);
    const newData = await getBookmarkItemsByPageIndex(pageIndex);
    if (newData.result) setData((prevData) => [...prevData, ...newData.items]);
    setIsLoading(false);
  }, [pageIndex]);

  useEffect(() => {
    if (pageIndex > 0) fetchInfiniteData();
  }, [pageIndex, fetchInfiniteData]);

  const isReachingEnd = data.length >= (initialData?.count ?? 0);
  return (
    <div className="">
      <div className="grid gap-4">
        {data.map((bookmark, index) => (
          <BookmarkCard key={index} bookmark={bookmark} />
        ))}
      </div>
      {data.length > 0 ? (
        <div className="mt-8 flex min-h-16 items-center justify-center text-sm lg:mt-12">
          {!isReachingEnd ? (
            <>
              {isLoading ? (
                <div
                  className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent text-black"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={loadMore}
                  disabled={isLoading}
                  className="w-full justify-center bg-white"
                >
                  Load more
                  <ArrowDownIcon size={16} />
                </Button>
              )}
            </>
          ) : (
            <span>That&apos;s all for now. Come back later for more.</span>
          )}
        </div>
      ) : (
        <div className="mt-8 flex min-h-16 flex-col items-center justify-center lg:mt-12">
          <span>No bookmarks found.</span>
        </div>
      )}
    </div>
  );
};
