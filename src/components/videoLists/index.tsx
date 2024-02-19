'use client';
import { FC, useEffect, useState} from "react";
import VideoItem from "../videoItem";
import Pagination from "../pagination";
import { getVideos } from "src/app/api/actions";
import { Video } from "src/types/Video";
import SearchInput from "../searchInput";
import { classes } from "src/common/helper";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import CloseIcon from 'src/assets/icons/close.svg';
import VideoIcon from 'src/assets/icons/video.svg';

export type VideoListsProps = {
    // params: GetVideosRequestParams;
    result: ReturnType<typeof getVideos>
};

const VideoLists: FC<VideoListsProps> =  ({result}) => {
 
    // const response = await getVideos({
    //     page: params.page, search: params.search, size: params.size ?? 10
    // });
    const {results, page, pageCount, pages, size} = result;
    const [visible, setVisible] = useState(false)
    const isLargeScreen = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        setVisible(isLargeScreen);
    }, [isLargeScreen])

    const onSelected = () => {
        console.log(isLargeScreen)
        if(!isLargeScreen) {
            setVisible(false);
        }
    };

    
    return (
        <>
            <button className="flex gap-2 md:hidden mt-2 mb-4 bg-junky-yellow text-primary font-medium p-1 rounded-md items-center" onClick={() => setVisible(!visible)}>
                <VideoIcon width={24} height={24} className="inline"/>
                <span>Show Videos</span>
            </button>
            <aside 
                className={classes(
                "w-full md:max-w-[530px] md:pr-3 overflow-y-auto space-y-4 md:h-[calc(100vh-64px-2.5rem)] pb-5",
                "md:relative fixed right-0 bottom-0 top-0 px-4",
                "md:left-[unset] md:right-[unset] md:bottom-[unset] md:top-[unset] bg-primary z-40 transition-transform md:transition-none ease-in duration-500",
                "md:block", !visible ? 'translate-x-[-100vw]' : 'translate-x-0'
                )}
            >
                <div className="sticky top-0 space-y-2 flex flex-col bg-primary pb-3 z-10 md:pt-0 pt-5 items-center gap-3">
                    <div className="md:hidden self-end" role="button" aria-label="Close Menu" title="Close Menu" onClick={onSelected}>
                        <CloseIcon className="text-white"/>
                    </div>
                    <div className="w-full">
                        <SearchInput placeholder="Search Videos" />
                    </div>
                </div>
                {!results.length ? (
                    <div>
                        <p className="text-gray-500 text-base text-center mt-8 mb-8">No Videos available</p>
                    </div>
                ) : (
                    <div>
                        {results.map(video => (
                            <VideoItem video={video as Video} key={video.id.videoId} onSelected={onSelected}/>
                        ))}
                    </div>
                )}
                {!!results.length && (
                    <Pagination 
                        count={pageCount} 
                        size={pages} 
                    />
                )}
            </aside>
        </>
    );

};

export default VideoLists;