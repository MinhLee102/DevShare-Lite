import Sidebar from '@/components/SideBar';
import SearchBar from '@/components/SearchBar';
import NewsFeed from '@/components/NewsFeed';
import { getPosts } from '@/utils/api/post';
import { PostType } from '@/types';

const sanitizePost = (post: unknown): PostType => {
 const rawData = post as {
    id: number;
    title: string;
    content: string;
    author: {
      id: number;
      username: string;
      bio?: string;
      profile_image?: string | null;
    };
    tags?: string[]
    created_at: string;
    updated_at: string;
    status: 'DR' | 'PB';
  };

  return {
    id: rawData.id,
    title: rawData.title,
    content: rawData.content,
    author: {
      id: Number(rawData.author.id),
      username: rawData.author.username,
      bio: rawData.author.bio || undefined,
      profile_image: rawData.author.profile_image || null,
    },
    tags: rawData.tags || undefined,
    created_at: String(rawData.created_at),
    updated_at: String(rawData.updated_at),
    status: rawData.status
  };
};

export default async function Homepage() {
  let initialPosts: PostType[] = [];
  let nextPage: number | null = null;

  try {
    const initialData = await getPosts(1);
    
    if (initialData && Array.isArray(initialData.results)) {
      initialPosts = initialData.results.map(sanitizePost);
    }

    if (initialData && typeof initialData.next === 'string') {
      const nextUrl = new URL(initialData.next);
      const nextPageParam = nextUrl.searchParams.get('page');
      nextPage = nextPageParam ? parseInt(nextPageParam, 10) : null;
    }
  } catch (error) {
    console.error("Failed to fetch initial posts on server:", error);
  }

  return (
      <div className="container mx-auto px-6 py-6 flex items-start gap-8">
        <Sidebar />

      <main className="pl-72 pr-8 py-6">
        <div className="mb-8">
          <SearchBar />
        </div>
          <div className="mt-2">
            <NewsFeed initialPosts={initialPosts} nextPage={nextPage} />
          </div>
      </main>
    </div>
  );
};