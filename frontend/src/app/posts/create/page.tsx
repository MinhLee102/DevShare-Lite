'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import PostForm, { PostFormData } from '@/components/PostForm';
import { createPost } from '@/utils/api/post';
import Link from 'next/link';

const CreatePost = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth(); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const tagsArray = data.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      const newPost = await createPost({
        title: data.title,
        content: data.content,
        tags: tagsArray,
      });
      router.push(`/posts/${newPost.id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to create post. Please check your input and try again.");
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
        <p>You must be logged in to create a post.</p>
        <Link href="/login?next=/posts/create" className="text-blue-600 hover:underline mt-4 inline-block">
          Log In to Continue
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <PostForm
        onSubmit={handleSubmit}
        buttonText="Create Post"
        isSubmitting={isSubmitting}
        error={error}
      />
    </div>
  );
};

export default CreatePost;