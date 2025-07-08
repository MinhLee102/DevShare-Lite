'use client'

import { useState, useRef, useEffect, useCallback } from 'react';
import { getPosts } from '@/utils/api/post';
import Post, { PostType } from './Post';
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

    const loadMorePosts = useCallback(async () => {
        if (!page) 
            return; 
        
        setLoading(true);
        const data = await getPosts(page);

        setPosts(prevPosts => [...prevPosts, ...data.results]);
    
        if (data.next) {
            const nextUrl = new URL(data.next);
            const nextPage = nextUrl.searchParams.get('page');
            setPage(nextPage ? parseInt(nextPage) : null);
        } else {
            setPage(null); 
        }
        setLoading(false);
  }, [page]);

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

   useEffect(() => {
        console.log('[CLIENT - NewsFeed] Received initial posts:', initialPosts);
    }, [initialPosts]);

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