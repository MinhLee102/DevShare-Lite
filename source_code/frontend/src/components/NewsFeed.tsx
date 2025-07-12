'use client'

import { useState, useRef, useCallback } from 'react';
import { getPosts } from '@/utils/api/post';
import Post from './Post';
import { PostType } from '@/types';
import { Loader } from 'lucide-react';

interface NewsFeedProps {
    initialPosts: PostType[];
    nextPage: number | null;
}

export default function NewsFeed({ initialPosts, nextPage }: NewsFeedProps) {
    const [posts, setPosts] = useState<PostType[]>(initialPosts);
    const [page, setPage] = useState<number | null>(nextPage);
    const [loading, setLoading] = useState(false);
  
    const observer = useRef<IntersectionObserver | null>(null);

    /**
     * Fetches the next page of posts from the API and appends them to the current list.
     */
    const loadMorePosts = useCallback(async () => {
        if (!page) 
            return; 
        
        setLoading(true);
        const data = await getPosts(page);

        setPosts(prevPosts => [...prevPosts, ...data.results]);
    
        // Updates the 'page' state by parsing the 'next' URL from the API response.
        if (data.next) {
            const nextUrl = new URL(data.next);
            const nextPage = nextUrl.searchParams.get('page');
            setPage(nextPage ? parseInt(nextPage) : null);
        } else {
            setPage(null); 
        }
        setLoading(false);
     }, [page]);


    /**
     * A callback ref attached to the last post in the list.
     * It uses the IntersectionObserver API to detect when the user has scrolled
     * to the bottom of the feed, triggering `loadMorePosts`.
     */
    const lastPostElementRef = useCallback(
      (node: HTMLDivElement) => {
        if (loading) 
          return;
        if (observer.current) 
          observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && page !== null) {
            loadMorePosts();
          }
        });
        
        if (node) observer.current.observe(node);
      },
      [loading, page, loadMorePosts]
    );

  return (
    <div className="space-y-6">
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <div ref={lastPostElementRef} key={post.id}>
              <Post post={post} />
            </div>
          );
        } else {
          return <Post key={post.id} post={post} />;
        }
      })}

      {loading && (
        <div className="flex justify-center items-center py-8">
          <Loader className="h-10 w-10 animate-spin text-cyan-500" />
        </div>
      )}
      
      {!loading && page === null && posts.length > 0 && (
         <p className="text-center text-gray-500 py-8">There is no more posts</p>
      )}
    </div>
  );
}