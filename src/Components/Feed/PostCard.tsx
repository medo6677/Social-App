import { Avatar, Button, Dropdown } from '@heroui/react';
import { Edit2Icon, EyeClosed, MessageCircle, MoreHorizontal, Pencil, Star} from 'lucide-react';
import moment from 'moment';
import type { PostCardI, User } from '../../Types/api.type';
import PostComments from './PostComments';
import LikeBtn from '../Common/LikeBtn';
import { useState } from 'react';
import SharedPostCard from './SharedPostCard';
import DeleteBtn from '../Common/DeleteBtn';
import DeleteCommentBtn from '../Common/DeleteCommentBtn';
import SavePost from '../Common/SavePost';
import ShareBtn from '../Common/ShareBtn';
import LikeBtnforComment from './LikeBtnforComment';
import UpdatePost from './UpdatePost';
import { Link } from 'react-router';
import ImageModal from '../Common/ImageModal';



interface PostCardProps {
  post: PostCardI;
  userData: User
}

export default function PostCard({ post, userData }: PostCardProps) {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const postOwnerId = typeof post.user === 'object' ? (post.user?._id || post.user?._id) : post.user;
  const isPostOwner = Boolean(userData?._id && postOwnerId === userData._id);
  const isTopCommentCreator = Boolean(userData?._id && post.topComment?.commentCreator?._id === userData._id);
  const canDeleteTopComment = isTopCommentCreator || isPostOwner;
  const canEditTopComment = isTopCommentCreator;
  return (
    <article className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 flex flex-col gap-4 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar size="sm" className="ring-1 ring-slate-100">
            <Avatar.Image src={post.user.photo} alt={post.user.name} />
            <Avatar.Fallback>{post.user.name.slice(0, 1).toUpperCase()}</Avatar.Fallback>
          </Avatar>

          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="text-sm font-semibold text-slate-900 leading-tight">
                <Link to={`/user/${post.user._id}`} className="cursor-pointer duration-300 hover:text-indigo-600 hover:underline hover:underline-2 hover:underline-offset-2 "> {post.user.name}</Link>
              </h4>
              {post.sharedPost && (
                <span className="text-xs text-slate-400 font-normal">
                  shared a post
                </span>
              )}
            </div>
            <Link to={`/post/${post._id}`}><p className="text-xs text-slate-400 mt-0.5">
              {moment(post.createdAt).fromNow()}
            </p></Link>
          </div>
        </div>

        {post.user._id === userData?._id ? <>
          <Dropdown>
            <Dropdown.Trigger className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer outline-none">
              <MoreHorizontal size={18} />
            </Dropdown.Trigger>
            <Dropdown.Popover className="bg-white border border-slate-200 rounded-xl shadow-lg p-1 min-w-36 z-50">
              <Dropdown.Menu aria-label="Post actions" className="outline-none">
                <Dropdown.Item
                  id="edit"
                  className="px-3 py-1.5 text-xs text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer outline-none flex items-center gap-1"
                >
                  <button onClick={() => setIsEditing(true)} className='flex items-center gap-2 w-full'><Edit2Icon size={16} /><span>Edit Post</span></button>
                </Dropdown.Item>
                <Dropdown.Item
                  id="save"
                  className="px-3 py-1.5 text-xs text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer outline-none flex items-center gap-1"
                >
                  <SavePost userData={userData} postId={post._id} bookmarked={post.bookmarked ?? false} />
                </Dropdown.Item>
                <Dropdown.Item
                  id="delete"
                  className="px-3 py-1.5 text-xs text-red-500 rounded-lg hover:bg-red-50 cursor-pointer outline-none flex items-center gap-1  "
                >

                  <DeleteBtn postId={post._id} />
                </Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </> :
          <>
            <Dropdown>
              <Dropdown.Trigger className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer outline-none">
                <MoreHorizontal size={18} />
              </Dropdown.Trigger>
              <Dropdown.Popover className="bg-white border border-slate-200 rounded-xl shadow-lg p-1 min-w-36 z-50">
                <Dropdown.Menu aria-label="Post actions" className="outline-none">
                  <Dropdown.Item
                    id="save"
                    className="px-3 py-1.5 text-xs text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer outline-none flex items-center gap-1"
                  >
                    <SavePost userData={userData} postId={post._id} bookmarked={post.bookmarked ?? false} />
                  </Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </>
        }
      </div>

      {isEditing ? <UpdatePost post={post} setPostEdit={setIsEditing} /> : <>
        <p className="text-sm text-slate-700 leading-relaxed wrap-break-word">
          {post.body}
        </p>

        {post.image && (
          <div
            onClick={() => setPreviewImage(post.image || null)}
            className="rounded-xl overflow-hidden border border-slate-100 max-h-96 bg-slate-50 cursor-pointer group"
          >
            <img
              src={post.image}
              alt="Post attachment"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </div>
        )}
      </>}

      {post.sharedPost && (
        <SharedPostCard sharedPost={post.sharedPost} />
      )}

      <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
        <span>{post.likesCount} Likes</span>
        <div className="flex gap-3">
          <span>{post.commentsCount} Comments</span>
          <span>{post.sharesCount} Shares</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-y border-slate-100 py-1">
        <LikeBtn postId={post._id} userData={userData} likes={post.likes || []} />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowComments(!showComments)}
          className="flex-1 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 gap-2 text-xs font-medium rounded-xl h-9 cursor-pointer"
        >
          <MessageCircle size={16} />
          <span>Comment</span>
        </Button>

        <ShareBtn userData={userData} post={post} />
      </div>





      {showComments ? <PostComments userData={userData} post={post} /> : post.topComment && <>    <div className="flex flex-col gap-3">
        <div className="relative">
          <div className="bg-slate-50/90 rounded-2xl p-3 relative group">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Avatar size="sm" className="w-7 h-7 shrink-0 ring-1 ring-slate-100">
                  <Avatar.Image src={post.topComment.commentCreator?.photo} />
                  <Avatar.Fallback>{post.topComment.commentCreator?.name?.slice(0, 1).toUpperCase()}</Avatar.Fallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h5 className="text-xs font-semibold text-slate-900 hover:underline cursor-pointer transition-all duration-200 hover:text-indigo-600">
                      <Link to={`/user/${post.topComment.commentCreator?._id}`}>
                        {post.topComment.commentCreator?.name}
                      </Link>
                    </h5>
                    <span className="text-xs text-yellow-500 font-semibold flex items-center gap-0.5"><Star size={12} /> TOP</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{moment(post.topComment.createdAt).fromNow()}</span>
                </div>
              </div>

              {canDeleteTopComment ? (
                <Dropdown>
                  <Dropdown.Trigger className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200/50 transition-colors cursor-pointer outline-none">
                    <MoreHorizontal size={14} />
                  </Dropdown.Trigger>
                  <Dropdown.Popover className="bg-white border border-slate-200 rounded-xl shadow-lg p-1 min-w-32 z-50">
                    <Dropdown.Menu aria-label="Comment actions" className="outline-none">
                      {canEditTopComment && (
                        <Dropdown.Item
                          id="edit"
                          className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 rounded-lg hover:bg-slate-50 cursor-pointer outline-none"
                        >
                          <Pencil size={13} />
                          <span>Edit</span>
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item
                        id="delete"
                        className="px-2.5 py-1.5 text-xs text-rose-600 rounded-lg hover:bg-rose-50 cursor-pointer outline-none"
                      >
                        <DeleteCommentBtn postId={post._id} commentId={post.topComment._id} />
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

            <p className="text-xs text-slate-700 mt-1 leading-relaxed wrap-break-word">
              {post.topComment.content}
            </p>

            {post.topComment.image && (
              <div
                onClick={() => setPreviewImage(post.topComment?.image || null)}
                className="mt-2 rounded-lg overflow-hidden max-w-xs border border-slate-200/70 cursor-pointer group"
              >
                <img
                  src={post.topComment.image}
                  alt="Comment attachment"
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 px-2 pt-1 text-[11px] text-slate-500 font-medium">
            <button
              type="button"
              className="hover:text-indigo-600 cursor-pointer transition-colors"
            >
              Reply
            </button>
            <span>·</span>
            <LikeBtnforComment userData={userData} postId={post._id} likes={post.topComment.likes || []} commentId={post.topComment._id} />
          </div>
        </div>
      </div></>}


      <ImageModal
        isOpen={Boolean(previewImage)}
        onClose={() => setPreviewImage(null)}
        imageUrl={previewImage}
      />
    </article>
  );
}
