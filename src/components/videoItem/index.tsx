'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { FC } from 'react'
import { classes } from 'src/common/helper';
import { Video } from 'src/types/Video';

type VideoItemProps = {
  video: Video;
  onSelected?: () => void;
};

const VideoItem: FC<VideoItemProps> = ({video, onSelected}) => {
  const {id, snippet: {description, channelTitle, publishTime, title, thumbnails: {default: original, high, medium}}} = video;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const idParam = searchParams.get('videoId') ?? '';

  const createVideoHref = (videoId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('videoId', videoId);
    return `${pathname}?${params.toString()}`;
  };

  const isActive = idParam === id.videoId;

  return (
    <Link href={createVideoHref(id.videoId)} onClick={onSelected} className={classes(
      'flex gap-x-3 items-center px-2 py-2 font-roboto',
      'rounded-md border border-transparent relative overflow-hidden',
      isActive ? '!border-junky-yellow' : 'hover:!border-junky-yellow'
      )}>
        {/* srcSet={`${medium.url} 480w ${high.url} 800w`} sizes="(max-width: 600px) 480px, 800px" */}
        <div className='w-48 h-48'>
          <Image alt={title} src={original.url} width={original?.width ?? 300} height={original?.height ?? 300} className="w-48 h-48 rounded-lg overflow-hidden"/>
        </div>
        <div className='space-y-4 flex-1'>
          <h3 className='text-sm font-semibold max_lines_2' title={title}>{title}</h3>
          <div className='flex items-center gap-x-3'>
            <div className="w-6 h-6 rounded-sm bg-gradient-conic to-junky-teal from-junky-yellow"/>
            <span className='text-gray-500 text-xs truncate'>{channelTitle}</span>
          </div>
          <p className='text-xs text-gray-500 max_lines_2'>
            {description}
          </p>
          <div className='text-gray-500 text-xs truncate'>
            {new Date(publishTime).toLocaleDateString('en-GB')}
          </div>
        </div>
        <div className={classes(
          "absolute left-0 bottom-0 border-junky-yellow",
          "border-[20px] border-r-[20px] border-r-transparent h-0 w-0",
          isActive ? '' : 'hidden'
        )}
        />
    </Link>
  )
}

export default VideoItem