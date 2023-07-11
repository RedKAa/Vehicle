import request from '@/utils/requestServer';

export const createArticle = (storeId, data) => {
  return request.post(`/stores/${storeId}/articles`, {
    data,
  });
};

export const getArticleById = (storeId, articleId) => {
  return request.get(`/stores/${storeId}/articles`, {
    params: {
      id: articleId,
    },
  });
};

export const updateArticleById = (storeId, articleId, updateArticle) => {
  return request.put(`/stores/${storeId}/articles/${articleId}`, {
    data: updateArticle,
  });
};

export const updateBlogPostById = (storeId, blogPostId, updateBlogPost) => {
  return request.put(`/stores/${storeId}/articles/${blogPostId}`, {
    data: updateBlogPost,
  });
};

export const changeArticleType = (storeId, articleType) => {
  return request.put(`/stores/${storeId}/articles/switch`, {
    params: {
      articleType,
    },
  });
};
