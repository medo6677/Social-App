import { ImageIcon, Loader2, Smile, X } from "lucide-react";
import React, { useState } from "react";
import type { PostCardI } from "../../Types/api.type";
import usePut from "../../Hooks/usePut";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface UpdatePostProps {
  post: PostCardI;
  setPostEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdatePost({ post, setPostEdit }: UpdatePostProps) {
  const [updatePostContent, setUpdatePostContent] = useState<string>(post.body);
  const [updateImgPrev, setUpdateImgPrev] = useState<string | null>(
    post.image || null,
  );
  const [updateImgFile, setUpdateImgFile] = useState<File | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const updatePost = usePut(`/posts/${post._id}`);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updatePost,
    mutationKey: ["posts"],
    onSuccess() {
      toast.success("post updated");
      setPostEdit(false);
      setUpdateImgFile(null);
      setUpdateImgPrev(null);
      setUpdatePostContent("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || err.message);
    },
  });

  function handelUpdate() {
    const formData = new FormData();

    formData.append("body", updatePostContent);

    if (updateImgFile) {
      formData.append("image", updateImgFile);
    }

    mutate(formData);
  }
  return (
    <>
      <div>
        <div
          className={`
          flex flex-col gap-3 bg-slate-50/80 border rounded-2xl p-3
          transition-colors duration-200
          ${
            isFocused
              ? "border-indigo-400/70 bg-white"
              : "border-slate-200/70 hover:border-slate-300"
          }
        `}
        >
          <textarea
            id="create-post-textarea"
            rows={3}
            placeholder="What's on your mind?"
            value={updatePostContent}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setUpdatePostContent(e.target.value)}
            className="
            w-full bg-transparent outline-none resize-none
            text-sm text-slate-700 placeholder:text-slate-400
            leading-relaxed px-1
          "
          />

          {updateImgPrev && (
            <div className="relative w-fit">
              <img
                src={updateImgPrev}
                alt="Upload preview"
                className="max-h-52 w-full rounded-xl object-cover border border-slate-200"
              />
              <button
                type="button"
                aria-label="Remove image"
                onClick={() => {
                  setUpdateImgFile(null);
                  setUpdateImgPrev(null);
                }}
                className="
                absolute -top-2 -right-2 w-6 h-6
                bg-slate-700 hover:bg-rose-500 text-white
                rounded-full flex items-center justify-center
                transition-colors shadow-sm cursor-pointer
              "
              >
                <X size={13} />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <label
            className="
                flex items-center gap-1.5 text-xs text-slate-500
                hover:text-indigo-600 cursor-pointer
                px-2.5 py-1.5 rounded-xl hover:bg-indigo-50/60
                transition-colors font-medium
              "
            title="Attach image"
          >
            <ImageIcon size={16} />
            <span className="hidden sm:inline">Photo</span>
            <input
              id="create-post-file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target?.files?.[0];
                if (file) {
                  setUpdateImgFile(file);
                  setUpdateImgPrev(URL.createObjectURL(file));
                }
              }}
            />
          </label>

          <button
            type="button"
            aria-label="Add emoji"
            className="
                flex items-center gap-1.5 text-xs text-slate-500
                hover:text-amber-500 cursor-pointer
                px-2.5 py-1.5 rounded-xl hover:bg-amber-50/60
                transition-colors font-medium
              "
          >
            <Smile size={16} />
            <span className="hidden sm:inline">Feeling</span>
          </button>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => setPostEdit(false)}
            className="text-slate-500 hover:bg-slate-100 px-4 py-1.5 rounded-full text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            disabled={isPending}
            onClick={handelUpdate}
            className="flex items-center gap-1 bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />{" "}
                <span>Updating...</span>
              </>
            ) : (
              "Update Post"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
