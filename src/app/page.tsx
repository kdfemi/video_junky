import Image from "next/image";
import Toolbar from "src/components/toolbar";
import VideoLists from "src/components/videoLists";
import VideoPlayerView from "src/components/videoPlayerView";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* TOOLBAR */}
      <Toolbar />
      <div className="flex px-6 pt-10 flex-1 items-stretch">
        {/* SIDE MENU */}
        <VideoLists/>
        {/* MAIN */}
        <VideoPlayerView/>
      </div>
    </main>
  );
}
