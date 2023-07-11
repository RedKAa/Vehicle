import request from '@/utils/requestServer';

// export const updateProvider = (providerId, data) => request.put(`/providers/${providerId}`, { data });
// export const createProvider = (data) => request.post('/providers', { data });
export const getPlaces = (name) => {
    return request.get('/places', {
      params: {
        'name': name,
        'status': 'Active'
      },
      useCache: true,
    });
  };

  export const updatePlaceById = (id, data) => {
    return request.put(`/places/${id}`, {
      data: {
        ...data
      },
    });
  }

export const updatePlace = (id, data) => request.put(`/places/${id}`, { data });
export const createPlace = (data) => request.post('/places', { data });