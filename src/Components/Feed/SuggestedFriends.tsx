import { useState } from 'react';
import { Link } from 'react-router';
import { Avatar } from '@heroui/react';
import { Users, RefreshCw, Sparkles, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useGet from '../../Hooks/useGet';
import FollowBtn from '../Common/FollowBtn';
import SuggestedFriendsSkeleton from './SuggestedFriendsSkeleton';

import type { SuggestedUser } from '../../Types';

export default function SuggestedFriends() {
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const getFriends = useGet('/users/suggestions?limit=5');

  const {
    data: users,
    isPending,
    isFetching,
    refetch,
    isError,
  } = useQuery<SuggestedUser[]>({
    queryKey: ['suggestedFriends'],
    queryFn: () => getFriends(),
    select: (data: any) => data?.data?.suggestions || [],
    retry: 3,
  });

  if (isPending) {
    return <SuggestedFriendsSkeleton />;
  }

  if (isError) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col items-center justify-center text-center gap-3">
        <div className="p-2.5 bg-rose-50 text-rose-500 rounded-2xl">
          <Users size={20} />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-800">
            Couldn't load suggestions
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Something went wrong while fetching friends.
          </p>
        </div>
        <button
          type="button"
          onClick={() => refetch()}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
        >
          Try again
        </button>
      </div>
    );
  }

  const userCount = users?.length || 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-5 flex flex-col gap-3.5 shadow-xs transition-all">
      <div
        onClick={() => setIsOpenMobile((prev) => !prev)}
        className={`flex items-center justify-between cursor-pointer lg:cursor-default select-none ${
          isOpenMobile
            ? 'pb-2 border-b border-slate-100'
            : 'pb-0 lg:pb-2 lg:border-b border-slate-100'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl">
            <Sparkles size={14} />
          </div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 tracking-tight">
              Suggested For You
            </h3>
            {userCount > 0 && (
              <span className="lg:hidden text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100/60">
                {userCount}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              refetch();
            }}
            disabled={isFetching}
            className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-xl hover:bg-indigo-50/60 transition-all cursor-pointer disabled:opacity-50"
            title="Refresh suggestions"
            aria-label="Refresh suggestions"
          >
            <RefreshCw
              size={13}
              className={`transition-transform duration-500 ${
                isFetching ? 'animate-spin text-indigo-600' : ''
              }`}
            />
          </button>

          <div className="lg:hidden p-1 text-slate-400">
            <ChevronDown
              size={18}
              className={`transition-transform duration-200 ${
                isOpenMobile ? 'rotate-180 text-indigo-600' : ''
              }`}
            />
          </div>
        </div>
      </div>

      <div className={`${isOpenMobile ? 'block' : 'hidden'} lg:block transition-all`}>
        {userCount === 0 ? (
          <div className="py-6 flex flex-col items-center justify-center text-center gap-2">
            <div className="p-2.5 bg-slate-50 text-slate-400 rounded-2xl">
              <Users size={20} />
            </div>
            <p className="text-xs font-semibold text-slate-700">No suggestions yet</p>
            <p className="text-[11px] text-slate-400 max-w-[180px]">
              Check back later to connect with new people.
            </p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-slate-100/80">
            {users?.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between py-2.5 first:pt-0.5 last:pb-0 gap-3 group"
              >
                <Link
                  to={`/user/${user._id}`}
                  className="flex items-center gap-3 min-w-0 flex-1 hover:opacity-90 transition-opacity"
                >
                  <Avatar size="sm" className="shrink-0 ring-2 ring-indigo-500/10">
                    <Avatar.Image src={user.photo} alt={user.name} />
                    <Avatar.Fallback className="bg-indigo-50 text-indigo-600 font-semibold text-xs">
                      {user.name?.charAt(0) || 'U'}
                    </Avatar.Fallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug truncate group-hover:text-indigo-600 transition-colors">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                      {user.mutualFollowersCount > 0 ? (
                        <>
                          <Users size={11} className="text-slate-400 shrink-0" />
                          <span>{user.mutualFollowersCount} mutual</span>
                        </>
                      ) : user.followersCount > 0 ? (
                        <>
                          <Users size={11} className="text-slate-400 shrink-0" />
                          <span>{user.followersCount} followers</span>
                        </>
                      ) : (
                        <span>@{user.username || 'user'}</span>
                      )}
                    </p>
                  </div>
                </Link>

                <div className="shrink-0">
                  <FollowBtn userId={user._id} initialIsFollowing={false} size="sm" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
