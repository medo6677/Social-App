import { useState } from 'react';
import { Avatar } from '@heroui/react';
import {
  CornerDownRight,
  ImageIcon,
  Send,
  X,
  Loader2,
} from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import moment from 'moment';
import toast from 'react-hot-toast';
import useGet from '../../Hooks/useGet';
import usePost from '../../Hooks/usePost';

import type { TopComment, User } from '../../Types/api.type';
import ImageModal from '../Common/ImageModal';

interface CommentRepliesProps {
  postId: string;
  commentId: string;
  commentCreatorName?: string;
  isOpen: boolean;
  userData: User;
}

export default function CommentReplies({
  postId,
  commentId,
  commentCreatorName,
  isOpen,
  userData
}: CommentRepliesProps) {
  const [replyText, setReplyText] = useState<string>('');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imgPrev, setImgPrev] = useState<string | null>(null);


  const queryClient = useQueryClient();

  const getReplies = useGet(
    `/posts/${postId}/comments/${commentId}/replies?page=1&limit=10`
  );

  const {
    data: replies,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['replies', postId, commentId],
    queryFn: () => getReplies(),
    select: (res: any) =>
      res?.data?.replies || res?.data?.comments || res?.replies || [],
    enabled: isOpen,
  });

  const createReply = usePost(`/posts/${postId}/comments/${commentId}/replies`);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => createReply(formData),
    onSuccess: (data: any) => {
      setReplyText('');
      setImgFile(null);
      setImgPrev(null);
      toast.success(data?.message || 'Reply added successfully!');
      queryClient.invalidateQueries({ queryKey: ['replies', postId, commentId] });
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || 'Failed to send reply. Please try again.'
      );
    },
  });

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgFile(file);
    setImgPrev(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImgFile(null);
    setImgPrev(null);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const formData = new FormData();
    formData.append('content', replyText.trim());
    if (imgFile) {
      formData.append('image', imgFile);
    }

    mutate(formData);
  };

  return (
    <div className="relative pl-6 sm:pl-8 mt-2 flex flex-col gap-3">
      <div className="absolute left-2.5 sm:left-3.5 top-0 bottom-6 w-3 border-l-2 border-slate-200/90" />

      {isLoading && (
        <div className="flex items-center gap-2 py-2 text-xs text-slate-400">
          <Loader2 size={13} className="animate-spin text-indigo-600" />
          <span>Loading replies...</span>
        </div>
      )}

      {isError && (
        <div className="flex items-center gap-2 py-2 text-xs text-rose-500">
          <span>Failed to load replies.</span>
          <button
            type="button"
            onClick={() => refetch()}
            className="font-semibold underline cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && replies && replies.length > 0 && (
        <div className="flex flex-col gap-2.5">
          {replies.map((reply: TopComment) => (
            <div key={reply._id} className="relative">
              <div className="absolute -left-3.5 sm:-left-4.5 top-3.5 w-3 h-3 border-b-2 border-l-2 border-slate-200/90 rounded-bl-lg pointer-events-none" />

              <div className="flex-1 min-w-0 bg-slate-100/70 border border-slate-200/50 rounded-2xl p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Avatar size="sm" className="w-6 h-6 shrink-0 ring-1 ring-slate-100">
                      <Avatar.Image src={reply.commentCreator?.photo} />
                      <Avatar.Fallback className="text-[10px] bg-slate-100 font-semibold">
                        {reply.commentCreator?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </Avatar.Fallback>
                    </Avatar>

                    <div>
                      <h6 className="text-[11px] font-semibold text-slate-900 hover:text-indigo-600 transition-colors">
                        <Link to={`/user/${reply.commentCreator?._id}`}>
                          {reply.commentCreator?.name}
                        </Link>
                      </h6>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {commentCreatorName && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] text-indigo-600 bg-indigo-50/80 px-1.5 py-0.5 rounded-full font-medium">
                            <CornerDownRight size={9} />
                            <span>@{commentCreatorName}</span>
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400">
                          {moment(reply.createdAt).fromNow()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                  {reply.content}
                </p>

                {reply.image && (
                  <div
                    onClick={() => setPreviewImage(reply.image || null)}
                    className="mt-2 rounded-lg overflow-hidden max-w-xs border border-slate-200/60 cursor-pointer group"
                  >
                    <img
                      src={reply.image}
                      alt="Reply attachment"
                      className="w-full h-28 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && replies && replies.length === 0 && (
        <div className="text-[11px] text-slate-400 italic py-0.5">
          No replies yet. Be the first to reply!
        </div>
      )}

      <form
        onSubmit={handleSendReply}
        className="flex items-start gap-2 pt-1 relative"
      >
        <div className="absolute -left-3.5 sm:-left-4.5 top-3.5 w-3 h-3 border-b-2 border-l-2 border-slate-200/90 rounded-bl-lg pointer-events-none" />

        <Avatar size="sm" className="w-6 h-6 shrink-0 ring-1 ring-slate-100 z-10">
          <Avatar.Image src={userData?.photo} />
          <Avatar.Fallback className="text-[10px] bg-indigo-50 text-indigo-600 font-semibold">
            {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar.Fallback>
        </Avatar>

        <div className="flex-1 min-w-0 bg-white border border-slate-200 rounded-2xl p-2 focus-within:border-indigo-500/60 transition-colors shadow-2xs">
          <textarea
            rows={1}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={`Reply to ${commentCreatorName || 'comment'}...`}
            className="w-full text-xs text-slate-700 placeholder:text-slate-400 bg-transparent outline-none resize-none px-1 block"
          />

          {imgPrev && (
            <div className="relative w-fit mt-1.5 rounded-lg overflow-hidden border border-slate-200/80">
              <img
                src={imgPrev}
                alt="Reply preview"
                className="w-24 h-16 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 p-0.5 bg-black/60 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
              >
                <X size={10} />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between pt-1.5 mt-1 border-t border-slate-100">
            <label
              className="p-1 text-slate-400 hover:text-indigo-600 rounded-md hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
              title="Attach image"
            >
              <ImageIcon size={13} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            <button
              type="submit"
              disabled={isPending || !replyText.trim()}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[11px] font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
            >
              {isPending ? (
                <Loader2 size={11} className="animate-spin" />
              ) : (
                <Send size={11} />
              )}
              <span>Reply</span>
            </button>
          </div>
        </div>
      </form>

      <ImageModal
        isOpen={Boolean(previewImage)}
        onClose={() => setPreviewImage(null)}
        imageUrl={previewImage}
      />
    </div>
  );
}
