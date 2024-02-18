
import endpoints from "./endpoints";
import { makeUrl } from "src/common/helper";
import { BaseApiResponse, PageData } from "src/types/BaseApiResponse";
import { Video } from "src/types/Video";
import { GetVideosRequestParams } from "src/types/VideoService.model";

const getVideos = async (query: GetVideosRequestParams) => {
  const rawResponse = await fetch(makeUrl(endpoints.GET_VIDEOS, query));
  const response = await rawResponse.json();
  return response as BaseApiResponse<PageData<Video>>;
}

const getVideo = async (id: string) => {
  const rawResponse = await fetch(makeUrl(endpoints.GET_VIDEOS, {id}));
  const response = await rawResponse.json();
  return response as BaseApiResponse<Video>;
}

export {
  getVideos,
  getVideo,
}