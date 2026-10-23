import useDelete from '../../Hooks/useDelete';
import { Trash2, Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { TokenContext } from '../Context/TokenContext';

interface DeleteCommentBtnProps {
  postId: string;
  commentId: string;
  className?: string;
  iconSize?: number;
}

export default function DeleteCommentBtn({
  postId,
  commentId,
  className,
  iconSize = 13,
}: DeleteCommentBtnProps) {
  const tokenContext = useContext(TokenContext);
  const userData = tokenContext?.userData;
  const deleteComment = useDelete(`/posts/${postId}/comments/${commentId}`);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['deleteComment', postId, commentId],
    mutationFn: () => deleteComment(),
    onSuccess: () => {
      toast.success('Comment deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['postDetails', postId] });
      if (userData?._id && queryClient.getQueryData(['userPosts', userData._id])) {
        queryClient.invalidateQueries({ queryKey: ['userPosts', userData._id] });
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error while deleting comment');
    },
  });

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => mutate()}
      className={
        className ??
        'flex items-center gap-2 w-full text-left text-xs text-rose-600 hover:text-rose-700 cursor-pointer disabled:opacity-50'
      }
    >
      {isPending ? (
        <Loader2 size={iconSize} className="animate-spin" />
      ) : (
        <Trash2 size={iconSize} />
      )}
      <span>{isPending ? 'Deleting...' : 'Delete'}</span>
    </button>
  );
}
