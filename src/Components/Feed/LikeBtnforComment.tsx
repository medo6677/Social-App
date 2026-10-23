
import { useMutation, useQueryClient } from "@tanstack/react-query";
import usePut from "../../Hooks/usePut";
import toast from "react-hot-toast";
import type {
    CommentsResponse,
    LikeCommentContext,
    PostsResponse,
    User,
} from "../../Types";
import { Heart } from "lucide-react";
interface LikeBtnProps {
    postId: string;
    likes: string[];
    userData: User
    commentId: string;
}

export default function LikeBtnforComment({
    postId,
    likes,
    commentId,
    userData
}: LikeBtnProps) {
   
    const userId: string | undefined = userData?._id;

    const queryClient = useQueryClient();
    const queryKey = ["comments", postId];

    const isLike = userId ? likes.includes(userId) : false;

    const likeComment = usePut(
        `/posts/${postId}/comments/${commentId}/like`
    );

    const { mutate, isPending } = useMutation({
        mutationKey: ["likeComment", postId, commentId],
        mutationFn: likeComment,

        // Optimistic update
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey });
            await queryClient.cancelQueries({ queryKey: ["posts"] });
            const previousComments =
                queryClient.getQueryData<CommentsResponse>(queryKey);
            const previousPosts =
                queryClient.getQueryData<PostsResponse>(["posts"]);

            queryClient.setQueryData<CommentsResponse>(
                queryKey,
                (oldData) => {
                    if (!oldData?.data?.comments || !userId) {
                        return oldData;
                    }

                    return {
                        ...oldData,
                        data: {
                            ...oldData.data,
                            comments: oldData.data.comments.map((comment) => {
                                if (comment._id !== commentId) {
                                    return comment;
                                }

                                const currentLikes = comment.likes ?? [];
                                const alreadyLiked = currentLikes.includes(userId);

                                return {
                                    ...comment,
                                    likes: alreadyLiked
                                        ? currentLikes.filter((id) => id !== userId)
                                        : [...currentLikes, userId],
                                };
                            }),
                        },
                    };
                }
            );
            queryClient.setQueryData<PostsResponse>(["posts"], (oldData) => {
                if (!oldData?.data?.posts || !userId) {
                    return oldData;
                }

                return {
                    ...oldData,
                    data: {
                        ...oldData.data,
                        posts: oldData.data.posts.map((post) => {
                            if (post._id !== postId || post.topComment?._id !== commentId) {
                                return post;
                            }

                            const currentLikes = post.topComment.likes ?? [];
                            const alreadyLiked = currentLikes.includes(userId);

                            return {
                                ...post,
                                topComment: {
                                    ...post.topComment,
                                    likes: alreadyLiked
                                        ? currentLikes.filter((id) => id !== userId)
                                        : [...currentLikes, userId],
                                },
                            };
                        }),
                    },
                };
            });

            return { previousComments, previousPosts } satisfies LikeCommentContext;
        },

        // Rollback on error
        onError: (_error, _variables, context) => {
            if (context?.previousComments) {
                queryClient.setQueryData(queryKey, context.previousComments);
            }
            if (context?.previousPosts) {
                queryClient.setQueryData(["posts"], context.previousPosts);
            }

            toast.error("Couldn't update comment like. Please try again.");
        },

        // Sync with server
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });

    return (
        <button
            type="button"
            disabled={isPending || !userId}
            onClick={() => mutate()}
            className={`transition-colors cursor-pointer flex items-center gap-1 ${isLike
                ? "text-rose-600"
                : "hover:text-rose-600"
                }`}
        >
            {isLike ? <Heart size={16} fill='red' /> : <Heart size={16} />} ({likes.length})
        </button>
    );
}
