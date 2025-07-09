'use client';
import { useState } from 'react';
import { SendHorizonal } from 'lucide-react';

interface CommentProps {
  onSubmit: (content: string) => Promise<void>;
}

export default function CommentInput({ onSubmit }: CommentProps) {
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;
        
        setIsSubmitting(true);
        await onSubmit(content);
        setContent(''); 
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-4 bg-white p-2 border-2 border-[#00C7B6] rounded-full shadow-sm">
            <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a comment..."
                className="flex-grow bg-transparent px-4 py-1 focus:outline-none"
                disabled={isSubmitting}
            />
            <button type="submit" disabled={isSubmitting} className="p-2 text-gray-500 hover:text-cyan-500 disabled:text-gray-300">
                <SendHorizonal />
            </button>
        </form>
    );
}