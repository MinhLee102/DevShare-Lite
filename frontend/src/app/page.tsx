import Sidebar from '@/components/SideBar';
import SearchBar from '@/components/SearchBar';
import NewsFeed from '@/components/NewsFeed';
import { getPosts } from '@/utils/api/post';

export default async function Homepage() {
  const initialData = await getPosts(1);
  const initialPosts = initialData.results || [];
  let nextPage = null;
  if (initialData.next) {
    const nextUrl = new URL(initialData.next);
    const nextPageParam = nextUrl.searchParams.get('page');
    nextPage = nextPageParam ? parseInt(nextPageParam) : null;
  }

  return (
      <div className= "relative">
        <Sidebar />

      <main className="pl-72 pr-8 py-6">
        <div className="mb-8">
          <SearchBar />
        </div>

        <NewsFeed initialPosts={initialPosts} nextPage={nextPage} />
      </main>
    </div>
  );
};