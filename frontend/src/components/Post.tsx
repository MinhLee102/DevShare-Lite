import Link from "next/link";
import Picture from "./Picture";

export interface PostType {
    id: number;
    title: string;
    body: string;
    author: {
        username: string;
        avatar?: string;
    };
}

interface PostProps {
    post: PostType;
}

const Post = ({post}: PostProps) => {
    return (
        <Link href={`/posts/${post.id}`} className="block bg-white p-6 border-2 border-[#00C7B6] rounded-3xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <h2 className="text-xl font-bold text-black mb-2"> {post.title} </h2>
            
            <p className="text-[#AD8989] mb-4 line-clamp-6"> {post.body} </p>

            <div className="border-t border-gray-200 pt-3 flex items-center space-x-3">
                <div className="h-10 w-10">
                <Picture
                    url={post.author.avatar || '/user.png'} 
                    alt={post.author.username} 
                    width={40}
                    height={40} 
                    className="rounded-full object-cover" />
                </div>
                <span className="font-semibold text-[#AD8989]">{post.author.username}</span>
            </div>
        </Link>
    );
};

 export default Post;