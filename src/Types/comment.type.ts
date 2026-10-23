import type { PostsResponse } from './post.type';

export interface CommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface TopComment {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
  post: string;
  parentComment?: any;
  likes: any[];
  createdAt: string;
  image?: string;
}

export interface CommentReply {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
  post: string;
  parentComment?: string;
  likes: any[];
  createdAt: string;
  image?: string;
}

export interface CommentsResponse {
  data: {
    comments: TopComment[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface LikeCommentContext {
  previousComments: CommentsResponse | undefined;
  previousPosts: PostsResponse | undefined;
}
