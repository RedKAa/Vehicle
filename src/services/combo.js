
import request from '@/utils/requestServer';

export const createCombo = (combo) => {
  return request.post(`/combos`, {
    data: {
      ...combo
    },
  });
}

export const getComboById = (id) =>{
  return request.get(`/combos/${id}`);
}

export const updateComboById = (id, combo) => {
  return request.put(`/combos/${id}`, {
    data: {
      ...combo
    },
  });
}
