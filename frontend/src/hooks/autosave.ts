import { useState, useEffect, useRef } from 'react';
import { createPost, updatePost } from '@/utils/api/post';
import { PostFormData } from '@/components/PostForm';
import { useRouter } from 'next/navigation';

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); 

    return debouncedValue;
}
export function useAutosave(initialData: PostFormData, postId: number | null, setPostId: (id: number) => void) {
    const [formData, setFormData] = useState<PostFormData>(initialData);
    const debouncedFormData = useDebounce(formData, 1500); 
    const isFirstRun = useRef(true);
    const router = useRouter();

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        if (!debouncedFormData.title && !debouncedFormData.content) {
            return;
        }

        const saveDraft = async () => {
            console.log("Autosaving draft...");
            const tagsArray = debouncedFormData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
            const postData = { ...debouncedFormData, tags: tagsArray };

            try {
                if (postId) {
                    await updatePost(postId, postData);
                } else {
                    const newPost = await createPost(postData);
                    setPostId(newPost.id); 
                    window.history.replaceState(null, '', `/posts/edit/${newPost.id}`);
                }
            } catch (error) {
                console.error("Autosave failed:", error);
            }
        };

        saveDraft();

    }, [debouncedFormData, postId, setPostId, router]);

    return { formData, setFormData };
}