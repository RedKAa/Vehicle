/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import {
  getCookie,
  deleteAllCookie,
  removeLocalStorage,
  removeUserInfo,
  removeAppToken,
  getAppToken,
} from './utils';
import { setAuthority } from './authority';
import { logOut } from '@/services/user';

const codeMessage = {
  200: 'Thực hiện thành công.',
  201: 'Tạo thành công',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: 'There was an error in the requested request, and the server did not create or modify data.',
  401: 'The user does not have permission (token, user name, wrong password).',
  403: 'The user is authorized, but access is prohibited.',
  404: 'Resource Empty',
  406: '请求的格式不可得。',
  412: 'Cập nhật không thành công, Quản trị viên chưa duyệt nội dung này',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  430: 'Tạo không thành công',
  500: 'Có lỗi xảy ra. Vui lòng thử lại',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errorHandler = (error) => {
  console.log('error', error.data);
  const { response } = error;
  console.log('response', response);
  if (response && response.status) {
    console.log('response.body.message', response.body?.message);
    console.log('err.response.data.message', error.response.data?.message);
    const errorText = error.data?.errors
      ? error.data?.errors[0]?.messages[0] ?? (codeMessage[response.status] || response.statusText)
      : error.data.message;
    const { status, url, ...params } = response;
    if (status == 404) {
      notification.info({
        message: `Request Error ${status}: ${url}`,
        description: errorText,
      });
    }
    else if (status == 412) {
      notification.error({
        message: `Cập nhật không thành công`,
        description: "Quản trị viên chưa duyệt nội dung này",
      });
    }
    else if (status == 430) {
      notification.error({
        message: `Cập nhật không thành công`,
        description: errorText,
      });
    }
    else if (status == 431) {
      notification.error({
        message: `Cập nhật không thành công`,
        description: "Quản trị viên chưa duyệt nội dung này",
      });
    }
    else {
      notification.error({
        message: `Có lỗi xảy ra`,
        description: errorText,
      });
    }
  } else if (!response) {
    notification.error({
      description: 'Kết nối mạng của bạn không ổn định và không thể kết nối tới máy chủ',
      message: 'Sự cố kết nối',
    });
  }
  throw error;
  return response;
};

const request = extend({
  // eslint-disable-next-line no-undef
  prefix: API_URL,
  // prefix: 'https://192.168.88.52:45455/api/v1',
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   Referer: 'strict-origin-when-cross-origin',
  // },
  errorHandler,
});

request.interceptors.request.use((url, options) => {
  const jwtToken = getAppToken();
  const { method } = options;

  

  if (method === 'put' || method === 'post'){
    Object.assign(options.headers, {
      'Content-Type' : 'application/json;charset=UTF-8',
    });
  }

  Object.assign(options.headers, {
    Authorization: `Bearer ${jwtToken}`,
  });
  
  return { url, options };
});

request.interceptors.response.use((response, options) => {
  const { status } = response;
  const { method } = options;
  if (options.responseType === 'blob') {
    return response;
  }
  switch (status) {
    case 200:
      if (method !== 'GET')
        notification.success({
          message: 'Thành công',
          description: codeMessage[200],
        });
      break;
    case 201:
      if (method !== 'GET')
        notification.success({
          message: 'Thành công',
          description: codeMessage[201],
        });
      break;
    case 401:
      notification.error({
        message: 'Unauthorization',
        description: 'Not Logged in. Please Loggin',
      });
      /* eslint-disable no-underscore-dangle */
      logOut();
      location.href = '/login';
      // setTimeout(() => {
      //   window.g_app._store.dispatch({
      //     type: 'login/logout',
      //   });
      // }, 3000);
      break;
    case 403:
      notification.error({
        message: response.statusText,
        description: `Your request to ${response.url} was forbiden`,
      });
      break;
    case 405:
      notification.error({
        message: response.statusText,
        description: `${response.body.message}`,
      });
      break;
    default:
      break;
  }

  return response;
});

/**
 * 异常处理程序
 */

/**
 * 配置request请求时的默认参数
 */

export default request;
