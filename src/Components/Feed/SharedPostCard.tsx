import { Avatar } from '@heroui/react';
import { Share2, Clock } from 'lucide-react';
import moment from 'moment';
import { Link } from 'react-router';

interface SharedPostCardProps {
  sharedPost: {
    _id?: string;
    body?: string;
    image?: string;
    createdAt?: string;
    user?: {
      _id?: string;
      name?: string;
      username?: string;
      photo?: string;
    };
  } | null | undefined;
}

export default function SharedPostCard({ sharedPost }: SharedPostCardProps) {
  if (!sharedPost || typeof sharedPost !== 'object') {
    return null;
  }

  const { user, body, image, createdAt } = sharedPost;

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 hover:bg-slate-50/90 transition-all duration-200 p-3.5 sm:p-4 flex flex-col gap-3 group">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar size="sm" className="w-8 h-8 shrink-0 ring-1 ring-slate-200 shadow-xs">
            <Avatar.Image src={user?.photo} alt={user?.name} />
            <Avatar.Fallback className="bg-indigo-100 text-indigo-700 text-xs font-semibold">
              {user?.name?.slice(0, 1)?.toUpperCase() || 'U'}
            </Avatar.Fallback>
          </Avatar>

          <div className="min-w-0 flex flex-col">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link to={`/user/${user?._id}`}>
                <h5 className="text-xs font-bold text-slate-900 hover:text-indigo-600 transition-colors truncate">
                  {user?.name || 'Unknown User'}
                </h5>
              </Link>
              {user?.username && (
                <span className="text-[11px] text-slate-400 font-normal truncate">
                  @{user.username}
                </span>
              )}
            </div>

            {createdAt && (
              <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                <Clock size={10} className="text-slate-400" />
                <span>{moment(createdAt).fromNow()}</span>
              </div>
            )}
          </div>
        </div>

        <div >
          
          <Link className="flex items-center gap-1 text-[10px] font-medium text-indigo-600 bg-indigo-50/80 px-2 py-0.5 rounded-full shrink-0" to={`/post/${sharedPost._id}`}> <Share2 size={11} /><span className="hidden sm:inline">Original Post</span></Link>
        </div>
      </div>

      {body && (
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed break-words">
          {body}
        </p>
      )}

      {image && (
        <div className="rounded-xl overflow-hidden border border-slate-200/70 max-h-80 sm:max-h-96 bg-slate-100">
          <img
            src={image}
            alt="Shared post attachment"
            className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
