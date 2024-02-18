'use client'
import React, { ComponentProps, ForwardRefRenderFunction, forwardRef, useEffect, useImperativeHandle, useRef,  } from 'react';

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
    onPlayerReady: (event: YT.PlayerEvent) => void;
    /**
     * Called when Player state changes
     * @param state Player status
     * @returns 
     */
    onPlayerStateChange?: (state: YT.OnStateChangeEvent['data']) => void;
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
  changeVideo: (videoId: string) => void;
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

const YTPlayer: ForwardRefRenderFunction<IYTPlayer, YTPlayerProps> = ({initialVideo, onPlayerReady, onPlayerStateChange, ...props}, ref) => {
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
        // create Youtube iframe api script props
        const src = 'https://www.youtube.com/iframe_api';
        const script = document.createElement('script');
        script.id = 'YTPlayer-script';
        script.src = src;
        document.body.appendChild(script);
    
        // handles when player state is ready
        function _onPlayerReady(event: YT.PlayerEvent) {
            onPlayerReady(event);
            console.log(event.target, 'onPlayerReady')
        }

        // handle when youtube player changes
        function _onPlayerStateChange(event: YT.OnStateChangeEvent) {
            console.log(event.data, '_onPlayerStateChange')
            onPlayerStateChange?.(event.data);
        }        
    
        let _player:  YT.Player;
    
        // called when Youtube iframe api is ready. We do all component initialization here
        window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
            _player = new YT.Player(YT_IFRAME_ID, {
                events: {
                'onReady': _onPlayerReady,
                'onStateChange': _onPlayerStateChange,
                },
                playerVars: {
                    controls: 0,
                    showinfo: 0
                },
            });
            player.current = _player;
        }
    }, [onPlayerReady, onPlayerStateChange]);

    const changeVideo = (_videoId: string) => {
        videoId.current = _videoId;
        if(player.current) {
            player.current.loadVideoById(_videoId);
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
        <iframe id={YT_IFRAME_ID}
            {...props}
            src={`https://www.youtube.com/embed/${initialVideo}?enablejsapi=1&controls=0&rel=0`}
            rel="noopener noreferrer"
        />
    )
    
}

export default forwardRef(YTPlayer);