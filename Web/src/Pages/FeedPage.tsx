import React from "react";
import { useFeedPage } from "../hooks/useFeedPage";
import FeedHeader from "../Component/FeedHeader";
import SwipeCard from "../Component/SwipeCard";
import FeedEmptyState from "../Component/FeedEmptyState";
import FeedControls from "../Component/FeedControls";
import MatchModal from "../Component/MatchModal";

const FeedPage: React.FC = () => {
  const feed = useFeedPage();

  return (
    <div className="h-full w-full bg-white text-[#141118] flex flex-col justify-between overflow-hidden select-none">
      <div className="w-full max-w-md md:max-w-[780px] mx-auto h-full flex flex-col justify-between px-4 sm:px-6 py-3 md:py-5">
        <FeedHeader />

        <main className="relative flex-1 min-h-0 my-2 md:my-3 flex items-center justify-center">
          {feed.activeProfile && !feed.isLoading ? (
            <SwipeCard
              key={feed.activeProfile.user_id}
              profile={feed.activeProfile}
              dragOffset={feed.dragOffset}
              isDragging={feed.isDragging}
              rotation={feed.rotation}
              acceptProgress={feed.acceptProgress}
              rejectProgress={feed.rejectProgress}
              pointerHandlers={feed.pointerHandlers}
            />
          ) : (
            <FeedEmptyState
              isLoading={feed.isLoading}
              history={feed.history}
              onReload={feed.handleReload}
            />
          )}
        </main>

        <FeedControls
          disabled={
            !feed.activeProfile || Boolean(feed.exitAction) || feed.isLoading
          }
          onSwipe={feed.triggerSwipe}
        />
      </div>

      <MatchModal
        isOpen={Boolean(feed.matchedUser)}
        matchedUser={feed.matchedUser}
        onClose={feed.closeMatchModal}
      />
    </div>
  );
};

export default FeedPage;
