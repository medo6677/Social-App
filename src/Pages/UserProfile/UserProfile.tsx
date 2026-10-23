import UserProfileHeader from '../../Components/UserProfile/UserProfileHeader';
import UserProfileTabs from '../../Components/UserProfile/UserProfileTabs';
import UserProfileSkeleton from '../../Components/UserProfile/UserProfileSkeleton';
import useGet from '../../Hooks/useGet';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { TokenContext } from '../../Components/Context/TokenContext';
import useDocumentTitle from '../../Hooks/useDocumentTitle';

export default function UserProfile() {
  const { id } = useParams()
  const getUserProfile = useGet(`/users/${id}/profile`)
  const getUserProfilePosts = useGet(`/users/${id}/posts`)
  const tokenContext = useContext(TokenContext);
  const userData = tokenContext?.userData;
  const navigate = useNavigate()

  useEffect(() => {
    if (id === userData?._id) {
      navigate("/profile", { replace: true })
    }
  }, [id, userData?._id, navigate])

  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: () => getUserProfile()
    , select: (data) => data?.data
  })
  const { data: userProfilePosts } = useQuery({
    queryKey: ["userProfilePosts", id],
    queryFn: () => getUserProfilePosts()
    , select: (data) => data?.data?.posts
  })

  useDocumentTitle(userProfile?.user?.name ? `${userProfile.user.name}` : 'User Profile');

  if (!userData) {
    return null
  }

  if (isLoading) return <UserProfileSkeleton />

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 pb-16 animate-in fade-in duration-300">
      <UserProfileHeader userProfile={userProfile} postsCount={userProfilePosts?.length} />
      <UserProfileTabs userData={userData} userPosts={userProfilePosts} />
    </div>
  );
}
