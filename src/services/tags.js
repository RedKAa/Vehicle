import request from '@/utils/requestServer';
export const updateTag = (tagId, data) => request.put(`/tags/${tagId}`, { data });
export const createTag = (data) => request.post('/tags', { data });
export const deleteTag = (tagId) => request.delete(`/tags/${tagId}`);

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