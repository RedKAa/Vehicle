import request from '@/utils/requestServer';

export const getAccount = (params) =>
  request.get('/users', {
    params,
  });
export const updateAccount = (accountId, data) => request.put(`/users/${accountId}`, { data });
export const createAccount = (data) => request.post('/login/signup', { data });
export const deleteAccount = (accountId) => request.delete(`/users/${accountId}`);
export const createMutiAccount = (data) => request.post('/login/addmany', { data });

export const activationById = (id, data) => {
  return request.put(`/users/${id}`, {
    data: {
      ...data
    },
  });
}