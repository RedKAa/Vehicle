import request from '@/utils/requestServer';
export const updateRank = (id, data) => request.put(`/ranks/${id}`, { data });
export const createRank = (data) => request.post('/ranks', { data });
export const deleteRank = (id) => request.delete(`/ranks/${id}`);

export const getRanks = (name) => {
  return request.get('/ranks', {
    params: {
      'name': name,
      'status': 'Active',
      'exp': expRequired,
      'des': description,
    },
    useCache: true,
  });
};

export const activationById = (id, data) => {
  return request.put(`/ranks/${id}`, {
    data: {
      ...data
    },
  });
}
