import request from '@/utils/requestServer';

export const updateProvider = (providerId, data) => request.put(`/providers/${providerId}`, { data });
export const createProvider = (data) => request.post('/providers', { data });
// export const deleteProvider = (providerId) => request.delete(`/providers/${providerId}`);
// export const deleteProvider = (providerId) => request.delete(`/providers/${providerId}`, { status: "Disable" });
export const getProvidersByName = (name) => {
    return request.get('/providers', {
      params: {
        'ProviderName': name,
        'status': 'Active'
      },
      useCache: true,
    });
  };

  export const getProvidersById = (id) => {
    return request.get('/providers', {
      params: {
        'id': id,
      },
      useCache: true,
    });
  };