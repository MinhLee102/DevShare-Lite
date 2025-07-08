'use client'; // Đánh dấu đây là Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import PostForm, { PostFormData } from '@/components/PostForm';
import { updatePost } from '@/utils/api/post';
import { PostType } from '@/components/Post';
import Link from 'next/link';

interface EditPostProps {
  post: PostType; 
}

const EditPost = ({ post }: EditPostProps) => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      await updatePost(post.id, {
        title: data.title,
        content: data.content,
        tags: tagsArray,
      });
      router.push(`/posts/${post.id}`);
      router.refresh(); 
    } catch (err) {
      console.error(err);
      setError("Failed to update post. Please try again.");
      setIsSubmitting(false);
    }
  };


  if (authLoading) {
    return <div className="text-center p-12">Loading...</div>;
  }
 
  if (!user) {
    return (
      <div className="container mx-auto text-center p-12">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You must be logged in to edit this post.</p>
        <Link href={`/login?next=/posts/edit/${post.id}`} className="text-blue-600 hover:underline mt-4 inline-block">
          Log In to Continue
        </Link>
      </div>
    );
  }

      // In ra console của trình duyệt để xem chính xác giá trị và kiểu dữ liệu
  console.log('--- [AUTH CHECK] Edit Page ---');
  console.log('User ID from context:', user.id, `(type: ${typeof user.id})`);
  console.log('Post Author ID from props:', post.author.id, `(type: ${typeof post.author.id})`);
  console.log('-----------------------------');

  if (user.id !== post.author.id) {
    return <div className="text-center p-12">You are not authorized to edit this post.</div>;
  }


  const initialData: PostFormData = {
    title: post.title,
    content: post.content,
    tags: post.tags?.join(', ') || '', 
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <PostForm
        initialData={initialData}
        onSubmit={handleSubmit}
        buttonText="Update Post"
        isSubmitting={isSubmitting}
        error={error}
      />
    </div>
  );
};

export default EditPost;