'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Comment as CommentType } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { createComment } from '@/utils/api/comment';
import CommentInput from './Comment';
import CommentBox from './CommentBox';

interface CommentSectionProps {
  postId: number;
  initialComments: CommentType[];
}

export default function CommentSection({ postId, initialComments }: CommentSectionProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [comments, setComments] = useState(initialComments);
    const [replyingTo, setReplyingTo] = useState<number | null>(null); 
    const router = useRouter();
    const { user } = useAuth();

    const handleCreateComment = async (content: string) => {
        if (!user) {
            router.push('/login');
            return;
        }
        try {
            await createComment(postId, { content, parent: replyingTo });
            setReplyingTo(null);

            router.refresh(); 
        } catch (error) {
            console.error("Failed to post comment:", error);
        }
    };

     const commentCount = useMemo(() => {
        return comments.reduce((total, comment) => {
            return total + 1 + (comment.replies ? comment.replies.length : 0);
        }, 0); 
    }, [comments]);
    
    return (
        <section className="mt-12">
            <h2 className="text-2xl font-bold text-[#AD8989] mb-6">Comments ({commentCount})</h2>

            <div className="mb-8">
                <CommentInput onSubmit={handleCreateComment} />
                {replyingTo && (
                    <div className="text-xs mt-2 ml-4">
                        Replying to comment #{replyingTo}. 
                        <button onClick={() => setReplyingTo(null)} className="ml-2 text-red-500 font-bold">Cancel</button>
                    </div>
                )}
            </div>

            <div className="space-y-6">
                {comments.map(comment => (
                    <CommentBox key={comment.id} comment={comment} onReply={setReplyingTo} />
                ))}
            </div>
        </section>
    );
}