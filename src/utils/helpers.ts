import { IItem } from "@/types";
import { decode as base64_decode } from "base-64";

const PAGE_SIZE = 5;
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export function getKey(pageIndex: number, previousPageData: IItem[] | null) {
    if (previousPageData && !previousPageData.length) return null; // reached the end

    return `${apiUrl}/items?_page=${pageIndex + 1}&_limit=${PAGE_SIZE}`;
}

export function parseJwt<T>(token: string | null): T {
    if (!token) throw new Error("No token provided");

    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            base64_decode(base64)
                .split("")
                .map(function (c) {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );

        return JSON.parse(jsonPayload);
    } catch (e) {
        throw new Error("Invalid token");
    }
}
