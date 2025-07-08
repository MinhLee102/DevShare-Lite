import { getPostById } from "@/utils/api/post";
import { notFound } from "next/navigation";
import EditPost from "./EditPost"; 

export const dynamic = 'force-dynamic';

interface EditPostPageProps {
  params: { id: string };
}

export default async function EditPostPage({ params }: EditPostPageProps)  {
    const { id } = await params;
    const post = await getPostById(id);

  if (!post) {
    notFound(); 
  }

  return <EditPost post={post} />;
}