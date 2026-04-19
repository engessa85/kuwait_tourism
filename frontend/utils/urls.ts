const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

export const API_BASE_URL =
    trimTrailingSlash(process.env.NEXT_PUBLIC_API_BASE_URL || '/api');

export const MEDIA_BASE_URL = trimTrailingSlash(
    process.env.NEXT_PUBLIC_MEDIA_BASE_URL || ''
);

export const buildMediaUrl = (path?: string | null) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }
    return `${MEDIA_BASE_URL}${path}`;
};
