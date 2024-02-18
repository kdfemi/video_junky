import Image from 'next/image';
import React, { FC } from 'react'
import { Video } from 'src/types/Video';

type VideoItemProps = {
    video: Video;
};

const VideoItem: FC<VideoItemProps> = ({video}) => {
    const {id, snippet: {description, channelTitle, publishTime, title, thumbnails: {default: original, high, medium}}} = video;
  return (
    <div className='flex gap-x-3 justify-center items-center font-roboto'>
        {/* srcSet={`${medium.url} 480w ${high.url} 800w`} sizes="(max-width: 600px) 480px, 800px" */}
        <div className='min-w-48 h-48'>
          <Image alt={title} src={original.url} width={original.width} height={original.height} className="w-48 h-48 rounded-lg overflow-hidden"/>
        </div>
        <div className='space-y-4'>
          <h3 className='text-sm font-semibold max_lines_2' title={title}>{title}</h3>
          <div className='flex items-center gap-x-3'>
            <div className="w-6 h-6 rounded-sm bg-gradient-conic to-junky-teal from-junky-yellow"/>
            <span className='text-gray-500 text-xs truncate'>{channelTitle}</span>
          </div>
          <div className='text-gray-500 text-xs truncate'>
            {new Date(publishTime).toLocaleDateString('en-GB')}
          </div>
        </div>
    </div>
  )
}

export default VideoItem