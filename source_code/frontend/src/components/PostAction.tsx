'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { PostType } from '@/types';
import Picture from './Picture';
import { deletePost } from '@/utils/api/post';
import { useRouter } from 'next/navigation'; 
import { Trash2, Loader2 } from 'lucide-react'; 

interface PostActionsProps {
  post: PostType;
}

const PostActions = ({ post }: PostActionsProps) => {
  const { user, loading} = useAuth();
  const router = useRouter(); 
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // This check prevents rendering before the user's auth state is confirmed.
  if (loading) {
    return <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse"></div>;
  }

  // Determine if the current user is the author of the post.
  const isAuthor = user && user.id === post.author.id;


  /**
   * Handles the post deletion, including a confirmation dialog.
   */
  const handleDelete = async () => {
    // A simple browser confirm to prevent accidental deletion.
    const confirmed = window.confirm('Are you sure you want to delete this post? This action cannot be undone.');

    if (!confirmed) {
      return; 
    }

    setIsDeleting(true);
    setError(null);

    try {
      await deletePost(post.id);

      router.push('/');
      router.refresh(); 
    } catch (err) {
      console.error("Failed to delete post:", err);
      setError("Could not delete the post. Please try again.");
      setIsDeleting(false);
    }
  };

  // Do not render anything if the user is not the author.
  if (!isAuthor) {
    return null;
  }

 return (
    <div className="flex-shrink-0 flex items-center gap-2">
      <Link href={`/posts/edit/${post.id}`} className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-black bg-gray-300 hover:bg-gray-400 rounded-lg transition-colors">
          <Picture url="/edit.png" width={24} height={24} alt="Edit Button" />
          <span>Edit</span>
      </Link>

      <button
        onClick={handleDelete}
        disabled={isDeleting} 
        className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:bg-red-400 disabled:cursor-not-allowed"
      >
        {isDeleting ? (
          <Loader2 size={16} className="animate-spin" /> 
        ) : (
          <Trash2 size={16} /> 
        )}
        <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
      </button>

      {error && <p className="text-xs text-red-500 ml-2">{error}</p>}
    </div>
  );
};
export default PostActions;