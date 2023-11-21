import { PostResponseDTO } from "./dto/post.response.dto";

export const postSwagger = {
  CREATE_POST: {
    descr: {
      summary: 'Create post',
      description: 'You must to add token to Headers (Authorization field)',
    },
    res: {
      status: 200,
      type: PostResponseDTO,
    },
  },
  GET_POST_BY_ID: {
    descr: {
      summary: 'Get one post by id',
      description: 'You must to add token to Headers (Authorization field)',
    },
    res: {
      status: 200,
      type: PostResponseDTO,
    },
  },
  DELETE_POST_BY_ID: {
    descr: {
      summary: 'Delete post by id',
      description: 'You must to add token to Headers (Authorization field)',
    },
    res: {
      status: 200,
      type: Number,
    },
  },
  GET_ALL_POSTS: {
    descr: {
      summary: 'Get all posts',
      description: 'You must to add token to Headers (Authorization field)',
    },
    res: {
      status: 200,
      type: PostResponseDTO,
    },
  },
};
