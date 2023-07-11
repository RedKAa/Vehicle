import request from '@/utils/requestServer';

export const getMenus = (params) => {
  return request.get(`/menus`, {
    params,
  });
};

export const addProductIntoMenu = (prod, menuId) => {
  return request.post(`/menus/${menuId}/products`, {
    data: prod,
  });
};

export const deleteMenu = (menuId) => {
  return request.delete(`/menus/${menuId}`);
};

export const updateMenuInfo = (menuId, updateInfo) => {
  return request.put(`/menus/${menuId}`, {
    data: updateInfo,
  });
};
export const updateProductInMenu = (prod, menuId) => {
  return request.put(`/menus/${menuId}/products`, {
    data: prod,
  });
};

export const deleteProductInMenu = (prods, menuId) => {
  return request.delete(`/menus/${menuId}/products`, {
    data: prods,
  });
};

export const addMenuIntoStore = (menu) => {
  return request.post(`/menus`, {
    data: menu,
  });
};
