import request from '@/utils/requestServer';
import { getCurrentAssessorId } from '@/utils/utils';

export const getVehicleByID = (id) => {
  return request.get('/vehicles', {
    params: {
      'id': id,
      'status': 'Active'
    },
    useCache: true,
  });
};
export const getVehicleByOwnerPhoneIR = (phone) => {
  return request.get('/vehicles', {
    params: {
      'ownerphone': phone,
      'vehicleStatus': 'Draft'
    },
    useCache: true,
  });
};
export const getVehicleByOwnerPhoneSO = (phone) => {
  return request.get('/vehicles', {
    params: {
      'ownerphone': phone,
      'vehicleStatus': 'Inventory'
    },
    useCache: true,
  });
};
export const updateVehicle =(id, data) => request.put(`/vehicles/${id}`, { data });
export const createVehicle =(data) => request.post('/vehicles', {
   data: {
      ...data
    },
 });
export const deleteVehicle =(id) => request.delete(`/vehicles/${id}`);

export const activationById = (id, data) => {
  return request.put(`/vehicles/${id}`, {
    data: {
      ...data
    },
  });
}

export const getVehicleById = (id) => {
  return request.get('/vehicles', {
    params: {
      'id': id,
    }
  });
};