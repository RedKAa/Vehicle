import request from '@/utils/requestServer';

export const getPost = (params) =>
  request.get('/posts', {
    params,
  });
export const updatePost = (id, data) => request.put(`/posts/${id}`, { data });
// export const createPost = (data) => request.post('/posts', { data });
export const deletePost = (id) => request.delete(`/posts/${id}`);
// export const createMutiPost = (data) => request.post('/login/addmany', { data });

export const getPostById = (id) => {
  return request.get(`/posts`, {
    params: {
      id: id,
    },
  });
};

export const updatePostById = (id, dataUpdate) => {
  return request.put(`/posts/${id}`, {
    data: {
      ...dataUpdate
    },
  });
}

export const createPost = (data) => {
  return request.post(`/posts`, {
    data: {
      ...data
    },
  });
}

export const activationById = (id, data) => {
  return request.put(`/posts/${id}`, {
    data: {
      ...data
    },
  });
}
