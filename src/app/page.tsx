import { classes } from "src/common/helper";
import Toolbar from "src/components/toolbar";
import SideMenu from "src/components/sideMenu";
import { GetVideosRequestParams } from "src/types/VideoService.model";
import { getVideos } from "./api/actions";
import VideoPlayer from "src/components/videoPlayer";
import VideoList from "src/components/sideMenu/VideoList";
import { headers } from "next/headers";

type PageProps = {
  searchParams: GetVideosRequestParams
};

export default async function Home({searchParams}: PageProps) {
  const page = Number(searchParams?.page) || 1;
  const search = searchParams?.search || '';
  const size = Number(searchParams?.size) || 10;

  return (
    <main className="min-h-screen flex flex-col pb-4">
      {/* TOOLBAR */}
      <Toolbar />
      <div className="md:flex px-6 pt-3 flex-1 items-stretch relative">
        {/* SIDE MENU */}
            <SideMenu userAgent={headers().get('user-agent') as string}>
              <VideoList params={{page: page, search: search, size}}/>
            </SideMenu>
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
