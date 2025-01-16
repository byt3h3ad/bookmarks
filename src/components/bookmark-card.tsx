import { Item } from "@/lib/types";
import { formatDate, isTweetLink } from "@/lib/utils";
import React from "react";
import { TweetCard } from "./tweet-card";

interface Props {
  bookmark: Item;
}

export const BookmarkCard: React.FC<Props> = ({ bookmark }) => {
  if (isTweetLink(bookmark.link)) {
    const match = bookmark.link.match(/\/status\/(\d+)/) ?? [];
    const tweetId = match[1];
    return <TweetCard id={tweetId} createdAt={bookmark.created} />;
  }
  return (
    <a
      href={bookmark.link}
      className="p-4 rounded-xl transition-colors bg-inherit border border-zinc-50 duration-300 hover:bg-zinc-100 space-y-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className="line-clamp-4 leading-snug">{bookmark.title}</h2>
      <div className="flex justify-between items-center line-clamp-4 gap-1 text-sm text-zinc-500">
        <span>[{bookmark.domain}]</span>
        <span className="text-right">{formatDate(bookmark.created)}</span>
      </div>
      <span className="line-clamp-6 text-sm">{bookmark.excerpt}</span>
    </a>
  );
};
