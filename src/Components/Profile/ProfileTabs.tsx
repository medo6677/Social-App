import { useState } from 'react';
import {
  Grid,
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
} from 'lucide-react';
import { Avatar, Dropdown } from '@heroui/react';
import type { PostCardI, User } from '../../Types/api.type';
import moment from 'moment';
import DeleteBtn from '../Common/DeleteBtn';
import SavePost from '../Common/SavePost';
import LikeBtn from '../Common/LikeBtn';
import ShareBtn from '../Common/ShareBtn';
import { Link } from 'react-router';
import ImageModal from '../Common/ImageModal';

export default function ProfileTabs({ userPosts, userBookmarks, userdata }: { userPosts: PostCardI[], userBookmarks: PostCardI[], userdata: User }) {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');
  const [viewMode, setViewMode] = useState<'cards' | 'grid'>('cards');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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
            <span>My Posts</span>
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${activeTab === 'posts'
                ? 'bg-white/20 text-white'
                : 'bg-slate-100 text-slate-600'
                }`}
            >
              {userPosts?.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${activeTab === 'saved'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
          >
            <Bookmark size={16} />
            <span>Saved Posts</span>
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${activeTab === 'saved'
                ? 'bg-white/20 text-white'
                : 'bg-slate-100 text-slate-600'
                }`}
            >
              {userBookmarks?.length}
            </span>
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

      {activeTab === 'posts' && (
        <>
          {viewMode === 'cards' ? (
            <div className="flex flex-col gap-4">
              {userPosts?.map((post) => (
                <article
                  key={post._id}
                  className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col gap-4 hover:border-slate-200 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" className="ring-1 ring-slate-100">
                        <Avatar.Image
                          src={post.user.photo}
                          alt={post.user.name}
                        />
                        <Avatar.Fallback>{post.user.name?.split(' ').map((n: string) => n[0]).join("")}</Avatar.Fallback>
                      </Avatar>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                          {post.user.name}
                        </h3>
                        <Link to={`/post/${post._id}`}> <p className="text-xs text-slate-400">{moment(post.createdAt).format("DD  MMM YYYY")}</p>
                        </Link>
                      </div>
                    </div>
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
                            <SavePost userData={userdata} postId={post._id} bookmarked={post.bookmarked ?? false} />
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
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    {post.body}
                  </p>

                  {post.image && (
                    <div
                      onClick={() => setPreviewImage(post.image || null)}
                      className="rounded-xl overflow-hidden border border-slate-100 max-h-96 cursor-pointer group"
                    >
                      <img
                        src={post.image}
                        alt="Post media"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-slate-500 text-xs font-medium">
                    <div className="flex items-center gap-4">
                      <LikeBtn userData={userdata} postId={post._id} likes={post.likes} hideText={true} />
                      <button
                        type="button"
                        className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors cursor-pointer"
                      >
                        <MessageCircle size={16} />
                        <span>{post.commentsCount}</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <SavePost userData={userdata} postId={post._id} bookmarked={post.bookmarked ?? false} hideText={true} />
                      <ShareBtn userData={userdata} hideText={true} post={post} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {userPosts?.map((post: PostCardI) => (
                <div
                  key={post.id}
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
                      <span className="text-[10px] text-indigo-600 font-semibold">
                        Text post
                      </span>
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
        </>
      )}

      {activeTab === 'saved' && (
        <div className="flex flex-col gap-4">
          <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl flex items-center gap-2.5 text-xs text-amber-800">
            <Bookmark size={15} className="text-amber-600 shrink-0 fill-amber-600" />
            <span>
              You have <strong>{userBookmarks?.length || 0} saved posts</strong>. Only you can see your saved collection.
            </span>
          </div>

          {viewMode === 'cards' ? (
            <div className="flex flex-col gap-4">
              {userBookmarks?.map((item: PostCardI) => (
                <article
                  key={item._id || item.id}
                  className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col gap-4 hover:border-slate-200 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" className="ring-1 ring-slate-100">
                        <Avatar.Image src={item.user?.photo} alt={item.user?.name} />
                        <Avatar.Fallback>{item.user?.name?.[0]}</Avatar.Fallback>
                      </Avatar>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900 leading-tight">
                          <Link to={`/user/${item.user?._id}`}>{item.user?.name}</Link>
                        </h3>
                        <p className="text-xs text-slate-400">
                          @{item.user?.username} · {moment(item.createdAt).fromNow()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg text-xs font-semibold">
                      <Bookmark size={13} className="fill-amber-600" />
                      <span>Saved</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    {item.body}
                  </p>

                  {item.image && (
                    <div className="rounded-xl overflow-hidden border border-slate-100 max-h-96">
                      <img
                        src={item.image}
                        alt="Saved attachment"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-slate-500 text-xs font-medium">
                    <div className="flex items-center gap-4">
                      <LikeBtn userData={userdata} postId={item._id} likes={item.likes} hideText={true} />
                      <button
                        type="button"
                        className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors cursor-pointer"
                      >
                        <MessageCircle size={16} />
                        <span>{item.commentsCount}</span>
                      </button>
                    </div>
                    <div className="w-auto">
                      <SavePost userData={userdata} postId={item._id} bookmarked={true} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {userBookmarks?.map((item: PostCardI) => (
                <div
                  key={item._id || item.id}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 cursor-pointer"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt="Thumbnail"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="p-4 h-full flex flex-col justify-between bg-linear-to-br from-amber-50/70 to-orange-50/70 text-slate-800">
                      <p className="text-xs line-clamp-4 leading-relaxed font-medium">
                        {item.body}
                      </p>
                      <span className="text-[10px] text-amber-600 font-semibold">
                        Text post
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 text-white font-semibold text-xs transition-opacity duration-200">
                    <span className="flex items-center gap-1">
                      <Heart size={14} className="fill-white" />
                      {item.likesCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={14} className="fill-white" />
                      {item.commentsCount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
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
