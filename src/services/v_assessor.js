import request from '@/utils/requestServer';
export const getAvailableAssessorsByAddress = (address) => {
    return request.get('/assessors', {
      params: {
        'address': address,
        'status': 'Active'
      },
      useCache: true,
    });
  };

export const updateAssessor = (id, data) => request.put(`/assessors/${id}`, { data });