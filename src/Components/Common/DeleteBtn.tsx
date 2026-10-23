import useDelete from '../../Hooks/useDelete'
import { Trash } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useContext } from 'react';
import { TokenContext } from '../Context/TokenContext';

export default function DeleteBtn({ postId }: { postId: string }) {
        const tokenContext = useContext(TokenContext);
        const userData = tokenContext?.userData;
    const deletePost = useDelete(`/posts/${postId}`)
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationKey: ["posts"],
        mutationFn: () => deletePost(),
        onSuccess: () => {
            toast.success("Post deleted successfully")
            queryClient.invalidateQueries({ queryKey: ["posts"] })

            if(queryClient.getQueryData(["userPosts", userData?.id])){
                queryClient.invalidateQueries({ queryKey: ["userPosts", userData?.id] })    
            }
        },
        onError(error:any) {
            toast.error(error.response?.data.message || "Error while deleting")


        }
    })
    return (
        <button disabled={isPending} onClick={() => mutate()} className=" flex items-center gap-1 text-xs text-red-500  " >
            <Trash size={16} /> <span>{isPending ? "Deleting..." : "Delete Post"}</span>
        </button>
    )
}
