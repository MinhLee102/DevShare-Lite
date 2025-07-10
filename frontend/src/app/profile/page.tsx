'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getProfile } from '@/utils/api/user';
import { PostType } from '@/types';
import Post from '@/components/Post';
import SideBar from '@/components/SideBar';
import Picture from '@/components/Picture';
import Link from 'next/link';
import { UserProfile } from '@/types';


export default function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const [data, setData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getProfile().then(profileData => {
                setData(profileData);
                setLoading(false);
            });
        }
        if (!authLoading && !user) {
            setLoading(false);
        }
    }, [user, authLoading]);
    
    if (authLoading || loading) return <div className="text-center p-12">Loading Profile...</div>;
    if (!user || !data) return <div className="text-center p-12">Please log in to see your profile.</div>;
    
    const { profile, published_posts, drafts } = data;

    return (
        <div className="container mx-auto px-6 py-6 flex items-start gap-8">
            <div className="w-64 flex-shrink-0">
                <aside className="sticky top-24"><SideBar /></aside>
            </div>
            <main className="flex-1 min-w-0 space-y-8">

                <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-[#00C7B6]">
                    <div className="flex flex-col sm:flex-row items-center gap-8">
                        <Picture url={profile.profile_image || '/user.png'} width={128} height={128} className="rounded-full" />
                        <div className="flex-1 space-y-2 w-full">
                           <p><span className="font-semibold">Username:</span> {profile.username}</p>
                           <p><span className="font-semibold">Email:</span> {profile.email}</p>
                           <textarea placeholder="Your bio here..." defaultValue={profile.bio ?? ''} className="w-full p-2 border rounded mt-2"/>
                           <button className="bg-blue-600 text-white px-4 py-2 rounded">Save Profile</button>
                        </div>
                    </div>
                </div>

                {drafts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">My Drafts</h2>
                        <div className="space-y-6">
                            {drafts.map((post: PostType) => (
                               <Link key={post.id} href={`/posts/edit/${post.id}`}>
                                    <Post post={post} />
                               </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <h2 className="text-2xl font-bold mb-4">My Posts</h2>
                    <div className="space-y-6">
                       {published_posts.length > 0 
                            ? published_posts.map((post: PostType) => <Post key={post.id} post={post} />)
                            : <p className="text-gray-500">No posts yet.</p>
                       }
                    </div>
                </div>
            </main>
        </div>
    );
}