import { getPostById } from "@/utils/api/post";
import SideBar from "@/components/SideBar";
import SearchBar from "@/components/SearchBar";
import Picture from "@/components/Picture"; 
import ReactMarkdown from 'react-markdown'; 
import { notFound } from 'next/navigation'; 

interface PostDetailsProps {
    params: {
        id: string;
    };
}

export default async function PostDetails({params}: PostDetailsProps) {
    const {id} = params;
    const post = await getPostById(id);

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
          <h1 className="text-3xl font-bold text-black mb-4">{post.title}</h1>
          
          <div className="prose lg:prose-lg max-w-none text-gray-800 mb-8">
             <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
          
          <hr className="border-dashed border-gray-300 my-6" />

          <div className="flex items-center space-x-4">
            <div className="relative h-12 w-12">
                <Picture
                    url={post.author.avatar || '/user.png'} 
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
            <h2 className="text-2xl font-bold text-gray-500 mb-6">Comments</h2>
        </section>
      </main>
    </div>
  );
};

     