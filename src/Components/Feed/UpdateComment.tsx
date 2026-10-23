import React, { useState } from 'react';
import { ImageIcon, Loader2, X, Check } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import usePut from '../../Hooks/usePut';
import type { TopComment } from '../../Types/api.type';

interface UpdateCommentProps {
  postId: string;
  comment: TopComment;
  onClose: () => void;
}

export default function UpdateComment({
  postId,
  comment,
  onClose,
}: UpdateCommentProps) {
  const [content, setContent] = useState<string>(comment.content || '');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPrev, setImgPrev] = useState<string | null>(comment.image || null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const updateCommentApi = usePut(`/posts/${postId}/comments/${comment._id}`);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => updateCommentApi(formData),
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Comment updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      onClose();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to update comment');
    },
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error('Comment content cannot be empty');
      return;
    }

    const formData = new FormData();
    formData.append('content', content.trim());
    if (imgFile) {
      formData.append('image', imgFile);
    }

    mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-2 bg-white border rounded-2xl p-3 transition-all duration-200 shadow-xs ${
        isFocused
          ? 'border-indigo-500/60 ring-2 ring-indigo-500/10'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <textarea
        rows={2}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Edit your comment..."
        className="w-full text-xs text-slate-800 placeholder:text-slate-400 bg-transparent outline-none resize-none leading-relaxed"
      />

      {imgPrev && (
        <div className="relative w-fit mt-1 rounded-xl overflow-hidden border border-slate-200/80 group">
          <img
            src={imgPrev}
            alt="Comment preview"
            className="w-32 h-24 object-cover rounded-xl"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
            title="Remove image"
          >
            <X size={12} />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
        <label
          className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
          title="Attach image"
        >
          <ImageIcon size={15} />
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            {imgPrev ? 'Change Photo' : 'Add Photo'}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isPending}
            onClick={onClose}
            className="px-3 py-1 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending || !content.trim()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Check size={12} />
                <span>Save</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
