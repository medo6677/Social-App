import { Avatar } from '@heroui/react';
import { ImageIcon, Send, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TokenContext } from '../Context/TokenContext';
import usePost from '../../Hooks/usePost';
import toast from 'react-hot-toast';

interface SendCommentProps {
    postid: string;
}

export default function SendComment({ postid }: SendCommentProps) {
    const [commentText, setCommentText] = useState('')
    const [imgFile, setImgFile] = useState<File | null>(null)
    const [imgPrev, setImgPrev] = useState<string | null>(null)

    const tokenContext = useContext(TokenContext);
    const userData = tokenContext?.userData;
    const queryClient = useQueryClient()
    const createComment = usePost(`/posts/${postid}/comments`)

    const { isPending, mutate } = useMutation({
        mutationFn: createComment,
        onSuccess: (data) => {
            setCommentText('')
            setImgFile(null)
            setImgPrev(null)
            toast.success(data.message)
        },
        onError: (error: any) => {
            toast.error(
                error.response?.data?.message
                    ?.replaceAll('"', '')
                    .replaceAll('content', 'comment')
            )
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', postid] })
        }
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setImgFile(file)
        setImgPrev(URL.createObjectURL(file))
    }

    const removeImage = () => {
        setImgFile(null)
        setImgPrev(null)
    }

    const handleSend = () => {
        if (!commentText.trim()) return
        const formData = new FormData()
        formData.append('content', commentText)
        if (imgFile) formData.append('image', imgFile)
        mutate(formData)
    }

    return (
        <div className="flex items-start gap-2.5 pt-2">
            <Avatar size="sm" className="w-8 h-8 shrink-0 ring-1 ring-slate-100">
                <Avatar.Image src={userData?.photo} />
                <Avatar.Fallback>{userData?.name?.slice(0, 1).toUpperCase()}</Avatar.Fallback>
            </Avatar>

            <div className="flex-1 min-w-0 flex flex-col gap-2 bg-slate-50/90 border border-slate-200/70 rounded-2xl p-2.5 focus-within:bg-white focus-within:border-indigo-500/50 transition-colors">
                <textarea
                    id={`comment-input-${postid}`}
                    rows={1}
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full text-xs bg-transparent outline-none text-slate-700 placeholder:text-slate-400 px-1 resize-none max-h-32 overflow-y-auto block"
                />

                {imgPrev && (
                    <div className="relative w-fit">
                        <img
                            src={imgPrev}
                            alt="preview"
                            className="h-24 max-w-xs rounded-xl object-cover border border-slate-200"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-slate-700 hover:bg-rose-500 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                        >
                            <X size={11} />
                        </button>
                    </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/40">
                    <label className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 cursor-pointer p-2 rounded-lg hover:bg-slate-100 transition-colors">
                        <ImageIcon size={16} />
                        <span className="text-[11px]">Attach Image</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>

                    <button
                        type="button"
                        disabled={isPending}
                        onClick={handleSend}
                        className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors shadow-xs"
                    >
                        <span>{isPending ? 'Sending...' : 'Send'}</span>
                        <Send size={12} />
                    </button>
                </div>
            </div>
        </div>
    )
}
