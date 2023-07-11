import request from '@/utils/requestServer';

export const updateRank = (rankId, data) => request.put(`/ranks/${rankId}`, { data });
export const createRank = (data) => request.post('/ranks', { data });
export const deleteRank = (rankId) => request.delete(`/ranks/${rankId}`);

export const activationById = (id, data) => {
  return request.put(`/ranks/${id}`, {
    data: {
      ...data
    },
  });
}