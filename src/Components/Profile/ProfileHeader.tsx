import {
  Calendar,
  CheckCircle2,
  Edit3,
  Share2,
  Bookmark,
  Users,
  UserCheck,
  FileText,
  MailIcon,
  Cake,
} from 'lucide-react';
import { Avatar } from '@heroui/react';
import type { UserProfileT } from '../../Types/api.type';
import moment from 'moment';
import ImgUploadBtn from './ImgUploadBtn';
import toast from 'react-hot-toast';
import CoverUpload from './CoverUpload';
import { Link } from 'react-router';

export default function ProfileHeader({ userData, postsCount, BookmarksLength }: { userData: UserProfileT, postsCount: number, BookmarksLength: number }) {


  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
      <div className="relative h-48 sm:h-64 w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
        {userData.cover && <> <img
          src={userData.cover}
          alt="Profile cover banner"
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        /></>}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />

        <CoverUpload cover={userData?.cover} />
      </div>

      <div className="px-4 sm:px-8 pb-6 sm:pb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
          <div className="relative w-fit">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full ring-4 ring-white shadow-xl overflow-hidden bg-slate-100">
              <Avatar className="w-full h-full">
                <Avatar.Image
                  src={userData.photo}
                  alt="Sarah Jenkins"
                  className="w-full h-full object-cover"
                />
                <Avatar.Fallback className="text-2xl font-bold bg-indigo-500 text-white flex items-center justify-center w-full h-full">
                  {userData.name.split(' ').map((n: string) => n[0]).join("")}
                </Avatar.Fallback>
              </Avatar>
            </div>
            <ImgUploadBtn />
          </div>

          <div className="flex items-center gap-2.5 sm:mb-2">
            <Link
              to={`/settings`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all duration-150 cursor-pointer"
            >
              <Edit3 size={15} />
              <span>Edit Profile</span>
            </Link>
            <button
              type="button"
              aria-label="Share profile"
              onClick={() => {
                const url = window.location.origin + `/user/${userData._id}`
                navigator.clipboard.writeText(url)
                toast.success("Profile URL copied to clipboard")
              }}
              className="inline-flex items-center justify-center p-2.5 sm:px-4 sm:py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-150 cursor-pointer"
            >
              <Share2 size={16} />
              <span className="hidden sm:inline ml-2">Share</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {userData.name}
            </h1>
            <CheckCircle2
              size={18}
              className="text-indigo-600 fill-indigo-100 shrink-0"
              aria-label="Verified account"
            />
          </div>
          <p className="text-sm font-medium text-slate-500">
            @{userData.username}
          </p>
        </div>

        <div className="mb-6 max-w-2xl">
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <MailIcon size={14} className="text-slate-400" />
              <a
                href={`mailto:${userData.email}`}
                className="text-indigo-600 hover:underline hover:text-indigo-700"
              >
                {userData.email}
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-slate-400" />
              <span>Joined {moment(userData.createdAt).format("MMM YYYY")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cake size={14} className="text-slate-400" />
              <span>Date of Birth : {moment(userData.dateOfBirth).format(" MMM, D, YYYY")}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/70 hover:bg-slate-100/70 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <FileText size={18} />
            </div>
            <div>
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {postsCount}
              </p>
              <p className="text-[11px] font-medium text-slate-500">
                Posts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/70 hover:bg-slate-100/70 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Users size={18} />
            </div>
            <div>
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {userData.followersCount}
              </p>
              <p className="text-[11px] font-medium text-slate-500">
                Followers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/70 hover:bg-slate-100/70 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
              <UserCheck size={18} />
            </div>
            <div>
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {userData.followingCount}
              </p>
              <p className="text-[11px] font-medium text-slate-500">
                Following
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/70 hover:bg-slate-100/70 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Bookmark size={18} />
            </div>
            <div>
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {BookmarksLength}
              </p>
              <p className="text-[11px] font-medium text-slate-500">
                Saved Posts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
