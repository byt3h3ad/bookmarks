import { formatDate } from "@/lib/utils";
import { Tweet, TweetSkeleton } from "react-tweet";

export const TweetCard = ({
  id,
  createdAt,
}: {
  id: string;
  createdAt: string;
}) => {
  if (!id) return null;
  return (
    <div className="grid place-content-center light">
      <Tweet
        id={id}
        fallback={
          <div>
            <TweetSkeleton />
          </div>
        }
      />
      <div className="flex justify-between items-center line-clamp-4 gap-1 text-sm text-zinc-500">
        <span>[x.com]</span>
        <span className="text-right">{formatDate(createdAt)}</span>
      </div>
    </div>
  );
};
