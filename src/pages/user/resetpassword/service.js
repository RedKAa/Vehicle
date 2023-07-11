import request from '@/utils/requestServer';
export const resetPassword = (data) => {
  return request.post(`/login/forgot?newPassword=${data.newPassword}`);
}
