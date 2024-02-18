import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, JunkyPaginatedResponse, JunkyResponse } from "src/common/JunkyResponse";
import data from "src/db/data";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id');
    if(id) {
        // if Id in query param we are returning a single value other query params passed are ignored
        return  getVideo(id);
    } else {
        return getVideos(searchParams);
    }
}

/**
 * Function to fetch single video
 * @param id video id
 * @returns video object
 */
const getVideo = (id: string) => {
    const video = data.find((item) => item.id.videoId === id);
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
const getVideos = (queryParams: URLSearchParams) => {
    const page = parseInt(queryParams.get('page') || DEFAULT_PAGE+'', 10);
    const size = parseInt(queryParams.get('size') || DEFAULT_PAGE_SIZE+'', 10);
    let searchQuery = queryParams.get('search') ?? '';
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
    const responseData = new JunkyPaginatedResponse(page, size, results, videos.length);
    return responseData.getResponse({message: 'Videos Fetched', status: 200});
    
}