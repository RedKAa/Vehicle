import request from '@/utils/requestServer';

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function loginByEmail(data) {
  return request('/login', {
    method: 'POST',
    data,
  });
}

export async function getCurrentUser(options) {
  return request('/users/current', {
    method: 'GET',
    ...(options || {}),
  });
}

export const getUserById = (id) => {
  return request.get('/users', {
    params: {
      'Ids': id,
    },
  });
};