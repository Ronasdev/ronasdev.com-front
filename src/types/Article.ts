export interface Article {
    id?: number;
    title: string;
    slug?: string;
    content: string;
    excerpt?: string;
    featured_image?: string | null;
    status: 'draft' | 'published';
    author_id: number;
    created_at?: string;
    updated_at?: string;
    categories?: number[];
}

export interface ArticleResponse {
    status: string;
    data: Article | Article[];
}
