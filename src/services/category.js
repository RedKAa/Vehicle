import request from '@/utils/requestServer';

export async function getCategories(brand_id) {
  return request.get(`/categories`, {
    brand_id,
    useCache: true,
  });
}

export async function deleteCategories(cate_idList) {
  return request.delete(`/categories`, {
    data: cate_idList,
  });
}

export async function updateCategory(id, updateCate) {
  return request.put(`/categories/${id}`, {
    data: updateCate,
  });
}
export const createCategory = (newCategory) => {
  return request.post(`/categories`, {
    data: newCategory,
  });
};
