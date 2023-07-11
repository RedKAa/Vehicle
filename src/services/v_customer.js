import request from '@/utils/requestServer';
import { getCurrentId } from '@/utils/utils';

export const getCustomerByName = (name) => {
  return request.get('/customers', {
    params: {
      'name': name,
      'status': 'Active'
    },
    useCache: true,
  });
};
export const getCustomerByPhone = (phone) => {
  return request.get('/customers', {
    params: {
      'phone': phone,
      'status': 'Active'
    },
    useCache: true,
  });
};
export const updateCustomer =(id, data) => request.put(`/customers/${id}`, {
  data: {
    ...data,
    updateBy: getCurrentId(),
    entityType: "Customer"
  },
 });
export const createCustomer =(data) => request.post('/customers', {
  data: {
    ...data,
    entityType: "Customer"
  }
});
export const deleteCustomer =(id) => request.delete(`/customers/${id}`);

export const activationById = (id, data) => {
  return request.put(`/customers/${id}`, {
    data: {
      ...data,
      updateBy: getCurrentId(),
      entityType: "Customer"
    },
  });
}

export const getCustomerById = (id) => {
  return request.get('/customers', {
    params: {
      'id': id,
    }
  });
};