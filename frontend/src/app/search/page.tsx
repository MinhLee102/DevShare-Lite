import Post from '@/components/Post';
import { searchPosts } from '@/utils/api/post';
import SideBar from '@/components/SideBar'; 
import SearchBar from '@/components/SearchBar'; 
import { Suspense } from 'react';
import { PostType } from '@/types';

async function SearchResults({ query }: { query: string }) {
    const posts = await searchPosts(query);
    return (
        <div className="space-y-6">
            {posts.length > 0 
                ? posts.map((post: PostType) => <Post key={post.id} post={post} />)
                :<p className="text-center text-[#AD8989]" >{`No results found for "${query}".`}</p>
            }
        </div>
    );
}

export default function SearchPage({ searchParams }: { searchParams?: { q?: string } }) {
    const query = searchParams?.q || '';

    return (
        <div className="container mx-auto px-6 py-6 flex items-start gap-8">
            <div className="w-64 flex-shrink-0">
                <aside className="sticky top-24"><SideBar /></aside>
            </div>
            <main className="flex-1 min-w-0">
                <div className="sticky top-24 z-4 pb-6 -mt-1 pt-1">
                    <SearchBar />
                </div>
                <div className="mt-2">
                    <h1 className="text-2xl font-bold mb-6">Search Results:</h1>
                    <Suspense fallback={<div>Loading...</div>}>
                        <SearchResults query={query} />
                    </Suspense>
                </div>
            </main>
        </div>
    );
}