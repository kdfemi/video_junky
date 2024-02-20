import Link from "next/link";
import { ComponentProps, FC } from "react";
import { classes } from "src/common/helper";
import navMenus from "src/constants/navMenus";

export type ToolbarProps = {} & ComponentProps<'header'>;

const Toolbar: FC<ToolbarProps> = ({className, ...props}) => {
    return (
        <header {...props} className={classes("flex items-center pt-8 px-6 gap-x-6 justify-between", className)} data-testid="toolbar">
            <div className="text-2xl bg-logo-gradient block text-transparent bg-clip-text font-roboto font-bold">
                JUnkie
            </div>
            <nav className="flex items-center nav">
                <ul className={classes(
                    "flex items-center justify-center gap-x-6 text-base",
                    "max-md:hidden font-roboto"
                )}>
                    {navMenus.map((navMenu) => (
                        <Link key={navMenu.id} href="#" className="nav__item"> {navMenu.name}</Link>
                    ))}
                </ul>
            </nav>
            <div>
                <div className="w-5 h-5 rounded-sm bg-gradient-conic to-junky-green from-junky-yellow"/>
            </div>
        </header>
    )
};

export default Toolbar;