import request from '@/utils/requestServer';
export const getAvailableStaffsByAddress = (address) => {
    return request.get('/staffs', {
      params: {
        'address': address,
        'status': 'Active'
      },
      useCache: true,
    });
  };

export const updateStaff = (id, data) => request.put(`/staffs/${id}`, { data });