export interface BaseApiResponse<T = unknown> {
    data: T;
    message: string;
    statusCode: number;
    success: boolean;
}

export interface PageData<T = unknown> extends PageDetails {
    results: Array<T>,
}

export interface PageDetails {
    page: number;
    size: number;
    pageCount: number;
    pages: number;
}