import request from '@/utils/requestServer';

export const getPost = (params) =>
  request.get('/posts', {
    params,
  });
export const updatePost = (postId, data) => request.put(`/posts/${postId}`, { data });
export const createPost = (data) => request.post('/posts', { data });
export const deletePost = (postId) => request.delete(`/posts/${postId}`);
export const createMutiPost = (data) => request.post('/login/addmany', { data });

export const activationById = (id, data) => {
  return request.put(`/posts/${id}`, {
    data: {
      ...data
    },
  });
}
