import 'server-only';
import { NextResponse } from "next/server";

export const DEFAULT_PAGE = 1;

export const DEFAULT_PAGE_SIZE = 10;

type ResponseDatatype = string | number | Record<string, any> | Array<string | number | Record<string, any>>;

/**
 * JunkyResponseProp is the standard response body sent to the frontend
 */
export interface JunkyResponseProp {
    /**
     * Response message
     */
    message: string;
    /**
     * HTTP status code
     */
    status: number;
    /**
     * Response data
     */
    data?: ResponseDatatype;
    /**
     * Response header
     */
    headers?: HeadersInit;
}

/**
 * Handles common operations on response sent to the frontend
 */
export class JunkyResponse {

    static getResponse({
        message, 
        status, 
        data,
        headers
    }: JunkyResponseProp) {
        const httpStatusCode = status;
        const isSuccess = httpStatusCode >= 200 && httpStatusCode <= 299;
        return NextResponse.json({
            data,
            message,
            statusCode: httpStatusCode,
            success: isSuccess,
        }, {status: httpStatusCode, headers, })
    }
}

/**
 * Abstract All Paginated logic
 */
export class JunkyPaginatedResponse<T = Array<any>> {
    /**
     * The current page
     */
    readonly page: number;
    /**
     * Request page size
     */
    readonly size: number;
    /**
     * the paginated result
     */
    readonly result: Array<T>;
    /**
     * The total size of data irrespective of page or page size
     */
    readonly totalSize: number;
    /**
     * Number of items in the current page
     */
    readonly pageCount: number;
    /**
     * Total pages available. This depends on size
     */
    readonly pages: number;
    /**
     * current page last index
     */
    readonly limit: number;

    constructor (page: number, size: number, result: Array<T>, totalSize: number) {
        const _page = JunkyPaginatedResponse.fixWrongPage(page);
        this.page = JunkyPaginatedResponse.fixWrongPage(_page);
        this.size = size;
        this.result = result;
        this.totalSize = totalSize;
        this.limit = JunkyPaginatedResponse.getLimit(_page, size);
        this.pageCount = Math.ceil(result.length / _page * size);
        this.pages = Math.ceil(totalSize / size);
    }

    /**
     * Handles common operations on response sent to the frontend
     */
    getResponse(props: Omit<JunkyResponseProp, 'data'>) {
        return JunkyResponse.getResponse({
            ...props,
            data: {
                results: this.result,
                ...this.getPaginationProps(),
            }
        })
    }

    /**
     * returns pagination property
     */
    getPaginationProps() {
        return {
            page: this.page,
            size: this.size,
            pageCount: this.pageCount,
            pages: this.pages
        }
    }

    /**
     * Calculate a page last index
     * @param page current Page
     * @param size size of page
     * @returns returns the last index of a page
     */
    static getLimit(page: number, size: number) {
        return JunkyPaginatedResponse.fixWrongPage(page) * size;
    }

    /**
     * Calculate Page index if page is less than 1 the first page index will be returned
     * @param page Page to get fetch
     * @param size size of page
     * @returns index of the page
     */
    static getPageStart(page: number, size: number) {
        let start = JunkyPaginatedResponse.fixWrongPage(page) - 1;
        if(start < 0) {
            start = 0;
        }
        return start * size;
    }

    /**
     * Enforce minimum page 
     * @param page the page
     * @returns the correct page;
     */
    private static fixWrongPage = (page: number) => {
        if(page < 1) {
            return 1;
        }
        return page;
    }
}