import { useState } from 'react';
import {
  Grid,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Sparkles,
} from 'lucide-react';
import { Avatar } from '@heroui/react';
import LikeBtn from '../Common/LikeBtn';
import type { PostCardI } from '../../Types/api.type';
import moment from 'moment';
import ShareBtn from '../Common/ShareBtn';
import type { User } from '../../Types/api.type';
import ImageModal from '../Common/ImageModal';
import { Link } from 'react-router';

type Props = {
  userPosts?: PostCardI[];
  userData: User;
};

export default function UserProfileTabs({ userPosts, userData }: Props) {
  const [activeTab, setActiveTab] = useState<'posts' | 'media'>('posts');
  const [viewMode, setViewMode] = useState<'cards' | 'grid'>('cards');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  if (!userData) {
    return null
  }
  const posts = userPosts || [];


  const mediaPosts = posts.filter((p) => p.image);

  const displayedPosts = activeTab === 'media' ? mediaPosts : posts;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-2xl border border-slate-100 p-2 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${activeTab === 'posts'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
          >
            <Grid size={16} />
            <span>Posts</span>
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${activeTab === 'posts'
                ? 'bg-white/20 text-white'
                : 'bg-slate-100 text-slate-600'
                }`}
            >
              {posts.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('media')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${activeTab === 'media'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
          >
            <Sparkles size={16} />
            <span>Media</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${viewMode === 'cards'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
              }`}
          >
            Feed
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${viewMode === 'grid'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
              }`}
          >
            Grid
          </button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="flex flex-col gap-4">
          {displayedPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col gap-4 hover:border-slate-200 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar size="sm" className="ring-1 ring-slate-100">
                    <Avatar.Image src={post.user.photo} alt={post.user.name} />
                    <Avatar.Fallback>
                      {post.user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </Avatar.Fallback>
                  </Avatar>
                  <div>
                    <Link to={`/user/${post.user._id}`}><h3 className="text-sm font-semibold text-slate-900">{post.user.name}</h3>
                    </Link>
                    <Link to={`/post/${post._id}`}><p className="text-xs text-slate-400">{moment(post.createdAt).fromNow()}</p></Link>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Options"
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {post.body}
              </p>

              {post.image && (
                <div
                  onClick={() => setPreviewImage(post.image || null)}
                  className="rounded-xl overflow-hidden border border-slate-100 max-h-96 cursor-pointer group"
                >
                  <img
                    src={post.image}
                    alt="Post visual"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-slate-500 text-xs font-medium">
                <div className="flex items-center gap-4">
                  <LikeBtn userData={userData} postId={post._id} likes={post.likes} hideText={true} />
                  <button
                    type="button"
                    className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    <MessageCircle size={16} />
                    <span>{post.commentsCount}</span>
                  </button>
                  <ShareBtn userData={userData} post={post} hideText={true} className='' />
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {displayedPosts.map((post) => (
            <div
              key={post._id}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 cursor-pointer"
            >
              {post.image ? (
                <img
                  src={post.image}
                  alt="Thumbnail"
                  onClick={() => setPreviewImage(post.image || null)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="p-4 h-full flex flex-col justify-between bg-linear-to-br from-indigo-50/70 to-purple-50/70 text-slate-800">
                  <p className="text-xs line-clamp-4 leading-relaxed font-medium">
                    {post.body}
                  </p>
                  <span className="text-[10px] text-indigo-600 font-semibold">Text post</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 text-white font-semibold text-xs transition-opacity duration-200">
                <span className="flex items-center gap-1">
                  <Heart size={14} className="fill-white" />
                  {post.likesCount}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={14} className="fill-white" />
                  {post.commentsCount}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <ImageModal
        isOpen={Boolean(previewImage)}
        onClose={() => setPreviewImage(null)}
        imageUrl={previewImage}
      />
    </div>
  );
}
