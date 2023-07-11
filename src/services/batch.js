import request from '@/utils/requestRouting';
import requestServer from '@/utils/requestServer';

export const getBatch = (options = {}) => {
  return request.get('/batchs', { ...options, prefix: API_BATCH_URL });
};

export const getBatchById = (batchId, options = {}) => {
  return request.get(`/batchs/${batchId}`, { ...options });
};

export const createArea = (area) => {
  return request.post('/areas', { data: area, prefix: API_BATCH_URL });
};

export const updateArea = (id, data) => {
  return request.put(`/areas/${id}`, { data, prefix: API_BATCH_URL });
};

export const getAreaById = (id) => {
  return request.get(`/areas/${id}`, { prefix: API_BATCH_URL });
};

export const deleteArea = (id) => {
  return request.delete(`/areas/${id}`, { prefix: API_BATCH_URL });
};

export const createClient = (area) => {
  return request.post('/clients', { data: area, prefix: API_BATCH_URL });
};

// driver

export const getDriverOfArea = (areaId = 3) => {
  return request.get(`/areas/${areaId}/drivers`, {
    prefix: API_BATCH_URL,
    headers: {
      'X-API-KEY':
        'WPtBjoESTkSKsMoezOjDcY3eQZBz9XPmv3Ftv2jv+rtL4XdhFUB19SGTGZYr1yQjTj0eVbQiv6TJ7mlnKrVGUg==',
    },
  });
};

export const triggerBatch = (menu_id) =>
  requestServer.post(`/areas/batchs/trigger`, {
    params: {
      'menu-id': menu_id,
    },
  });

export const rerunBatch = (batch_id) => requestServer.post(`/areas/batchs/${batch_id}/re-run`);
