import { Suspense } from "react";
import { classes } from "src/common/helper";
import SidebarLoader from "src/components/loader/SidebarLoader";
import Toolbar from "src/components/toolbar";
import VideoLists from "src/components/videoLists";
import { GetVideosRequestParams } from "src/types/VideoService.model";
import { getVideos } from "./api/actions";
import VideoPlayer from "src/components/videoPlayer";

type PageProps = {
  searchParams: GetVideosRequestParams
};

export default async function Home({searchParams}: PageProps) {
  const page = Number(searchParams?.page) || 1;
  const search = searchParams?.search || '';

  const response =  getVideos({
    page: searchParams.page, search: searchParams.search, size: searchParams.size ?? 10
  });
// const {results, page, pageCount, pages, size} = response;

  return (
    <main className="min-h-screen flex flex-col pb-4">
      {/* TOOLBAR */}
      <Toolbar />
      <div className="md:flex px-6 pt-3 flex-1 items-stretch relative">
        {/* SIDE MENU */}
          <Suspense fallback={<SidebarLoader/>} key={page + search}>
            <VideoLists result={response} />
          </Suspense>
        {/* MAIN */}
        <section className={classes(
            "max-w-full md:max-w-[90%] w-[940px] mx-auto", 
            "flex flex-col justify-center items-center mt-3 md:mt-0")}
        >
          <VideoPlayer />
        </section>
      </div>
    </main>
  );
}
