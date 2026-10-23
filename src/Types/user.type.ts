export interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
  email?: string;
}

export interface UserProfileT {
  _id: string;
  name: string;
  username: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  photo: string;
  cover: string;
  bookmarks: string[];
  followers: string[];
  following: string[];
  createdAt: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  id: string;
}

export interface UserProfileData {
  isFollowing: boolean;
  user: UserProfileT;
}

export interface SuggestedUser {
  _id: string;
  name: string;
  username: string;
  photo: string;
  mutualFollowersCount: number;
  followersCount: number;
}
