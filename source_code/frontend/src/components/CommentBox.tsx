'use client';
import { Comment, Reply } from '@/types';
import Picture from './Picture';

interface CommentBoxProps {
  comment: Comment;
  onReply: (commentId: number) => void;
}


const defaultAuthor = { id: -1, username: 'Anonymous', profile_image: null };

export default function CommentBox({ comment, onReply }: CommentBoxProps) {
    if (!comment) {
        return null;
    }

    const author = comment.commenter || defaultAuthor; 
  return (
    <div className="flex flex-col">
        <div className="flex items-start gap-4">
            <div className="flex-grow bg-white p-4 border-2 border-[#00C7B6] rounded-2xl">
                <p className="text-sm">{comment.content}</p>
                <div className="flex justify-end items-center mt-2">
                    <Picture url={author.profile_image || '/user.png'} width={24} height={24} alt="" className="rounded-full" />
                    <p className="ml-2 text-xs font-semibold">{author.username}</p>
                </div>
            </div>
            <button onClick={() => onReply(comment.id)} className="text-xs font-semibold text-gray-600 hover:underline flex-shrink-0 mt-2">
                Reply
            </button>
        </div>
        
{comment.replies && comment.replies.length > 0 && (
                <div className="ml-12 mt-4 space-y-4">
                    {comment.replies.map((reply: Reply) => {
                        if (!reply) return null;

                        const commenter = reply.commenter || defaultAuthor;

                        return (
                            <div key={reply.id} className="flex items-start gap-4">
                                <div className="flex-grow bg-white p-4 border-2 border-[#00C7B6] rounded-2xl">
                                   <p className="text-sm">{reply.content}</p>
                                   <div className="flex justify-end items-center mt-2">
                                       <Picture 
                                            url={commenter.profile_image || '/user.png'} 
                                            width={24} height={24} 
                                            alt={commenter.username} 
                                            className="rounded-full object-cover" 
                                        />
                                       <p className="ml-2 text-xs font-semibold">{commenter.username}</p>
                                   </div>
                                </div>
                                <button onClick={() => onReply(comment.id)} className="text-xs font-semibold text-gray-600 hover:underline flex-shrink-0 mt-2">
                                   Reply
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
  );
}