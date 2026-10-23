import { Avatar, Dropdown } from "@heroui/react";
import {
  MoreHorizontal,
  Pencil,

  EyeClosed,
} from "lucide-react";


import type { PostCardI, TopComment, User } from "../../Types/api.type";
import CommentSkeleton from "./CommentSkeleton";
import CommentError from "./CommentError";
import useGet from "../../Hooks/useGet";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";

import SendComment from "./SendComment";
import LikeBtnforComment from "./LikeBtnforComment";
import UpdateComment from "./UpdateComment";
import CommentReplies from "./CommentReplies";
import DeleteCommentBtn from "../Common/DeleteCommentBtn";
import ImageModal from "../Common/ImageModal";
import { Link } from "react-router";

export default function PostComments({ post, userData }: { post: PostCardI, userData: User }) {
  const [commentsCount, setCommentsCount] = useState<number>(5);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [openReplies, setOpenReplies] = useState<Record<string, boolean>>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const toggleReplies = (commentId: string) => {
    setOpenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const getData = useGet(`/posts/${post._id}/comments?limit=30`)
  const {
    data: allComments,
    isLoading: commentsLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["comments", post._id],
    queryFn: getData,
    select: (data: { data: { comments: TopComment[] } }) =>
      data.data.comments,
    retry: 3,
  });
  if (commentsLoading) return <CommentSkeleton count={2} />
  if (isError) return <CommentError message={error?.message} onRetry={refetch} />


  return (


    <div className="flex flex-col gap-4 pt-2 border-t border-slate-100">
      {allComments && <div className="flex flex-col gap-3" >

        {allComments.slice(0, commentsCount).map((comment) => {
          const postOwnerId = typeof post.user === 'object' ? (post.user?._id || post.user?._id) : post.user;
          const isCommentCreator = Boolean(userData?._id && comment.commentCreator?._id === userData._id);
          const isPostOwner = Boolean(userData?._id && postOwnerId === userData._id);
          const canDelete = isCommentCreator || isPostOwner;
          const canEdit = isCommentCreator;

          return (
          <React.Fragment key={comment._id}>
            <div className="flex flex-col gap-1.5 relative">

              <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                {editingCommentId === comment._id ? (
                  <UpdateComment
                    postId={post._id}
                    comment={comment}
                    onClose={() => setEditingCommentId(null)}
                  />
                ) : (
                  <div className="bg-slate-50/90 rounded-2xl p-3 relative group">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Avatar size="sm" className="w-7 h-7 shrink-0 ring-1 ring-slate-100">
                          <Avatar.Image src={comment.commentCreator?.photo} />
                          <Avatar.Fallback>{comment.commentCreator?.name?.slice(0, 1).toUpperCase()}</Avatar.Fallback>
                        </Avatar>
                        <div>
                          <h5 className="text-xs font-semibold text-slate-900 hover:underline cursor-pointer transition-all duration-200 hover:text-indigo-600">
                            <Link to={`/user/${comment.commentCreator?._id}`}>
                              {comment.commentCreator?.name}
                            </Link>
                          </h5>
                          <span className="text-[10px] text-slate-400">{moment(comment.createdAt).fromNow()}</span>
                        </div>
                      </div>

                      {canDelete ? (
                        <Dropdown>
                          <Dropdown.Trigger className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200/50 transition-colors cursor-pointer outline-none">
                            <MoreHorizontal size={14} />
                          </Dropdown.Trigger>
                          <Dropdown.Popover className="bg-white border border-slate-200 rounded-xl shadow-lg p-1 min-w-32 z-50">
                            <Dropdown.Menu aria-label="Comment actions" className="outline-none">
                              {canEdit && (
                                <Dropdown.Item
                                  id="edit"
                                  className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer outline-none"
                                >
                                  <button
                                    type="button"
                                    onClick={() => setEditingCommentId(comment._id)}
                                    className="flex items-center gap-2 w-full text-left"
                                  >
                                    <Pencil size={13} />
                                    <span>Edit</span>
                                  </button>
                                </Dropdown.Item>
                              )}
                              <Dropdown.Item
                                id="delete"
                                className="px-2.5 py-1.5 text-xs text-rose-600 rounded-lg hover:bg-rose-50 cursor-pointer outline-none"
                              >
                                <DeleteCommentBtn postId={post._id} commentId={comment._id} />
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown.Popover>
                        </Dropdown>
                      ) : (
                        <Dropdown>
                          <Dropdown.Trigger className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200/50 transition-colors cursor-pointer outline-none">
                            <MoreHorizontal size={14} />
                          </Dropdown.Trigger>
                          <Dropdown.Popover className="bg-white border border-slate-200 rounded-xl shadow-lg p-1 min-w-32 z-50">
                            <Dropdown.Menu aria-label="Comment actions" className="outline-none">
                              <Dropdown.Item
                                id="hide"
                                className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-gray-600 rounded-lg hover:bg-gray-50 cursor-pointer outline-none"
                              >
                                <EyeClosed size={13} />
                                <span>Hide this comment</span>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown.Popover>
                        </Dropdown>
                      )}
                    </div>

                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      {comment.content}
                    </p>

                    {comment.image && (
                      <div
                        onClick={() => setPreviewImage(comment.image || null)}
                        className="mt-2 rounded-lg overflow-hidden max-w-xs border border-slate-200/70 cursor-pointer group"
                      >
                        <img
                          src={comment.image}
                          alt="Comment attachment"
                          className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-3 px-2 text-[11px] text-slate-500 font-medium">
                  <button
                    type="button"
                    onClick={() => toggleReplies(comment._id)}
                    className={`hover:text-indigo-600 cursor-pointer transition-colors ${openReplies[comment._id] ? 'text-indigo-600 font-semibold' : ''
                      }`}
                  >
                    Reply
                  </button>
                  <span>·</span>
                  <LikeBtnforComment userData={userData} postId={post._id} likes={comment.likes || []} commentId={comment._id} />
                </div>

                <CommentReplies
                  postId={post._id}
                  userData={userData}
                  commentId={comment._id}
                  commentCreatorName={comment.commentCreator?.name}
                  isOpen={Boolean(openReplies[comment._id])}
                />

              </div>
            </div>

          </React.Fragment>
          );
        })}


        {commentsCount < allComments.length && <button onClick={() => setCommentsCount(commentsCount + 5)} className="text-sm rounded-2xl p-2 bg-linear-to-br from-indigo-500 to-purple-600 hover:bg-none border border-indigo-600 transition-all duration-300 ease-in-out hover:text-indigo-500 text-white w-fit self-center cursor-pointer">View more comments</button>}

      </div>}

      <SendComment postid={post._id} />

      <ImageModal
        isOpen={Boolean(previewImage)}
        onClose={() => setPreviewImage(null)}
        imageUrl={previewImage}
      />
    </div>
  );
}

