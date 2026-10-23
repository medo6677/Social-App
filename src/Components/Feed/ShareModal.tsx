import { useState, useEffect } from 'react';
import { X, Share2, Globe, Sparkles } from 'lucide-react';
import { Avatar, Button, Spinner } from '@heroui/react';
import moment from 'moment';
import type { PostCardI, User } from '../../Types/api.type';
import usePost from '../../Hooks/usePost';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostCardI;
  userData: User
}

export default function ShareModal({ isOpen, onClose, post, userData }: ShareModalProps) {
  const [caption, setCaption] = useState<string>('');
  const queryClient = useQueryClient();

  const currentUser = userData
  const sharePost = usePost(`/posts/${post._id}/share`);

  // Lock scroll on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setCaption('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const { isPending, mutate } = useMutation({
    mutationFn: () => sharePost({ body: caption.trim() }),
    mutationKey: ["sharePost"],
    onSuccess: () => {
      toast.success("Post shared successfully!");
      setCaption('');
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message?.replaceAll('"', '')
        .replace('body', 'post caption') || error.message || "Failed to share post");
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl shadow-indigo-950/20 border border-slate-100 overflow-hidden z-10 flex flex-col max-h-[90vh] transition-all duration-300 animate-in zoom-in-95"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
              <Share2 size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Share Post</h3>
              <p className="text-[11px] text-slate-400">Share this post to your audience</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer outline-none"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-center gap-3">
            <Avatar size="sm" className="ring-2 ring-indigo-500/20">
              <Avatar.Image src={currentUser?.photo} alt={currentUser?.name} />
              <Avatar.Fallback>
                {currentUser?.name?.slice(0, 1)?.toUpperCase() || 'U'}
              </Avatar.Fallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800 leading-none">
                {currentUser?.name || 'Anonymous User'}
              </span>
              <div className="flex items-center gap-1 mt-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full w-fit">
                <Globe size={11} className="text-slate-400" />
                <span>Public</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value)
              }}
              placeholder="Say something about this post..."
              rows={3}
              className="w-full text-sm text-slate-800 placeholder:text-slate-400 bg-transparent resize-none outline-none focus:ring-0 border-0 p-0 leading-relaxed"
              autoFocus
            />
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 space-y-3 transition-all">
            <div className="flex items-center gap-2.5">
              <Avatar size="sm" className="w-8 h-8 ring-1 ring-slate-200">
                <Avatar.Image src={post.user?.photo} alt={post.user?.name} />
                <Avatar.Fallback>
                  {post.user?.name?.slice(0, 1)?.toUpperCase() || 'U'}
                </Avatar.Fallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {post.user?.name}
                </h4>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <span>@{post.user?.username || 'user'}</span>
                  <span>·</span>
                  <span>{moment(post.createdAt).fromNow()}</span>
                </p>
              </div>
            </div>

            {post.body && (
              <p className="text-xs text-slate-700 leading-relaxed line-clamp-3">
                {post.body}
              </p>
            )}

            {post.image && (
              <div className="rounded-xl overflow-hidden border border-slate-200/60 max-h-56 bg-slate-100">
                <img
                  src={post.image}
                  alt="Post attachment"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-slate-100 bg-slate-50/40">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            isDisabled={isPending}
            className="text-slate-600 hover:text-slate-800 hover:bg-slate-100/80 font-medium text-xs px-4 h-9 rounded-xl cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            size="sm"
            onClick={() => {
              if (caption.trim().length > 0) {
                mutate()
              } else {
                toast.error("Caption is required")
              }
            }}
            isDisabled={isPending}
            className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs px-5 h-9 rounded-xl shadow-md shadow-indigo-500/20 active:scale-95 transition-all gap-1.5 cursor-pointer"
          >
            {isPending ? (
              <>
                <Spinner size="sm" color="current" />
                <span>Sharing...</span>
              </>
            ) : (
              <>
                <Sparkles size={14} />
                <span>Share now</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
