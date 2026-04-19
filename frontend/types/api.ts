export interface Review {
    id: number;
    [key: string]: unknown;
}

export interface Category {
    id: number;
    slug: string;
    name_en: string;
    name_ar: string;
    image?: string | null;
    icon_emoji?: string | null;
    [key: string]: unknown;
}

export interface Place {
    id: number;
    slug: string;
    title_en: string;
    title_ar: string;
    subtitle_en: string;
    subtitle_ar: string;
    description_en: string;
    description_ar: string;
    image1?: string | null;
    image2?: string | null;
    image3?: string | null;
    image4?: string | null;
    price?: string | null;
    average_rating?: number | null;
    reviews?: Review[];
    is_favorite?: boolean;
    latitude?: number | string | null;
    longitude?: number | string | null;
    opening_hours?: string | null;
    category?: number | string;
    category_slug?: string;
    category_name?: string;
    category_name_en?: string;
    category_name_ar?: string;
    [key: string]: unknown;
}
