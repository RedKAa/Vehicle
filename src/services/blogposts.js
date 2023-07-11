import request from '@/utils/requestServer';

export const updateBlogPostById = (blogPostId, updateBlogPost) => {
  console.log('updateBlogPostById', updateBlogPost);
  return request.put(`/blogs/${blogPostId}`, {
    data: {
      ...updateBlogPost
    },
  });
}

export const getAllBlogPost = () => {
  return request.get(`/blogs`);
}

export const createBlogPostById = (newBlogPost) => {
  return request.post(`/blogs`, {
    data: {
      ...newBlogPost
    },
  });
}

export const getBlogPostById = (blogPostId) => {
  return request.get(`/blogs`, {
    params: {
      id: blogPostId,
    },
  });
};

export const deleteBlogPostId = (blogPostId) => {
  return request.delete(`/blogs/${blogPostId}`);
}
