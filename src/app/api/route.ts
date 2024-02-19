import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, JunkyPaginatedResponse, JunkyResponse } from "src/common/JunkyResponse";
import { getVideo, getVideos } from "./actions";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id');
    if(id) {
        // if Id in query param we are returning a single value other query params passed are ignored
        return  getVideoService(id);
    } else {
        return getVideosService(searchParams);
    }
}

/**
 * Function to fetch single video
 * @param id video id
 * @returns video object
 */
const getVideoService = (id: string) => {
    const video = getVideo(id);
    if(video) {
        return  JunkyResponse.getResponse({
            message: `Returning ${video.id}`,
            status: 200,
            data: video
        });
    } else {
        return JunkyResponse.getResponse({message: `Video with id ${id} not found`, status: 404})
    }
}

/**
 * Get array of videos based on query params
 * @param queryParams Request query params
 * @returns  {JunkyPaginatedResponse}
 */
const getVideosService = (queryParams: URLSearchParams) => {
    const page = Number(queryParams.get('page')) || DEFAULT_PAGE;
    const size = Number(queryParams.get('size')) || DEFAULT_PAGE_SIZE;
    let searchQuery = queryParams.get('search') ?? '';
    let {results, totalSize} = getVideos({page, size, search: searchQuery});
    const responseData = new JunkyPaginatedResponse(page, size, results, totalSize);
    return responseData.getResponse({message: 'Videos Fetched', status: 200});
}