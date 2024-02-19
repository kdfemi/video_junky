import 'server-only';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, JunkyPaginatedResponse, JunkyResponse } from "src/common/JunkyResponse";
import data from "src/db/data";
import { GetVideosRequestParams } from "src/types/VideoService.model";

/**
 * Function to fetch single video
 * @param id video id
 * @returns video object
 */
export const getVideo = (id: string) => {
    const video = data.find((item) => item.id.videoId === id);
    if(video) {
        return  video;
    } else {
        return undefined;
    }
}

/**
 * Get array of videos based on query params
 * @param queryParams Request query params
 * @returns  Array of data with pagination info
 */
export const getVideos = (queryParams: GetVideosRequestParams) => {
    const page = Number(queryParams.page) || DEFAULT_PAGE;
    const size = Number(queryParams.size) ||  DEFAULT_PAGE_SIZE;
    let searchQuery = queryParams.search ?? '';
    let videos = data;
    // filters should be applied before working on Paginating the result
    if(searchQuery) {
        searchQuery = searchQuery.toLowerCase();
        videos = data.filter((item) => item.snippet.title.toLowerCase().includes(searchQuery) || item.snippet.description.toLowerCase().includes(searchQuery));
          
    }
    // Pagination should be applied last all other future filters should be before this
    const start = JunkyPaginatedResponse.getPageStart(page, size);
    const limit = JunkyPaginatedResponse.getLimit(page, size);
    const results = videos.slice(start, limit);
    const totalSize = videos.length;
    const responseData = new JunkyPaginatedResponse(page, size, results, totalSize);
    return {results, totalSize, ...responseData.getPaginationProps()} as const;
    
}