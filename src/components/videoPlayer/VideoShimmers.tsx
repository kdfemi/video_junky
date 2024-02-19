import { FC } from "react";
import { classes } from "src/common/helper"
import styles from "src/common/styles"

export const VideoDescriptionShimmer: FC = () => {
    return (
        <div className={classes('relative' )}>
            <div className={classes("h-6 mb-3 rounded", styles.shimAnimation)}/>
            <div className={classes("h-10 mb-6 rounded", styles.shimAnimation)}/>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div>
                        <div className={classes("w-6 h-6 rounded-sm", styles.shimAnimation)}/>
                    </div>
                    <div className={classes("w-8 h-3", styles.shimAnimation)} />
                </div>
                <div className={classes("w-8 h-3", styles.shimAnimation)} />
            </div>
        </div>
    )
} 

export const ControlShimmer: FC = () => {
    return (
        <div className={classes('relative flex items-center gap-x-2 mt-2' )}>
            <div className={classes("h-6 w-6 rounded", styles.shimAnimation)}/>
            <div className={classes("flex-1 h-2 rounded", styles.shimAnimation)}/>
        </div>
    );
}