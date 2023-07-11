import request from '@/utils/requestServer';

export const updateDestinationLocation = (destinationId, updateData) => {
  return request.put(`/destinations/${destinationId}`, { data: updateData });
};

export const createDestinationLocation = (data) => {
  return request.post(`/destinations`, { data });
};

export const deleteDestinationLocation = (destinationLocationID) => {
  return request.delete(`/destinations/${destinationLocationID}`);
};
