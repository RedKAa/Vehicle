import request from '@/utils/requestServer';

export const getAreaStaff = (params) =>
  request.get(`/areas/staffs`, {
    params,
  });

export const createAreaStaff = (data) =>
  request.post(`/areas/staffs`, {
    data,
  });

export const updateAreaStaff = (staffId, data) =>
  request.put(`/areas/staffs/${staffId}`, {
    data,
  });

export const removeAreaStaff = (staffId) => request.delete(`/areas/staffs/${staffId}`);
