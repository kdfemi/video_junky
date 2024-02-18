import RightIcon from 'src/assets/icons/right_arrow.svg';
import LeftIcon from 'src/assets/icons/left_arrow.svg';
import { FC, useCallback, useState } from 'react';
import { classes } from 'src/common/helper';

type PaginationProps = {
    initialPage: number;
    count: number;
    onPageChange?: (page: number) => void;
    className?: string;
    size: number;

}
const Pagination: FC<PaginationProps> = ({initialPage, onPageChange, count, size, className}) => {
    const pageClasses = classes(
        "flex items-center justify-center px-3 h-8 text-gray-500 border relative", 
        "bg-gray-800 border-gray-700 hover:bg-gray-700 hover:text-white"
    )
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [clientWidth, setClientWidth] = useState(0);
    const [_pagesPerView, setPagesPerView] = useState(0)
    console.log(currentPage)

    const previous = () => {
        const newPage = Math.max(currentPage - 1, 1);
        setCurrentPage(newPage)
        onPageChange?.(newPage)
    };

    const next = () => {
        const newPage = Math.min(currentPage + 1, size);
        setCurrentPage(newPage)
        onPageChange?.(newPage)
    };

    const handlePage = (page: number) => {
        setCurrentPage(page);
        onPageChange?.(page);
    };

    const onMounted = useCallback((element: HTMLDivElement) => {
        if(element.parentElement) {
            setClientWidth(element.parentElement!.clientWidth)
            setPagesPerView(Math.floor(element.parentElement!.clientWidth / 44) - 3)
        }
    }, [])

    if(!size) {
        return null;
    }

    return (
        <div className={className} ref={onMounted}>
            {clientWidth && (
                <ul className={classes("flex text-sm")}>
                    <li onClick={previous}>
                    <p className={classes(pageClasses, "rounded-s-lg")}>
                        <span className="sr-only">Previous</span>
                        <LeftIcon className="text-white" width={18} height={18}/>
                    </p>
                    </li>
                    {
                    Array.from({ length: size }, (_, i) => (
                        <li key={i} onClick={() => handlePage(i + 1)}>
                        <p className={classes(pageClasses, currentPage === i + 1 ? "text-white !bg-junky-green border-junky-green" : "")}>
                            {i + 1}
                        </p>
                        </li>
                    ))}
                    <li onClick={next}>
                    <p className={classes(pageClasses, "rounded-e-lg")}>
                        <span className="sr-only">Next</span>
                        <RightIcon className="text-white" width={18} height={18}/>
                    </p>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default Pagination;