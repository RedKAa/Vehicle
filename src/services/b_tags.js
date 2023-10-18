import request from '@/utils/requestServer';
export const updateTag = (id, data) => request.put(`/tags/${id}`, { data });
export const createTag = (data) => request.post('/tags', { data });
export const deleteTag = (id) => request.delete(`/tags/${id}`);

export const getTags = (name) => {
  return request.get('/tags', {
    params: {
      'name': name,
      'status': 'Active'
    },
    useCache: true,
  });
};

export const activationById = (id, data) => {
  return request.put(`/tags/${id}`, {
    data: {
      ...data
    },
  });
}
