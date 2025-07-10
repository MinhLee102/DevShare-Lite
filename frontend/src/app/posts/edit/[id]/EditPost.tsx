'use client'; // Đánh dấu đây là Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import PostForm, { PostFormData } from '@/components/PostForm';
import { updatePost, publishPost } from '@/utils/api/post';
import { PostType } from '@/types';
import Link from 'next/link';
import Button from '@/components/Button';

interface EditPostProps {
  post: PostType; 
}

const EditPost = ({ post }: EditPostProps) => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  const [formData, setFormData] = useState<PostFormData>({
    title: post.title,
    content: post.content,
    tags: post.tags?.join(', ') || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSaveChanges = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      await updatePost(post.id, {
        title: formData.title,
        content: formData.content,
        tags: tagsArray,
      });
      alert('Changes saved!');
      router.push(`/posts/${post.id}`);    
    } catch (err) {
      setError('Failed to save changes.');
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await publishPost(post.id);
      router.push(`/posts/${post.id}`);
    } catch (err) {
      setError('Failed to publish post.');
      console.log(err);
    } finally {
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

  if (user.id !== post.author.id) {
    return <div className="text-center p-12">You are not authorized to edit this post.</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      {error && <p className="text-red-500 bg-red-100 p-2 rounded mb-4">{error}</p>}
      
      <PostForm
        initialData={formData}
        onFormDataChange={setFormData}
      />
      
      <div className="mt-6 flex justify-end gap-4">
        <Button
          onClick={handleSaveChanges}
          disabled={isSubmitting}
          className="w-auto bg-[#6EADFF] hover:bg-blue-500"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>

        {post.status === 'DR' && (
          <Button
            onClick={handlePublish}
            disabled={isSubmitting}
            className="w-auto bg-[#6EADFF] hover:bg-blue-500"
          >
            {isSubmitting ? 'Publishing...' : 'Publish'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditPost;

 