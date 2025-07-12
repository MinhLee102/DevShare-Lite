
/**
 * Represents the structure of an Author or a logged-in User.
 */
export interface Author {
  id: number;
  username: string;
  email?: string; 
  bio?: string | null;
  profile_image: string | null; 
}

export type User = Author;

/**
 * Represents the complete data structure for the user profile page,
 * including user info and their published posts.
 */
export interface UserProfile {
  profile: User;
  drafts: PostType[];
  published_posts: PostType[];
}

/**
 * Represents the structure of a single blog post.
 */
export interface PostType {
    id: number;
    title: string;
    content: string;
    author: Author;
    tags?: string[]
    created_at: string;
    updated_at: string;
    status: 'DR' | 'PB';
}

/**
 * Represents a nested reply to a parent comment.
 * It does not have its own `replies` array.
 */
export interface Reply {
    id: number;
    commenter: Author;
    content: string;
    created_at: string;
}

/**
 * Represents a top-level comment, which can contain an array of replies.
 */
export interface Comment {
    id: number;
    commenter: Author;
    content: string;
    created_at: string;
    replies: Reply[];
}

