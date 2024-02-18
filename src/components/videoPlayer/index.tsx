'use client';

import { FC } from "react";
import YTPlayer from "src/lib/YTPlayer";
import { Video } from "src/types/Video";

export type VideoPlayerProps = {
    video?: Video
};

const VideoPlayer: FC<VideoPlayerProps> = ({video}) => {
    // const {id} = video;

    const handleOnPlayerReady = (event: YT.PlayerEvent) => {
        console.log(event.target)
    };
    return (
        <div className="w-full max-w-[640px] rounded-xl overflow-hidden h-96">
            <YTPlayer initialVideo="OWut8sCNFP8" className="w-full h-full" onPlayerReady={handleOnPlayerReady}/>
        </div>
    );

};

export default VideoPlayer;