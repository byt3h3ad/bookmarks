import { config, Data } from "@/lib/types";
import { getBookmarkItems } from "@/utils/raindrop";
import { Feed } from "feed";

export const dynamic = "force-static";

export async function GET() {
  const data: Data | null = await getBookmarkItems();
  const date = new Date();

  const feed = new Feed({
    title: `Bookmarks RSS feed by ${config.author.name}`,
    description:
      "Stay up to date with my latest selection of various handpicked bookmarks",
    id: config.siteURL,
    link: config.siteURL,
    language: "en",
    copyright: `All rights reserved ${date.getFullYear()}, ${
      config.author.name
    }`,
    author: config.author,
    feedLinks: {
      rss2: `${config.siteURL}/rss.xml`,
    },
  });

  const bookmarkList = [];
  for (const bookmark of data?.items ?? []) {
    bookmarkList.push({
      id: bookmark._id,
      guid: bookmark._id,
      title: bookmark.title,
      link: bookmark.link,
      description: bookmark.excerpt,
      content: bookmark.excerpt,
      image: bookmark.cover,
      date: new Date(bookmark.created),
      author: [config.author],
      contributor: [config.author],
    });
  }

  const sortedBookmarks = bookmarkList.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  sortedBookmarks.forEach((bookmark) => {
    feed.addItem({ ...bookmark });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
