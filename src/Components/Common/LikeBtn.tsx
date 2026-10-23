import { Button } from '@heroui/react'
import { Heart } from 'lucide-react'
import usePut from '../../Hooks/usePut'
import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import type {
    LikePostContext,
    PostCardI,
    PostDetailsResponse,
    PostsResponse,
    User,
} from '../../Types'
import { useParams } from 'react-router'

interface Props {
    postId: string;
    likes: string[];
    hideText?: boolean;
    userData: User;
    iconSize?: number;
    className?: string;
}

export default function LikeBtn({ postId, likes, hideText = false, userData, iconSize = 16, className }: Props) {
    const likePost = usePut(`/posts/${postId}/like`)
    const queryClient = useQueryClient()
    const { _id: userId } = userData
    const { id: userProfileId } = useParams()
    const isLike = userId ? likes.includes(userId) : false

    const { mutate, isPending } = useMutation({
        mutationFn: () => likePost(),
        mutationKey: ["likePost", postId],

        // Optimistic update
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["posts"] })
            await queryClient.cancelQueries({ queryKey: ["postDetails", postId] })
            await queryClient.cancelQueries({ queryKey: ["userProfilePosts", userProfileId] })

            const previousPosts = queryClient.getQueryData<InfiniteData<PostsResponse> | PostsResponse>(["posts"])
            const previousPostDetails = queryClient.getQueryData<PostDetailsResponse>(["postDetails", postId])
            const previousUserProfilePosts = queryClient.getQueryData<PostsResponse>(["userProfilePosts", userProfileId])

            queryClient.setQueryData<InfiniteData<PostsResponse> | PostsResponse>(["posts"], (oldData) => {
                if (!oldData || !userId) {
                    return oldData
                }

                if ("pages" in oldData && Array.isArray(oldData.pages)) {
                    return {
                        ...oldData,
                        pages: oldData.pages.map((page) => {
                            if (!page?.data?.posts) return page
                            return {
                                ...page,
                                data: {
                                    ...page.data,
                                    posts: page.data.posts.map((post: PostCardI) => {
                                        if (post._id !== postId) {
                                            return post
                                        }

                                        const currentLikes = post.likes ?? []
                                        const alreadyLiked = currentLikes.includes(userId)

                                        return {
                                            ...post,
                                            likes: alreadyLiked
                                                ? currentLikes.filter((id: string) => id !== userId)
                                                : [...currentLikes, userId],
                                            likesCount: alreadyLiked
                                                ? (post.likesCount ?? 1) - 1
                                                : (post.likesCount ?? 0) + 1,
                                        }
                                    }),
                                },
                            }
                        }),
                    }
                }

                if ("data" in oldData && oldData.data?.posts) {
                    return {
                        ...oldData,
                        data: {
                            ...oldData.data,
                            posts: oldData.data.posts.map((post) => {
                                if (post._id !== postId) {
                                    return post
                                }

                                const currentLikes = post.likes ?? []
                                const alreadyLiked = currentLikes.includes(userId)

                                return {
                                    ...post,
                                    likes: alreadyLiked
                                        ? currentLikes.filter((id) => id !== userId)
                                        : [...currentLikes, userId],
                                    likesCount: alreadyLiked
                                        ? (post.likesCount ?? 1) - 1
                                        : (post.likesCount ?? 0) + 1,
                                }
                            }),
                        },
                    }
                }

                return oldData
            })

            queryClient.setQueryData<PostsResponse>(["userProfilePosts", userProfileId], (oldData) => {
                if (!oldData?.data?.posts || !userId) {
                    return oldData
                }

                return {
                    ...oldData,
                    data: {
                        ...oldData.data,
                        posts: oldData.data.posts.map((post) => {
                            if (post._id !== postId) {
                                return post
                            }

                            const currentLikes = post.likes ?? []
                            const alreadyLiked = currentLikes.includes(userId)

                            return {
                                ...post,
                                likes: alreadyLiked
                                    ? currentLikes.filter((id) => id !== userId)
                                    : [...currentLikes, userId],
                                likesCount: alreadyLiked
                                    ? (post.likesCount ?? 1) - 1
                                    : (post.likesCount ?? 0) + 1,
                            }
                        }),
                    },
                }
            })

            queryClient.setQueryData<PostDetailsResponse>(["postDetails", postId], (oldData) => {
                if (!oldData?.data?.post || !userId) {
                    return oldData
                }

                const post = oldData.data.post
                const currentLikes = post.likes ?? []
                const alreadyLiked = currentLikes.includes(userId)

                return {
                    ...oldData,
                    data: {
                        ...oldData.data,
                        post: {
                            ...post,
                            likes: alreadyLiked
                                ? currentLikes.filter((id) => id !== userId)
                                : [...currentLikes, userId],
                            likesCount: alreadyLiked
                                ? (post.likesCount ?? 1) - 1
                                : (post.likesCount ?? 0) + 1,
                        },
                    },
                }
            })

            return { previousPosts, previousPostDetails, previousUserProfilePosts } satisfies LikePostContext
        },

        // Rollback on error
        onError: (_error, _variables, context) => {
            if (context?.previousPosts) {
                queryClient.setQueryData(["posts"], context.previousPosts)
            }
            if (context?.previousPostDetails) {
                queryClient.setQueryData(["postDetails", postId], context.previousPostDetails)
            }
            if (context?.previousUserProfilePosts) {
                queryClient.setQueryData(["userProfilePosts", userProfileId], context.previousUserProfilePosts)
            }
            toast.error("Couldn't update post like. Please try again.")
        },

        // Sync with server
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
            queryClient.invalidateQueries({ queryKey: ["postDetails", postId] })
            queryClient.invalidateQueries({ queryKey: ["userProfilePosts", userProfileId] })
            if (queryClient.getQueryData(["userBookmarks", userData?._id])) {
                queryClient.invalidateQueries({ queryKey: ["userBookmarks", userData?._id] })
            }
            if (queryClient.getQueryData(["userPosts", userData?._id])) {
                queryClient.invalidateQueries({ queryKey: ["userPosts", userData?._id] })
            }
        },
    })

    return (
        <Button
            onClick={() => mutate()}
            variant="ghost"
            size="sm"
            isDisabled={isPending}
            className={className ?? "flex-1 text-slate-600 hover:text-rose-600 hover:bg-rose-50/50 gap-2 text-xs font-medium rounded-xl h-9 cursor-pointer"}
        >
            <Heart
                size={iconSize}
                className={isLike ? "fill-rose-500 text-rose-500" : "text-slate-600"}
            />

            {hideText ? <><span>{likes.length}</span></> : <span className={isLike ? 'text-rose-600 ' : ''}>
                {isLike ? 'Liked' : 'Like'}</span>}
        </Button>
    )
}