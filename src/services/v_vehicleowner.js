import request from '@/utils/requestServer';
import { getCurrentId } from '@/utils/utils';

export const getVehicleOwnerByPhone = (phone) => {
  return request.get('/vehicleowners', {
    params: {
      'phone': phone,
      'status': 'Active'
    },
    useCache: true,
  });
};
export const updateVehicleOwner =(id, data) => request.put(`/vehicleowners/${id}`, {
  data: {
    ...data,
    updateBy: getCurrentId(),
    entityType: "VehicleOwner"
  },
 });
export const createVehicleOwner =(data) => request.post('/vehicleowners', {
  data: {
    ...data,
    entityType: "VehicleOwner"
  }
});
export const deleteVehicleOwner =(id) => request.delete(`/vehicleowners/${id}`);

export const activationById = (id, data) => {
  return request.put(`/vehicleowners/${id}`, {
    data: {
      ...data,
      updateBy: getCurrentId(),
      entityType: "VehicleOwner"
    },
  });
}

export const getVehicleOwnerById = (id) => {
  return request.get('/vehicleowners', {
    params: {
      'id': id,
    }
  });
};