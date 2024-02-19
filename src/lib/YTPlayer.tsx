'use client'
import Script from 'next/script';
import React, { ComponentProps, ForwardRefRenderFunction, forwardRef, useEffect, useImperativeHandle, useRef,  } from 'react';
import { classes } from 'src/common/helper';

export type YTPlayerProps = {
    /**
     * The initial video to load
     */
    initialVideo: string;
    /**
     * Fires when Youtube player is ready
     * @param event Youtube api event
     * @returns 
     */
    onPlayerReady: (event: YT.PlayerEvent, videoId: string) => void;
    /**
     * Called when Player state changes
     * @param state Player status
     * @returns 
     */
    onPlayerStateChange?: (state: YT.OnStateChangeEvent['data'], videoId: string) => void;

    /**
     * Video start duration in seconds
     */
    start?: number;

    /**
     * Video end duration in seconds
     */
    end?: number;

} & Omit<ComponentProps<'iframe'>, 'src'>;

export type IYTPlayer = {
/**
 * Get the youtube player API
 * @returns Youtube player api
 */
  getYTPlayer: () => YT.Player | undefined;
  /**
   * Change to a new video
   * @param videoId Id of the video to play
   */
  changeVideo: (videoId: string, start?: number, end?: number) => void;
  /**
   * Set where the video should play from and stop at
   * @param arg video duration
   * @returns 
   */
  loadVideoDuration: (arg: LoadVideoDurationProps) => void;
  /**
   * Play video
   * @returns 
   */
  plaVideo: () => void;

  /**
   * Pause video
   * @returns 
   */
  pauseVideo: () => void;
};

export type LoadVideoDurationProps = {endSeconds?: number; startSeconds?: number};

const YT_IFRAME_ID = 'yt-iframe';

const cached: Array<string> = [];

const YTPlayer: ForwardRefRenderFunction<IYTPlayer, YTPlayerProps> = ({initialVideo, onPlayerReady, onPlayerStateChange, start, end, children, ...props}, ref) => {
    const player = useRef<YT.Player>();
    const videoId = useRef(initialVideo)


    useImperativeHandle(ref, () => ({
        getYTPlayer() {
            return player.current;
        },
        changeVideo,
        loadVideoDuration,
        plaVideo,
        pauseVideo,
    }))
  

    useEffect(() => {
        // handles when player state is ready
        function _onPlayerReady(event: YT.PlayerEvent) {
            onPlayerReady(event, videoId.current);
        }

        // handle when youtube player changes
        function _onPlayerStateChange(event: YT.OnStateChangeEvent) {
            onPlayerStateChange?.(event.data, videoId.current);
        }   

   
        // create Youtube iframe api script props
        // USED NEXTJS SCRIPT for optimization reseons
        // if(!cached.length) {
        //     const script = document.createElement('script');
        //     const src = 'https://www.youtube.com/iframe_api';
        //     cached.push(src);
        //     script.id = 'YTPlayer-script';
        //     script.src = src;
        //     document.body.appendChild(script);
        //     const onScriptError = () => {
        //         script.remove();
        //         cached.splice(0, 1);
        //     }
        //     script.addEventListener('error', onScriptError, true);
        // }
            let _player:  YT.Player;
        
            // called when Youtube iframe api is ready. We do all component initialization here
            window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
                _player = new YT.Player(YT_IFRAME_ID, {
                    videoId: initialVideo,
                    events: {
                    'onReady': _onPlayerReady,
                    'onStateChange': _onPlayerStateChange,
                    },
                    playerVars: {
                        // controls: 0,
                        showinfo: 0,
                        start: start,
                        end: end,
                        autoplay: 0
                    },
                });
                player.current = _player;
            }
    }, [initialVideo, onPlayerReady, onPlayerStateChange, start, end]);

    const changeVideo = (_videoId: string, start?: number, end?: number) => {
        videoId.current = _videoId;
        if(player.current) {
            player.current.loadVideoById({videoId: _videoId, startSeconds: start, endSeconds: end});
        }
    }

    const loadVideoDuration = (duration: LoadVideoDurationProps) => {
        if(player.current) {
            player.current.loadVideoById({videoId: videoId.current, ...duration});
        }
    }

    const plaVideo = () => {
        if(player.current) {
            player.current.playVideo();
        }
    }

    const pauseVideo = () => {
        if(player.current) {
            player.current.pauseVideo();
        }
    }

    return (
        <>
            <div id={YT_IFRAME_ID} {...props} className={classes(props.className, 'relative')}>
                {children}
            </div>
            <Script src="https://www.youtube.com/iframe_api" id="YTPlayer-script"/>
        </>
    )
    
}

export default forwardRef(YTPlayer);