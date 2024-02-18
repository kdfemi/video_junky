export interface VideoId {
    kind: string;
    videoId: string;
}

export interface VideoThumbnail {
    url: string;
    width: number,
    height: number,
}

export interface VideoThumbnails {
    default: VideoThumbnail,
    medium: VideoThumbnail,
    high: VideoThumbnail,
}

export interface VideoSnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: VideoThumbnails,
    channelTitle: string;
    liveBroadcastContent: "none" | "live",
    publishTime: string;
}

export interface Video {
    kind: string;
    etag: string;
    id: VideoId;
    snippet: VideoSnippet,
}