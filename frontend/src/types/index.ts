export interface Author {
  id: number;
  username: string;
  email?: string; 
  bio?: string | null;
  profile_image: string | null; 
}

export type User = Author;

export interface PostType {
    id: number;
    title: string;
    content: string;
    author: Author;
    tags?: string[]
    created_at: string;
    updated_at: string;
}

export interface Reply {
    id: number;
    commenter: Author;
    content: string;
    created_at: string;
}

export interface Comment {
    id: number;
    commenter: Author;
    content: string;
    created_at: string;
    replies: Reply[];
}

