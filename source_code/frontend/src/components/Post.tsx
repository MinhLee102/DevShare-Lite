'use client'

import Link from "next/link";
import Picture from "./Picture";
import ReactMarkdown from 'react-markdown';
import { PostType } from "@/types";

interface PostProps {
    post: PostType;
    href?: string;
}

const Post = ({post, href }: PostProps) => {

    const finalLink = href || `/posts/${post.id}`;

    return (
        <div className="group relative block bg-white p-6 border-2 border-[#00C7B6] rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-bold text-black mb-2 group-hover:text-[#00C7B6] transition-colors">
                {post.title}
            </h2>
            
            <div className="text-[#AD8989] mb-4 line-clamp-6 z-10 relative"> 
                <ReactMarkdown
                    components={{
                        a: ({ ...props }) => {
                            return (
                                <a 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    {...props} 
                                    className="text-blue-600 hover:underline" 
                                />
                            );
                        }
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </div>

            <div className="border-t border-gray-200 pt-3 flex items-center space-x-3">
                <div className="h-10 w-10">
                <Picture
                    url={post.author.profile_image || '/user.png'} 
                    alt={post.author.username} 
                    width={40}
                    height={40} 
                    className="rounded-full object-cover" />
                </div>
                <span className="font-semibold text-[#AD8989]">{post.author.username}</span>
            </div>

            <Link href={finalLink} className="absolute inset-0 z-0" aria-label={`View post: ${post.title}`}></Link>
        </div>
    );
};

 export default Post;

 