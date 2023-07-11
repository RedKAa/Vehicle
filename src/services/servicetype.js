import request from '@/utils/requestServer';

// export const updateProvider = (providerId, data) => request.put(`/providers/${providerId}`, { data });
// export const createProvider = (data) => request.post('/providers', { data });
export const getServiceType = (name) => {
    return request.get('/servicetypes', {
      params: {
        'name': name,
        'status': 'Active'
      },
      useCache: true,
    });
  };

export const updateServiceType = (serviceId, data) => request.put(`/servicetypes/${serviceId}`, { data });
export const createServiceType = (data) => request.post('/servicetypes', { data });
export const deleteServiceType = (serviceId) => request.delete(`/servicetypes/${serviceId}`);

export const activationById = (id, data) => {
  return request.put(`/servicetypes/${id}`, {
    data: {
      ...data
    },
  });
}