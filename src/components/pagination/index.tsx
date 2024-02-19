'use client'
import RightIcon from 'src/assets/icons/right_arrow.svg';
import LeftIcon from 'src/assets/icons/left_arrow.svg';
import { FC, useCallback, useState } from 'react';
import { classes } from 'src/common/helper';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

type PaginationProps = {
    count: number;
    onPageChange?: (page: number) => void;
    className?: string;
    size: number;

}
const Pagination: FC<PaginationProps> = ({onPageChange, count, size, className}) => {
    const pageClasses = classes(
        "flex items-center justify-center px-3 h-8 text-gray-500 border relative", 
        "bg-gray-800 border-gray-700 hover:bg-gray-700 hover:text-white"
    )
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const [clientWidth, setClientWidth] = useState(0);
    const pathname = usePathname();

    const createPageHref = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const previous = () => {
        const newPage = Math.max(currentPage - 1, 1);
        onPageChange?.(newPage)
    };

    const next = () => {
        const newPage = Math.min(currentPage + 1, size);
        onPageChange?.(newPage)
    };

    const handlePage = (page: number) => {
        onPageChange?.(page);
    };

    const onMounted = useCallback((element: HTMLDivElement) => {
        if(element?.parentElement) {
            setClientWidth(element.parentElement!.clientWidth)
            // setPagesPerView(Math.floor(element.parentElement!.clientWidth / 44) - 3)
        }
    }, [])

    if(!size) {
        return null;
    }

    return (
        <div className={classes(className)} ref={onMounted}>
            <div className={classes("flex text-sm", 'justify-center')}>
                <Link onClick={previous} href={createPageHref(Math.max(currentPage - 1, 1))}>
                <p className={classes(pageClasses, "rounded-s-lg")}>
                    <span className="sr-only">Previous</span>
                    <LeftIcon className="text-white" width={18} height={18}/>
                </p>
                </Link>
                {
                Array.from({ length: size }, (_, i) => (
                    <Link key={i} onClick={() => handlePage(i + 1)} href={createPageHref(i + 1)}>
                    <p className={classes(pageClasses, currentPage === i + 1 ? "text-white !bg-junky-green border-junky-green" : "")}>
                        {i + 1}
                    </p>
                    </Link>
                ))}
                <Link onClick={next} href={createPageHref(Math.min(currentPage + 1, size))}>
                    <p className={classes(pageClasses, "rounded-e-lg")}>
                        <span className="sr-only">Next</span>
                        <RightIcon className="text-white" width={18} height={18}/>
                    </p>
                </Link>
            </div>
        </div>
    )
}

export default Pagination;