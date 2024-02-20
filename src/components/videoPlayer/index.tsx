'use client';

import { useSearchParams } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import YTPlayer, { IYTPlayer } from "src/lib/YTPlayer";
import { Video } from "src/types/Video";
import VideoPlayerIcon from 'src/assets/icons/video.svg';
import { getVideo } from "src/service/videos.service";
import { classes, debounce } from "src/common/helper";
import {ControlShimmer, VideoDescriptionShimmer} from "./VideoShimmers";
import Slider, { TrimValue } from "../slider";
import PlayIcon from 'src/assets/icons/play.svg';
import PauseIcon from 'src/assets/icons/pause.svg';
import styles from "src/common/styles";

export type VideoPlayerProps = {};

type TrimValueWithDuration = TrimValue & {duration: number};

/**
 * Get cached Trim value for a video if empty it will return default value
 * ```{min: 0, max: 100, duration: 0}```
 * @param videoId Video id
 * @returns 
 */
const getIdTrim = (videoId: string): TrimValueWithDuration => {
    const item = localStorage.getItem(videoId);
    if(item) {
     
        return JSON.parse(item);
    }
    return {min: 0, max: 100, duration: 0}
}

/**
 * Save Video trim state in local storage
 * @param videoId Video id
 * @param trim 
 */
const saveIdTrim = (videoId: string, trim: TrimValueWithDuration) => {
    localStorage.setItem(videoId, JSON.stringify(trim));
}

