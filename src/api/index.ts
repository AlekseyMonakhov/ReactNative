export const fetcher = (url: string, config?: RequestInit | undefined) =>
    fetch(url, config).then((res) => {
        if (res.status === 401) {
            throw new Error("Unauthorized");
        } else if (res.status === 404) {
            throw new Error("Not found");
        } else {
            return res.json();
        }
    });
