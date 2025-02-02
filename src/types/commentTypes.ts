
export interface Comment {
    id: string | number;
    content: string;
    date: string;
    likes: number;
    isLiked: boolean;
    author: {
      name: string;
      avatar: string;
    };
    replies?: Comment[];
    articleId?: number;
    parentId?: string | number;
  }