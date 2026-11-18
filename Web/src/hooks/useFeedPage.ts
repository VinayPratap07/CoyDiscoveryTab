import { useState, useRef, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  FeedApiResponse,
  Profile,
  SwipeAction,
  SwipeApiResponse,
  SwipePayload,
} from "../Types/FeedType";
import type { MatchedUser } from "../Component/MatchModal";
import { getFeed, sendSwipeAction } from "../Service/api";

export const SWIPE_THRESHOLD = 100;

export const useFeedPage = () => {
  const queryClient = useQueryClient();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [exitAction, setExitAction] = useState<SwipeAction | null>(null);
  const [matchedUser, setMatchedUser] = useState<MatchedUser | null>(null);

  const startPos = useRef({ x: 0, y: 0 });

  const { data, isLoading, isFetching, refetch } = useQuery<FeedApiResponse>({
    queryKey: ["feed-profiles"],
    queryFn: getFeed,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const profiles = data?.profiles ?? [];
  const activeProfile = profiles[currentIndex];
  const hasMore = data?.hasMore ?? false;

  // Handle successful match
  const { mutate: sendSwipe } = useMutation<
    SwipeApiResponse,
    Error,
    { payload: SwipePayload; profile: Profile }
  >({
    mutationFn: ({ payload }) => sendSwipeAction(payload),

    onSuccess: (response, { payload, profile }) => {
      if (payload.action === "LIKE" && response.isMatch) {
        setMatchedUser({
          user_id: profile.user_id,
          name: profile.name,
          photoUrl: profile.photoUrl,
        });

        queryClient.invalidateQueries({ queryKey: ["matches"] });
        queryClient.invalidateQueries({ queryKey: ["feed-profiles"] });
      }
    },
  });

  // Perform swipe
  const triggerSwipe = useCallback(
    (action: SwipeAction) => {
      if (!activeProfile || exitAction) return;

      const profile = activeProfile;

      setExitAction(action);
      setDragOffset({
        x: action === "LIKE" ? 550 : -550,
        y: 25,
      });

      sendSwipe({
        payload: {
          swipedId: profile.user_id,
          action,
        },
        profile,
      });

      setTimeout(async () => {
        setExitAction(null);
        setDragOffset({ x: 0, y: 0 });

        // Load next batch when current batch is exhausted
        if (currentIndex + 1 >= profiles.length && hasMore) {
          setCurrentIndex(profiles.length);

          await refetch();

          setCurrentIndex(0);
        } else {
          setCurrentIndex((prev) => prev + 1);
        }
      }, 260);
    },
    [
      activeProfile,
      exitAction,
      currentIndex,
      profiles.length,
      hasMore,
      refetch,
      sendSwipe,
    ],
  );

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (exitAction) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);

    startPos.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || exitAction) return;

    setDragOffset({
      x: e.clientX - startPos.current.x,
      y: (e.clientY - startPos.current.y) * 0.2,
    });
  };

  const handlePointerUp = () => {
    if (!isDragging) return;

    setIsDragging(false);

    if (dragOffset.x > SWIPE_THRESHOLD) {
      triggerSwipe("LIKE");
    } else if (dragOffset.x < -SWIPE_THRESHOLD) {
      triggerSwipe("PASS");
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleReload = () => {
    setCurrentIndex(0);
    setDragOffset({ x: 0, y: 0 });
    refetch();
  };

  const rotation = dragOffset.x * 0.03;

  const acceptProgress = Math.min(
    Math.max(dragOffset.x / SWIPE_THRESHOLD, 0),
    1,
  );

  const rejectProgress = Math.min(
    Math.max(-dragOffset.x / SWIPE_THRESHOLD, 0),
    1,
  );

  return {
    activeProfile,
    currentIndex,
    totalInBatch: profiles.length,
    history,
    isLoading: isLoading || (isFetching && profiles.length === 0),
    dragOffset,
    isDragging,
    exitAction,
    rotation,
    acceptProgress,
    rejectProgress,
    matchedUser,
    closeMatchModal: () => setMatchedUser(null),
    triggerSwipe,
    handleReload,
    pointerHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
    },
  };
};
