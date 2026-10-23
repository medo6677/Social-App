import { useState, useEffect } from 'react';
import { UserPlus, UserCheck, Loader2 } from 'lucide-react';
import usePut from '../../Hooks/usePut';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface FollowBtnProps {
  userId: string;
  initialIsFollowing?: boolean;
  onToggle?: (isFollowing: boolean) => void;
  className?: string;
  size?: 'sm' | 'md';
  isFollowing?: boolean;
}

export default function FollowBtn({
  isFollowing,
  initialIsFollowing = false,
  onToggle,
  className,
  size = 'sm',
  userId,
}: FollowBtnProps) {
  const [currentFollowing, setCurrentFollowing] = useState<boolean>(
    isFollowing ?? initialIsFollowing
  );

  useEffect(() => {
    if (isFollowing !== undefined) {
      setCurrentFollowing(isFollowing);
    }
  }, [isFollowing]);

  const queryClient = useQueryClient();
  const toggleFollow = usePut(`/users/${userId}/follow`);

  const { isPending, mutate } = useMutation({
    mutationFn: () => toggleFollow(),
    mutationKey: ['followUser', userId],
    onSuccess: () => {
      setCurrentFollowing((prev) => {
        const next = !prev;
        if (onToggle) onToggle(next);
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ['userProfile', userId] });
      queryClient.invalidateQueries({ queryKey: ['suggestedFriends'] });
    },
    onError: () => {
      toast.error('Failed to update follow status, please try again');
    },
  });

  const sizeClasses =
    size === 'sm'
      ? 'px-3.5 py-1.5 text-xs'
      : 'px-5 py-2 text-xs sm:text-sm';

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => mutate()}
      className={`inline-flex items-center justify-center gap-1.5 font-semibold rounded-full transition-all duration-150 cursor-pointer shadow-xs active:scale-95 select-none ${sizeClasses} ${
        currentFollowing
          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
      } ${className ?? ''}`}
    >
      {isPending ? (
        <>
          <Loader2 className="animate-spin" size={13} />
          <span>Loading</span>
        </>
      ) : currentFollowing ? (
        <>
          <UserCheck size={size === 'sm' ? 14 : 16} />
          <span>Following</span>
        </>
      ) : (
        <>
          <UserPlus size={size === 'sm' ? 14 : 16} />
          <span>Follow</span>
        </>
      )}
    </button>
  );
}
