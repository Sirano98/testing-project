import { IUser } from "./IUser";

export interface IResponse {
    data: IUser[],
    meta: {
        pagination: IPagination
    }
}

export interface IPagination {
    limit: number,
    links: {
        current: string,
        next: string | null,
        previous: string | null
    },
    page: number,
    pages: number,
    total: number
}