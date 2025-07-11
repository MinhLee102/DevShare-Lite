
export interface PostFormData {
  title: string;
  content: string;
  tags: string; 
}

interface PostFormProps {
  initialData: PostFormData;
  onFormDataChange: (data: PostFormData) => void;
}

const PostForm = ({ initialData, onFormDataChange }: PostFormProps) => {
  
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onFormDataChange({ ...initialData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          id="title"
          name="title"
          value={initialData.title} 
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
          value={initialData.content} 
          onChange={handleChange}
          rows={12}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
        <input
          id="tags"
          name="tags"
          value={initialData.tags} 
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., react, django"
        />
      </div>
    </div>
  );
};

export default PostForm;