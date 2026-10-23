import { useContext } from 'react';
import ProfileHeader from '../../Components/Profile/ProfileHeader';
import ProfileTabs from '../../Components/Profile/ProfileTabs';
import ProfileSkeleton from '../../Components/Profile/ProfileSkeleton';
import { useQuery } from '@tanstack/react-query';
import useGet from '../../Hooks/useGet';
import { TokenContext } from '../../Components/Context/TokenContext';
import useDocumentTitle from '../../Hooks/useDocumentTitle';

export default function Profile() {
  useDocumentTitle('My Profile');
  const tokenContext = useContext(TokenContext);
  const user = tokenContext?.userData;

  const getUserBookmarks = useGet(`/users/bookmarks`);
  const getUserPosts = useGet(`/users/${user?._id}/posts`);

  const { data: userPosts } = useQuery({
    queryKey: ["userPosts", user?._id],
    queryFn: () => getUserPosts(),
    enabled: Boolean(user?._id),
    select: (data) => data?.data?.posts
  });

  const { data: userBookmarks } = useQuery({
    queryKey: ["userBookmarks", user?._id],
    queryFn: () => getUserBookmarks(),
    enabled: Boolean(user?._id),
    select: (data) => data?.data?.bookmarks
  });

  if (!user) return <ProfileSkeleton />;

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 pb-12">
      <ProfileHeader userData={user} postsCount={userPosts?.length || 0}  BookmarksLength={userBookmarks?.length || 0}/>
      <ProfileTabs userdata={user} userBookmarks={userBookmarks} userPosts={userPosts} />
    </div>
  );
}