const VideoPlayer: FC<VideoPlayerProps> = () => {
    const searchParams = useSearchParams();
    const [video, setVideo] = useState<Video>();
    const [, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const videoId = searchParams.get('videoId');
    const ytPlayer = useRef<IYTPlayer>(null);
    const [isPaused, setIsPaused] = useState(true);
    const [playerReader, setPlayerReady] = useState(false);
    const [trim, setTrim] = useState<TrimValueWithDuration>({max: 100, min: 0, duration: 0});
    const trimInitiated = useRef(false);

    useEffect(() => {
        // fetch Video details from backend
        const fetchVideo = async () => {
            try {
                setLoading(true);
                setError(false);
                const response = await getVideo(videoId!)
                if(response.data) {
                    setVideo(response.data);
                } else {
                    setError(true);
                }
            } catch (err) {
                setError(true);
                setVideo(undefined);
            } finally {
                setLoading(false);
            }
        };
        if(videoId) {
            // Get Trim value duration before changing/loading  video
            const {endSeconds, startSeconds, max, min, duration} = getTrimDuration();
            setTrim({duration, max, min});
            if(min === 0 && max === 100) {
                trimInitiated.current = false;
            } else {
                // trimInitiated to true in order to play new video from previous trimmed value
                trimInitiated.current = true;
            }
            ytPlayer.current?.changeVideo(videoId, startSeconds, endSeconds);
            fetchVideo();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId]);

    /**
     * Get and calculate trim value duration point
     * @returns trim values and trim duration point
     */
    const getTrimDuration = () => {
        const {max, min, duration} = getIdTrim(videoId!);
        const minDuration = calculateDuration(min, duration);
        const maxDuration = calculateDuration(max, duration);
        return {startSeconds: minDuration, endSeconds: maxDuration, duration, max, min};
    }
    /**
     * 
     * @param percentage trim value in percentage
     * @param duration Video duration in seconds
     * @returns 
     */
    const calculateDuration = (percentage: number, duration?: number) => {
        return duration ? (percentage / 100) * duration : undefined;
    }

    // Setup Video player when YouTube player is ready
    const handleOnPlayerReady = (event: YT.PlayerEvent, videoId: string) => {
        // Get initial video trim value
        const oldTrim = getIdTrim(videoId);
        // update trim duration only as that is the only info we can't determine before loading video
        oldTrim.duration = event.target.getDuration();
        saveIdTrim(videoId, oldTrim);
        setTrim(oldTrim);
        setPlayerReady(true);
    };

    const handleOnPlayerStateChange = (state: YT.PlayerState, videoId: string) => {
        // Update Play button state
        if(state == 1 /** Video Playing */) {
            setIsPaused(false)
        } else {
            // buffering, stop and loading, should take pause state
            setIsPaused(true)
        }
    };

    const handlePlay = () => {
        if(trimInitiated.current) {
            // When Slider thumb has been moved we need to get the values and play video from the set point
            const {endSeconds, startSeconds} = getTrimDuration();
            ytPlayer.current?.loadVideoDuration({endSeconds, startSeconds});
            trimInitiated.current = false
        } else {
            // Play and pause move if trim  value is not changed
            if(isPaused) {
                ytPlayer.current?.plaVideo();
            } else {
                ytPlayer.current?.pauseVideo();
            }
        }
    };

    const handleSliderChange = debounce((newTrim: TrimValue) => {
        setTrim((old) => {
            const newValue = {...old, ...newTrim};
            saveIdTrim(videoId!, newValue);
            return newValue
        });
        if(!isPaused) {
            ytPlayer.current?.pauseVideo();
        }
        trimInitiated.current = true;
    }, 500)

    // Displays Video description or error if an error occurred or null if video is not selected
    const renderState = () => {
        if(!videoId) {
            return null;
        } else if (error) {
            return <p className="text-center text-lg text-white ">An Error occurred</p>
        } else if (video) {
            const {title, description, channelTitle, publishTime} = video.snippet;
            return (
                <div className="">
                    <h5 className="text-base mb-3 font-bold">{title}</h5>
                    <p className="text-sm text-gray-500 font-roboto mb-6">{description}</p>
                    <div className='flex flex-wrap items-center justify-between'>
                        <div className='flex items-center gap-x-3'>
                            <div>
                                <div className="w-6 h-6 rounded-sm bg-gradient-conic to-junky-teal from-junky-yellow"/>
                            </div>
                            <span className='text-gray-500 text-xs truncate'>{channelTitle}</span>
                        </div>
                        <div className='text-gray-500 text-xs truncate'>
                            {new Date(publishTime).toLocaleDateString('en-GB')}
                        </div>
                    </div>
                </div>
            )
        }
        return <VideoDescriptionShimmer />
    }

    // Renders video Range and Play buttons
    const renderControllerState = () => {
        if(!playerReader) {
            return (<ControlShimmer/>)
        }
        return (
            <div className="flex items-center gap-x-2 mt-2" >
                <div role="button" aria-label={isPaused ? 'Play' : 'Pause'} title={isPaused ? 'Play' : 'Pause'} onClick={handlePlay}>
                {isPaused ?  (
                        <PlayIcon className="text-junky-yellow" width={24} height={24}/>
                    ) : (
                        <PauseIcon className="text-junky-yellow" width={24} height={24}/>
                    )}
                    
                </div>
                <div className="flex-1">
                    <Slider onChange={handleSliderChange} max={trim.max} min={trim.min}/>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-[640px] overflow-hidden">
            {videoId ? (
                <div className={!playerReader ? 'pointer-events-none opacity-55 transition-opacity ease-in duration-300' : ''}>
                    <YTPlayer 
                        initialVideo={videoId ?? ''}
                        // key={videoId}
                        className="w-full h-96 rounded-xl " 
                        onPlayerReady={handleOnPlayerReady}
                        onPlayerStateChange={handleOnPlayerStateChange}
                        ref={ytPlayer}
                        start={calculateDuration(trim.min, trim.duration)}
                        end={calculateDuration(trim.max, trim.duration)}
                    >
                        {/* will be replaced by Youtube */}
                        <div className={classes('w-full top-0 bottom-0 rounded-xl', styles.shimAnimation)} style={{position: 'absolute'}}/>
                    </YTPlayer>
                    {renderControllerState()}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-280px)] md:h-[unset]">
                    <VideoPlayerIcon className="text-junky-yellow" width={100} height={100} />
                    <p className="text-center text-lg text-white">Select a Video to play</p>
                </div>
            )}
            <div className="mt-8 min-h-10 transition-all">
                {renderState()}
            </div>
        </div>
    );

};

export default VideoPlayer;