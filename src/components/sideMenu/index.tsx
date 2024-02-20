'use client';
import { FC, PropsWithChildren, useEffect, useState} from "react";
import SearchInput from "../searchInput";
import { classes, isMobile } from "src/common/helper";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import CloseIcon from 'src/assets/icons/close.svg';
import VideoIcon from 'src/assets/icons/video.svg';

export type SideMenuProps = {
    /**
     * the user agent from header
     * we use the user agent to get the proper initial state for the side menu on mobile
     */
    userAgent?: string;
};

const SideMenu: FC<PropsWithChildren<SideMenuProps>> =  ({children, userAgent}) => {

    // check if request is made on mobile or pc in order the render the initial view correctly on server
    const isMobileScreen = isMobile(userAgent ?? '');
    const isLargeScreen = useMediaQuery("(min-width: 768px)", !isMobileScreen);
    const [visible, setVisible] = useState(!isMobileScreen)

    useEffect(() => {
        setVisible(isLargeScreen);
    }, [isLargeScreen])

    const onSelected = () => {
        if(!isLargeScreen) {
            setVisible(false);
        }
    };

    
    return (
        <div data-testid="sideMenu">
            <button className="flex gap-2 md:hidden mt-2 mb-4 bg-junky-yellow text-primary font-medium p-1 rounded-md items-center" onClick={() => setVisible(!visible)}>
                <VideoIcon width={24} height={24} className="inline"/>
                <span>Show Videos</span>
            </button>
            <aside 
                className={classes(
                "w-full md:max-w-[530px] md:pr-3 overflow-y-auto space-y-4 md:h-[calc(100vh-64px-2.5rem)] pb-5",
                "md:relative fixed right-0 bottom-0 top-0 px-4",
                "md:left-[unset] md:right-[unset] md:bottom-[unset] md:top-[unset] bg-primary z-40 transition-transform md:transition-none ease-in duration-500",
                "md:block", !visible ? 'translate-x-[-100vw]' : 'translate-x-0'
                )}
                onClick={onSelected}
            >
                <div className="sticky top-0 space-y-2 flex flex-col bg-primary pb-3 z-10 md:pt-0 pt-5 items-center gap-3" onClick={(e) => e.stopPropagation()}>
                    <div className="md:hidden self-end" role="button" aria-label="Close Menu" title="Close Menu" onClick={onSelected}>
                        <CloseIcon className="text-white"/>
                    </div>
                    <div className="w-full">
                        <SearchInput placeholder="Search Videos" />
                    </div>
                </div>
                {children}
            </aside>
        </div>
    );

};

export default SideMenu;