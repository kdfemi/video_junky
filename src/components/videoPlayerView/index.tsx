import { FC } from "react";
import VideoPlayer from "../videoPlayer";
import { classes } from "src/common/helper";

export type VideoPlayerViewProps = {};

const VideoPlayerView: FC<VideoPlayerViewProps> = () => {
    return (
        <section className={classes(
            "max-w-full md:max-w-[90%] w-[940px] mx-auto", 
            "flex flex-col justify-center items-center")}
        >
            <VideoPlayer />
        </section>
    );

};

export default VideoPlayerView;