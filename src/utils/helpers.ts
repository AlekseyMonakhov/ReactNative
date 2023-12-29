import { IItem } from "@/types";

const PAGE_SIZE = 5;
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const getKey = (pageIndex: number, previousPageData: IItem[] | null) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end

    return `${apiUrl}/items?_page=${pageIndex + 1}&_limit=${PAGE_SIZE}`;
};
