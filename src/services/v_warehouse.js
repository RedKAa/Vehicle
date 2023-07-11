import request from '@/utils/requestServer';

export const getWarehouseByName = (name) => {
  return request.get('/warehouses', {
    params: {
      'name': name,
      'status': 'Active'
    },
    useCache: true,
  });
};
export const updateWarehouse =(id, data) => request.put(`/warehouses/${id}`, { data });
export const createWarehouse =(data) => request.post('/warehouses', { data });
export const deleteWarehouse =(id) => request.delete(`/warehouses/${id}`);

export const activationById = (id, data) => {
  return request.put(`/warehouses/${id}`, {
    data: {
      ...data
    },
  });
}

export const getWarehouseById = (id) => {
  return request.get('/warehouses', {
    params: {
      'id': id,
    }
  });
};