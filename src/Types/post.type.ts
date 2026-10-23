import type { User } from './user.type';
import type { TopComment } from './comment.type';

export interface PostCardI {
  _id: string;
  body: string;
  image?: string;
  privacy: string;
  user: User;
  sharedPost?: any;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment?: TopComment;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked?: boolean;
}

export interface PostsResponse {
  data: {
    posts: PostCardI[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface PostDetailsResponse {
  data: {
    post: PostCardI;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface GetPostResponse {
  data: {
    post: PostCardI;
  };
}

import type { InfiniteData } from '@tanstack/react-query';

export interface LikePostContext {
  previousPosts: InfiniteData<PostsResponse> | PostsResponse | undefined;
  previousPostDetails: PostDetailsResponse | undefined;
  previousUserProfilePosts: PostsResponse | undefined;
}
