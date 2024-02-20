export const videoMock =  {
    "kind":"youtube#searchResult",
    "etag":"2XRyyyjfe4AsHOsGqmKcuAMyUCM",
    "id":{
       "kind":"youtube#video",
       "videoId":"SO1th-Oh39I"
    },
    "snippet":{
       "publishedAt":"2023-10-08T18:00:15Z",
       "channelId":"UCjIuqG1hCxUdLLxOD_uR0vQ",
       "title":"Joh John Florence And Friends At Rocky Point (4K Raw)",
       "description":"Filmed on October 6, 2023 at Rocky Point on the North Shore of Oahu in Hawai'i. Watch as John John Florence goes for a free ...",
       "thumbnails":{
          "default":{
             "url":"https://i.ytimg.com/vi/SO1th-Oh39I/default.jpg",
             "width":120,
             "height":90
          },
          "medium":{
             "url":"https://i.ytimg.com/vi/SO1th-Oh39I/mqdefault.jpg",
             "width":320,
             "height":180
          },
          "high":{
             "url":"https://i.ytimg.com/vi/SO1th-Oh39I/hqdefault.jpg",
             "width":480,
             "height":360
          }
       },
       "channelTitle":"Surfers of Hawaii",
       "liveBroadcastContent":"none",
       "publishTime":"2023-10-08T18:00:15Z"
    }
} as const;

export const getVideosResponseMock = {
    totalSize: 50,
    page: 1,
    size: 10,
    pageCount: 100,
    pages: 5,
    results: [videoMock]
}

export const getVideosResponseEmptyMock = {
    totalSize: 0,
    page: 1,
    size: 10,
    pageCount: 0,
    pages: 0,
    results: []
}