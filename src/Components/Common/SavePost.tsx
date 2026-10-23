import { Bookmark, BookmarkOff, Loader2 } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import usePut from '../../Hooks/usePut'
import toast from 'react-hot-toast'
import type { User } from '../../Types';

interface Props {
    postId: string;
    bookmarked: boolean;
    hideText?: boolean;
    userData: User;
    className?: string;
    iconSize?: number;
}

export default function SavePost({ postId, bookmarked, hideText = false, userData, className, iconSize = 16 }: Props) {
    const savePost = usePut(`/posts/${postId}/bookmark`)
    const queryClient = useQueryClient()

    const isBookmarked = bookmarked

    const { mutate, isPending } = useMutation({
        mutationFn: () => savePost(),
        mutationKey: ["posts", postId],

        onSuccess: (data) => {
            toast.success(data?.message && (isBookmarked ? "Post Unsaved" : "Post Added to Saved"))
            queryClient.invalidateQueries({ queryKey: ["posts"] })
            if (queryClient.getQueryData(["userPosts", userData?._id])) {
                queryClient.invalidateQueries({ queryKey: ["userPosts", userData?._id] })
            }
            if (queryClient.getQueryData(["userBookmarks", userData?._id])) {
                queryClient.invalidateQueries({ queryKey: ["userBookmarks", userData?._id] })
            }
            if (queryClient.getQueryData(['postDetails', postId])) {
                queryClient.invalidateQueries({ queryKey: ['postDetails', postId] })
            }
            if (queryClient.getQueryData(["userPosts", userData?._id])) {
                queryClient.invalidateQueries({ queryKey: ["userPosts", userData?._id] })
            }
        },
        onError() {
            toast.error("Error while saving")
        }
    })

    return (
        <button
            type="button"
            disabled={isPending}
            onClick={() => mutate()}
            className={className ?? "flex items-center gap-2 w-full cursor-pointer"}
        >
            {isPending ? (
                <Loader2 size={iconSize} className="animate-spin" />
            ) : isBookmarked ? (
                <BookmarkOff size={iconSize} className="text-indigo-600 fill-indigo-100" />
            ) : (
                <Bookmark size={iconSize} />
            )}
            {!hideText && <span className={isBookmarked ? "text-indigo-600 font-medium" : ""}>{isBookmarked ? "Unsave Post" : "Save Post"}</span>}
        </button>
    )
}
