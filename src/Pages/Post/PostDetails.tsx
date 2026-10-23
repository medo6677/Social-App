import { useParams, useNavigate, Link } from 'react-router';
import {
  ArrowLeft,
  MessageCircle,
  MoreHorizontal,
  Link2,
  Maximize2,
  BadgeCheck,
} from 'lucide-react';
import { Avatar } from '@heroui/react';
import useGet from '../../Hooks/useGet';
import { useQuery } from '@tanstack/react-query';
import PostDetailsSkeleton from './PostDetailsSkeleton';
import type { GetPostResponse } from '../../Types';
import SavePost from '../../Components/Common/SavePost';
import moment from 'moment';
import LikeBtn from '../../Components/Common/LikeBtn';
import ShareBtn from '../../Components/Common/ShareBtn';
import FollowBtn from '../../Components/Common/FollowBtn';
import PostComments from '../../Components/Feed/PostComments';
import toast from 'react-hot-toast';
import { useContext, useState } from 'react';
import { TokenContext } from '../../Components/Context/TokenContext';
import ImageModal from '../../Components/Common/ImageModal';
import useDocumentTitle from '../../Hooks/useDocumentTitle';

export default function PostDetails() {
  const tokenContext = useContext(TokenContext);
  const userData = tokenContext?.userData;
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const getPost = useGet(`/posts/${id}`);
  const { data, isLoading } = useQuery({
    queryKey: ['postDetails', id],
    queryFn: () => getPost(),
    select: (data: GetPostResponse) => data.data.post
  });

  useDocumentTitle(data?.user?.name ? `${data.user.name}'s Post` : 'Post');

  if (!userData) {
    return null;
  }

  if (isLoading) return <PostDetailsSkeleton />;



  return (
    data && <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 pb-16 animate-in fade-in duration-300">
      <header className="sticky top-20 z-20 backdrop-blur-xl bg-white/80 border border-slate-200/80 rounded-2xl px-4 sm:px-6 py-3.5 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-700 transition-all duration-150 cursor-pointer active:scale-95"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
              Post Thread
            </span>
            <span className="hidden sm:inline text-slate-300">/</span>
            <span className="hidden sm:inline text-xs text-slate-500 font-medium">
              @{data.user.username}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Copy link"
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url);
              toast.success("Link copied to clipboard");
            }}
            className="inline-flex items-center gap-1.5 whitespace-nowrap px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100/80 hover:bg-slate-200/80 rounded-xl transition-all duration-150 cursor-pointer active:scale-95"
          >
            <Link2 size={16} className="shrink-0" />

            <span className="hidden sm:inline whitespace-nowrap">Share Link</span>
          </button>

          <SavePost
            userData={userData}
            postId={data._id}
            hideText={true}
            bookmarked={data.bookmarked ?? false}
            iconSize={18}
            className="p-2 hover:bg-slate-100 text-slate-700 rounded-xl transition-all duration-150 cursor-pointer active:scale-95 flex items-center justify-center"
          />
        </div>
      </header>

      <article className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden flex flex-col divide-y divide-slate-100">
        <div className="p-3 sm:p-8 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <Avatar size="sm" className="ring-2 ring-indigo-500/20 shadow-xs shrink-0 sm:w-12 sm:h-12">
              <Avatar.Image
                src={data.user.photo}
                alt={data.user.name}
              />
              <Avatar.Fallback className="bg-indigo-600 text-white font-bold">
                {data.user.name.split(' ').map((name: string) => name[0]).join('')}
              </Avatar.Fallback>
            </Avatar>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1 min-w-0">
                <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug truncate">
                  <Link to={`/user/${data.user._id}`}>{data.user.name}</Link>
                </h1>
                <BadgeCheck size={14} className="text-indigo-600 fill-indigo-100 shrink-0" />
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5 flex-wrap">
                <span className="font-medium text-slate-500 truncate max-w-[90px]">@{data.user.username}</span>
                <span className="shrink-0">·</span>
                <span className="shrink-0 whitespace-nowrap">{moment(data.createdAt).fromNow()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <FollowBtn userId={data.user._id} size="sm" />
            <button
              type="button"
              aria-label="Options"
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        <div className="px-4 sm:px-8 py-4 sm:py-6 flex flex-col gap-4">
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal whitespace-pre-line">
            {data.body}
          </p>

          {data.image && (
            <div
              onClick={() => setIsImageOpen(true)}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-950 shadow-md max-h-[600px] flex items-center justify-center cursor-pointer"
            >
              <img
                src={data.image}
                alt="Post visual showcase"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsImageOpen(true);
                }}
                aria-label="Expand image"
                className="absolute top-4 right-4 p-2.5 bg-black/50 hover:bg-black/70 text-white backdrop-blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="px-3 sm:px-8 py-3 sm:py-4 flex flex-col gap-2.5 bg-slate-50/40">
          <div className="flex items-center gap-2 sm:gap-4 text-xs text-slate-500 font-medium flex-wrap">
            <span><strong className="text-slate-700 font-bold">{data.likesCount}</strong> Likes</span>
            <span className="text-slate-300">·</span>
            <span><strong className="text-slate-700 font-bold">{data.commentsCount}</strong> Comments</span>
            <span className="text-slate-300">·</span>
            <span><strong className="text-slate-700 font-bold">{data.sharesCount}</strong> Shares</span>
          </div>

          <div className="flex items-center border-t border-slate-200/60 pt-1.5 gap-0.5">
            <LikeBtn userData={userData} postId={data._id} likes={data.likes} iconSize={16} />

            <button
              type="button"
              onClick={() => {
                const input = document.getElementById(`comment-input-${data._id}`);
                if (input) {
                  input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  input.focus();
                }
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-medium text-xs text-slate-600 hover:bg-indigo-50/50 hover:text-indigo-600 transition-all duration-200 cursor-pointer active:scale-95 h-8"
            >
              <MessageCircle size={15} className="shrink-0" />
              <span className="hidden min-[360px]:inline">Comment</span>
            </button>

            <ShareBtn userData={userData} post={data} iconSize={15} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-medium text-xs text-slate-600 hover:bg-indigo-50/50 hover:text-indigo-600 transition-all duration-200 cursor-pointer active:scale-95 h-8" />

            <SavePost
              userData={userData}
              postId={data._id}
              bookmarked={data.bookmarked ?? false}
              hideText={false}
              iconSize={15}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-medium text-xs text-slate-600 hover:bg-indigo-50/50 hover:text-indigo-600 transition-all duration-200 cursor-pointer active:scale-95 h-8 whitespace-nowrap"
            />
          </div>
        </div>

        <section aria-label="Post comments" className="p-3 sm:p-8 flex flex-col gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900">Comments</h2>
            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              {data.commentsCount}
            </span>
          </div>

          <PostComments userData={userData} post={data} />
        </section>
      </article>

      <ImageModal
        isOpen={isImageOpen}
        onClose={() => setIsImageOpen(false)}
        imageUrl={data.image || null}
        alt="Post visual showcase"
      />
    </div>
  );
}
