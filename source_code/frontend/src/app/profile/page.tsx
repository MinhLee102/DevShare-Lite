'use client';
import { useEffect, useState, ChangeEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getProfile, updateProfile } from '@/utils/api/user';
import { PostType, UserProfile } from '@/types';
import Post from '@/components/Post';
import SideBar from '@/components/SideBar';
import Picture from '@/components/Picture';
import Link from 'next/link';
import Button from '@/components/Button';


export default function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const [data, setData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const [bio, setBio] = useState(''); 
    const [isSaving, setIsSaving] = useState(false); 

    useEffect(() => {
        if (user) {
            getProfile().then(profileData => {
                setData(profileData);
                setBio(profileData.profile.bio || ''); 
                setLoading(false);
            });
        }
        if (!authLoading && !user) {
            setLoading(false);
        }
    }, [user, authLoading]);

    const handleProfileSave = async () => {
        setIsSaving(true);
        try {
            const updatedProfileData = await updateProfile({ bio: bio });
            
            setData(prevData => {
                if (!prevData) return null;
                return {
                    ...prevData,
                    profile: updatedProfileData,
                };
            });
            alert('Profile saved successfully!');
        } catch (error) {
            console.error("Failed to save profile:", error);
            alert("Could not save profile. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };
    
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
                           <div>
                                <textarea id="bio" placeholder="Your bio here..." value={bio} 
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)} 
                                className="w-full p-2 border rounded mt-2" rows={3}/>
                           </div>

                            <Button onClick={handleProfileSave} disabled={isSaving} className="bg-blue-600 text-white px-4 py-2 rounded">
                                {isSaving ? 'Saving...' : 'Save Profile'}
                            </Button>
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