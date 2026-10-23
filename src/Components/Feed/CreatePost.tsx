import { Avatar } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ImageIcon, Loader2, Send, Smile, X } from 'lucide-react';
import { useState, useContext } from 'react';
import usePost from '../../Hooks/usePost';
import { TokenContext } from '../Context/TokenContext';
import toast from 'react-hot-toast';

export default function CreatePost() {
  const isFocused = false;
  const [postContent, setPostContent] = useState<string>("")
  const [imgFile, setImgFile] = useState<File | null>(null)
  const [imgPrev, setImgPrev] = useState<string | null>(null)
  const createPost = usePost(`/posts`)
  const queryClinte = useQueryClient()
  const tokenContext = useContext(TokenContext);
  const userData = tokenContext?.userData;
  const { isPending, mutate } = useMutation({
    mutationFn: createPost,
    mutationKey: ["posts"],
    onSuccess: (data) => {
      toast.success(data.message)
      queryClinte.invalidateQueries({ queryKey: ["posts"] })
      setImgFile(null)
      setImgPrev(null)
      setPostContent("")
    },
    onError(err: any) {
      toast.error(err.response?.data?.message || err.message)
    },
  })

  function handelSubmit() {
    const formData = new FormData();
    postContent && formData.append("body", postContent);
    imgFile && formData.append("image", imgFile);
    mutate(formData)
  }

  return (
    <section
      aria-label="Create a post"
      className="bg-white rounded-2xl border border-slate-100 shadow-xs p-4 sm:p-5 flex flex-col gap-4"
    >
      <div className="flex items-center gap-3">
        <Avatar size="sm" className="shrink-0 ring-2 ring-indigo-500/20">
          <Avatar.Image src={userData?.photo} alt="Your avatar" />
          <Avatar.Fallback className="bg-linear-to-tr from-indigo-500 to-purple-600 text-white text-xs font-semibold">
            {userData?.name?.slice(0, 1)?.toUpperCase()}
          </Avatar.Fallback>
        </Avatar>

        <div>
          <p className="text-sm font-semibold text-slate-800 leading-tight">{userData?.name}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Sharing with · Everyone</p>
        </div>
      </div>

      <div
        className={`
          flex flex-col gap-3 bg-slate-50/80 border rounded-2xl p-3
          transition-colors duration-200
          ${isFocused
            ? 'border-indigo-400/70 bg-white'
            : 'border-slate-200/70 hover:border-slate-300'
          }
        `}
      >
        <textarea
          id="create-post-textarea"
          rows={3}
          placeholder="What's on your mind?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="
            w-full bg-transparent outline-none resize-none
            text-sm text-slate-700 placeholder:text-slate-400
            leading-relaxed px-1
          "
        />

        {imgPrev && (
          <div className="relative w-fit">
            <img
              src={imgPrev}
              alt="Upload preview"
              className="max-h-52 w-full rounded-xl object-cover border border-slate-200"
            />
            <button
              type="button"
              aria-label="Remove image"
              onClick={() => { setImgFile(null); setImgPrev(null); }}
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

        <div className="flex items-center justify-between pt-2 border-t border-slate-200/50">
          <div className="flex items-center gap-1">
            <label
              htmlFor="create-post-file"
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
                    setImgFile(file);
                    setImgPrev(URL.createObjectURL(file));
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

          <button
            type="button"
            id="create-post-submit"
            onClick={handelSubmit}
            disabled={postContent.length === 0 || isPending}
            className="
              flex items-center gap-2 px-4 py-1.5
              bg-linear-to-r from-indigo-600 to-purple-600
              hover:from-indigo-500 hover:to-purple-500
              text-white text-xs font-semibold
              rounded-xl shadow-md shadow-indigo-500/20
              active:scale-95 transition-all cursor-pointer
            "
          >
            {isPending ? <><Loader2 size={16} className="animate-spin" /><span>Posting</span> </> : <> <span>Post</span>  <Send size={13} /></>}
          </button>
        </div>
      </div>
    </section>
  );
}
