import axios from "axios";
import type { SwipePayload } from "../Types/FeedType";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

//Feed API
export const getFeed = async () => {
  const res = await api.get("/feed");
  return res.data;
};

//Swipe API
export const sendSwipeAction = async (data: SwipePayload) => {
  const res = await api.post("/swipe", data);
  return res.data;
};

//Matches API
export const getMatches = async () => {
  const res = await api.get("/matches");
  return res.data;
};
