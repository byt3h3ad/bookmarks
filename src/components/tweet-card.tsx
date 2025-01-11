import { Tweet, TweetSkeleton } from "react-tweet";

export const TweetCard = ({ id }: { id: string }) => {
  if (!id) return null;

  return (
    <div className="relative w-full min-w-full overflow-hidden rounded-xl">
      <Tweet
        id={id}
        fallback={
          <div>
            <TweetSkeleton />
          </div>
        }
      />
    </div>
  );
};
