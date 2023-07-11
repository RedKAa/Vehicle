import { setAuthority } from '@/utils/authority';
import request from '@/utils/requestServer';
import {
  getCookie,
  deleteAllCookie,
  removeLocalStorage,
  removeUserInfo,
  removeAppToken,
  getAppToken,
  getUserInfo,
} from '@/utils/utils';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return JSON.parse(getUserInfo());
}
export async function queryNotices() {
  return request('/api/notices');
}

export async function logOut() {
  deleteAllCookie();
  removeLocalStorage('SYSTEM_ROLE');
  setAuthority(null);
  removeAppToken();
  removeUserInfo();
}
