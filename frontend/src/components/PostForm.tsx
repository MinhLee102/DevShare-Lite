import { useState, FormEvent, useEffect } from 'react';
import Button from './Button'; 

export interface PostFormData {
  title: string;
  content: string;
  tags: string; 
}

interface PostFormProps {
  initialData?: PostFormData;
  onSubmit: (data: PostFormData) => Promise<void>;
  buttonText: string;
  isSubmitting: boolean; 
  error: string | null; 
}

const PostForm = ({ initialData, onSubmit, buttonText, isSubmitting, error }: PostFormProps) => {
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    tags: '',
  });


  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown is supported)</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={12}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated, e.g., react, django, javascript)</label>
        <input
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., react, django, javascript"
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Submitting...' : buttonText}
      </Button>
    </form>
  );
};

export default PostForm;