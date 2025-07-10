'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import PostForm, { PostFormData } from '@/components/PostForm';
import { createPost } from '@/utils/api/post';
import Link from 'next/link';
import Button from '@/components/Button';

const CreatePost = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth(); 
  
  const [formData, setFormData] = useState<PostFormData>({ title: '', content: '', tags: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (status: 'DR' | 'PB') => {
    setIsSubmitting(true);
    setError(null);
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      const newPost = await createPost({
        title: formData.title,
        content: formData.content,
        tags: tagsArray,
        status: status, 
      });
      
      router.push(`/posts/${newPost.id}`);
  
    } catch (err) {
      console.error(err);
      setError("Failed to save post. Please try again.");
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
      
      {error && <p className="text-red-500 bg-red-100 p-2 rounded mb-4">{error}</p>}

      <PostForm
        initialData={formData}
        onFormDataChange={setFormData}
      />

      <div className="mt-6 flex justify-end gap-4">
        <Button
          onClick={() => handleSubmit('DR')} 
          disabled={isSubmitting}
          className="w-auto bg-[#6EADFF] hover:bg-blue-500"
        >
          {isSubmitting ? 'Saving...' : 'Save Draft'}
        </Button>
        <Button
          onClick={() => handleSubmit('PB')} 
          disabled={isSubmitting}
          className="w-auto bg-[#6EADFF] hover:bg-blue-500"
        >
          {isSubmitting ? 'Publishing...' : 'Publish'}
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;