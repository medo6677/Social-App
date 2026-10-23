import {
  Calendar,
  Share2,
  Mail,
  MailIcon,
  Cake,
} from 'lucide-react';
import { Avatar } from '@heroui/react';
import FollowBtn from '../Common/FollowBtn';
import moment from 'moment';



import type { UserProfileData } from '../../Types';

type Props = {
  userProfile: UserProfileData;
  postsCount?: number;
};

export default function UserProfileHeader({ userProfile, postsCount }: Props) {

  const { user, isFollowing } = userProfile
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
      <div className="relative h-48 sm:h-64 w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
        {user.cover && (
          <img
            src={user.cover}
            alt="Profile cover banner"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />
      </div>

      <div className="px-4 sm:px-8 pb-6 sm:pb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
          <div className="relative w-fit">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full ring-4 ring-white shadow-xl overflow-hidden bg-slate-100">
              <Avatar className="w-full h-full">
                <Avatar.Image
                  src={user.photo}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
                <Avatar.Fallback className="text-2xl font-bold bg-indigo-500 text-white flex items-center justify-center w-full h-full">
                  {user.name}
                </Avatar.Fallback>
              </Avatar>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:mb-2">
            <FollowBtn userId={user.id} size="md" isFollowing={isFollowing} />

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-150 cursor-pointer active:scale-95"
            >
              <Mail size={16} />
              <span>Message</span>
            </button>

            <button
              type="button"
              aria-label="Share profile"
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all duration-150 cursor-pointer active:scale-95"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {user.name}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            @{user.username}
          </p>
        </div>

        <div className="mb-6 max-w-2xl">
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-xs text-slate-500 font-medium">

            <div className="flex items-center gap-1.5">
              <MailIcon size={14} className="text-slate-400" />
              <a
                href={`mailto:${user.email}`}
                className="text-indigo-600 hover:underline hover:text-indigo-700"
              >
                {user.email}
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-slate-400" />
              <span>Joined {moment(user.createdAt).format("MMM YYYY")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cake size={14} className="text-slate-400" />
              <span>Date of Birth : {moment(user.dateOfBirth).format(" MMM, D, YYYY")}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 pt-5 border-t border-slate-100 max-w-md">
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold text-slate-900">
              {postsCount}
            </span>
            <span className="text-xs text-slate-400">Posts</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold text-slate-900">
              {user.followersCount}
            </span>
            <span className="text-xs text-slate-400">Followers</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold text-slate-900">
              {user.followingCount}
            </span>
            <span className="text-xs text-slate-400">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
}
