'use client'
import { usePathname, useSearchParams } from "next/navigation";
import { FC, Key, useCallback, useEffect, useRef, useState } from "react";
import { getVideos } from "src/service/videos.service";
import { Video } from "src/types/Video";
import { GetVideosRequestParams } from "src/types/VideoService.model";
import VideoItem from "../videoItem";
import Pagination from "../pagination";
import { PageDetails } from "src/types/BaseApiResponse";
import { useRouter } from "next/router";

export type VideoListsProps = {};

const VideoLists: FC<VideoListsProps> = () => {
    const [videos, setVideos] = useState<Array<Video>>([]);
    const [loading, setLoading] = useState(false);
    const [activeVideo, setActiveVideo] = useState<Video>();
    const [pageCount, setPageCount] = useState<PageDetails>({page: 0, pageCount: 0, pages: 0, size: 0});
    const router = useRouter();
    
    const searchParams = useSearchParams();
    const pathname = usePathname();
    // const pages = useRef({page: 1, pages: 0, size: 10, search: ''});

    const fetchPages = useCallback(async (params: GetVideosRequestParams) => {
        try {
            setLoading(true);
            setVideos([]);
            const page =  parseInt(searchParams.get('page') ?? '1', 10);
            const size = parseInt(searchParams.get('size') ?? '10');
            const search = searchParams.get('q') ?? '';
            const response = await getVideos({
                page, search, size
            });
            if(response.statusCode === 200) {
                const {results, ...others} = response.data;
                setVideos(results);
                setPageCount(others);
            } else {
                // TODO: handle error
            }
        } catch (err) {
            // TODO: handle error
            console.log(err)
        } finally {
            setLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchPages({page: 1, size: 10})
    }, [fetchPages])

    const handlePageChange = (page: number) => {
        // router.push()
    }

    
    return (
        <aside className="w-full max-w-[530px] md:pl-6 md:pr-2 overflow-y-auto space-y-4 h-[calc(100vh-64px-2.5rem)] pb-5" >
            {videos.map(video => (
                <VideoItem video={video} key={video.id.videoId}/>
            ))}
            <Pagination onPageChange={handlePageChange} initialPage={parseInt(searchParams.get('page') ?? '1', 10)} count={pageCount.pageCount} size={pageCount.size} />
        </aside>
    );

};

export default VideoLists;