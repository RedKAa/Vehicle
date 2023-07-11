import request from '@/utils/requestServer';
import { getCurrentProviderId } from '@/utils/utils';

const providerId = getCurrentProviderId();


export const getServiceByName = (name) => {
  return request.get('/services', {
    params: {
      'name': name,
      'status': 'Active',
      providerId
    },
    useCache: true,
  });
};
export const updateService = (serviceId, data) => request.put(`/services/${serviceId}`, { data });
export const createService = (data) => request.post('/services', { data });
export const deleteService = (serviceId) => request.delete(`/services/${serviceId}`);

export const activationById = (id, data) => {
  return request.put(`/services/${id}`, {
    data: {
      ...data
    },
  });
}

export const getServiceById = (id) => {
  return request.get('/services', {
    params: {
      'id': id,
    }
  });
};