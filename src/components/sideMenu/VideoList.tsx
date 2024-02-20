import { FC } from "react";
import VideoItem from "../videoItem";
import Pagination from "../pagination";
import { getVideos } from "src/app/api/actions";
import { Video } from "src/types/Video";
import { GetVideosRequestParams } from "src/types/VideoService.model";

export type VideoListProps = {
    /**
     * Page query params
     */
    params: GetVideosRequestParams;
};

const VideoList: FC<VideoListProps> =  ({params}) => {
 
    const response =  getVideos({page: params.page, search: params.search, size: params.size});
    const {results, pages} = response;
    
    return (
        <div data-testid="videoList">
            {!results.length ? (
                <div >
                    <p className="text-gray-500 text-base text-center mt-8 mb-8">No Videos available</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {results.map((video, index) => (
                        <VideoItem video={video as Video} key={video.id.videoId} data-testid={`video-${index}`}/>
                    ))}
                </div>
            )}
            {!!results.length && (
                <Pagination  
                    size={pages} 
                />
            )}
        </div>
    );

};

export default VideoList;