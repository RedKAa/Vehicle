import request from '@/utils/requestRouting';

export const updateDriver = (driverId, data) => {
  return request.put(`/drivers/${driverId}`, {
    data,
  });
};

export const deleteDriver = (driverId) => {
  return request.delete(`/drivers/${driverId}`);
};
