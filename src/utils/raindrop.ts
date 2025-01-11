import { cache } from "react";
import "server-only";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.RAINDROP_ACCESS_TOKEN}`,
  },
  next: {
    revalidate: 60 * 60 * 24 * 2,
  },
};

const RAINDROP_API_URL = "https://api.raindrop.io/rest/v1";

export const getBookmarkItems = cache(async (id = 0, pageIndex = 0) => {
  try {
    const response = await fetch(
      `${RAINDROP_API_URL}/raindrops/${id}?` +
        new URLSearchParams({
          page: pageIndex.toString(),
          perpage: "10",
        }),
      options
    );
    return await response.json();
  } catch (error) {
    console.info(error);
    return null;
  }
});
