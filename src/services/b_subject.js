import request from '@/utils/requestServer';
export const updateSubject = (id, data) => request.put(`/subjects/${id}`, { data });
export const createSubject = (data) => request.post('/subjects', { data });
export const deleteSubject = (id) => request.delete(`/subjects/${id}`);

export const getSubjects = (name) => {
  return request.get('/subjects', {
    params: {
      'name': name,
      'status': 'Active'
    },
    useCache: true,
  });
};

export const activationById = (id, data) => {
  return request.put(`/subjects/${id}`, {
    data: {
      ...data
    },
  });
}