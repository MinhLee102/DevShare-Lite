import { getPostById } from "@/utils/api/post";
import SideBar from "@/components/SideBar";
import SearchBar from "@/components/SearchBar";
import Picture from "@/components/Picture"; 
import ReactMarkdown from 'react-markdown'; 
import { notFound } from 'next/navigation'; 
import PostActions from "@/components/PostAction";
import { getCommentsForPost } from "@/utils/api/comment"; 
import CommentSection from "@/components/CommentSection";

interface PostDetailsProps {
    params: {
        id: string;
    };
}

export default async function PostDetails({params}: PostDetailsProps) {
    const {id} = params;

    // Fetch post data and comments in parallel to reduce waterfalls.
     const [post, comments] = await Promise.all([
        getPostById(id),
        getCommentsForPost(id)
    ]);
    

    // If the post doesn't exist, render a 404 page.
    if (!post)
        notFound();

     return (
    <div className="container mx-auto px-6 py-6 grid grid-cols-[280px_1fr] gap-8">
      <div>
        <SideBar />
      </div>

      <main className="w-full space-y-8">
        <SearchBar />

        <article className="bg-white p-8 border-2 border-[#00C7B6] rounded-3xl shadow-lg">
         
          <div className="flex justify-between items-start mb-6 gap-4">
            <h1 className="text-3xl font-bold text-black mb-4">{post.title}</h1>

            {/* PostActions handles user-specific actions. */}
            <PostActions post={post} />
          </div>

          <div className="prose lg:prose-lg max-w-none text-gray-800 mb-8">
             <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
          
          <hr className="border-dashed border-gray-300 my-6" />

          <div className="flex items-center space-x-4">
            <div className="relative h-12 w-12">
                <Picture
                    url={post.author.profile_image || '/user.png'} 
                    alt={post.author.username} 
                    width={48}
                    height={48} 
                    className="rounded-full object-cover" 
                />
            </div>
            <div>
                <p className="font-semibold text-[#AD8989]">{post.author.username}</p>
            </div>
          </div>
        </article>

        {/*Comment Section */}
        <section className="bg-transparent p-4">
            <CommentSection postId={post.id} initialComments={comments} />
        </section>
      </main>
    </div>
  );
};

     