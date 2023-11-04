import { history } from 'umi';
import { message } from 'antd';
import { parse } from 'qs';
import { fakeAccountLogin, getFakeCaptcha, loginByEmail, getCurrentUser } from './service';
import { setAppToken, setCookie, setLocalStorage, setUserInfo } from '@/utils/utils';
import { LeftCircleFilled } from '@ant-design/icons';
export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority)); // hard code
  // reload Authorized component

  try {
    if (window.reloadAuthorized) {
      window.reloadAuthorized();
    }
  } catch (error) {
    // do not need do anything
    alert(error.message);
  }

  return authority;
}
const Model = {
  namespace: 'userAndlogin',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      try {
        let response = {};
        if (payload.email === 'admintest' && payload.password === '123123123') {
          response = {
            data: {
              access_token: 'MOCKUP_TOKEN',
              name: 'FptBlog Admin',
              id: 1,
              role: 'Admin',
              avatarLink:
                'https://firebasestorage.googleapis.com/v0/b/unidelivery-fad6f.appspot.com/o/avatar.png?alt=media&token=5af53d2f-6798-46be-adba-1e6b31d16edd',
            },
          };
        }
        else {
          response = yield call(loginByEmail, payload);
        }
        if (response) {
          yield put({
            type: 'updateAppToken',
            payload: response,
          }); // Login successfully

          if(payload.email !== 'admintest'){response = yield call(getCurrentUser);}
          if(response) {
            yield put({
              type: 'changeLoginStatus',
              payload: response,
            });

              const urlParams = new URL(window.location.href);
              const params = getPageQuery();
              let { redirect } = params;

              if (redirect) {
                const redirectUrlParams = new URL(redirect);

                if (redirectUrlParams.origin === urlParams.origin) {
                  redirect = redirect.substr(urlParams.origin.length);

                  if (redirect.match(/^\/.*#/)) {
                    redirect = redirect.substr(redirect.indexOf('#') + 1);
                  }
                } else {
                  window.location.href = redirect;
                  return;
                }
                history.replace(redirect || '/');
            } else {
              yield put({
                type: 'loginError',
                payload:
                  response.status == 404
                    ? 'Email đăng nhập hoặc mật khẩu không đúng'
                    : 'Có lỗi khi đăng nhập',
              });
            }
            window.location.reload(false);
          }
        }
      } catch (error) {
        yield put({
          type: 'loginError',
          payload: error.message,
        });
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
  },
  reducers: {
    updateAppToken(state, { payload }) {
      if (payload) {
        setAppToken(payload);
      }
      return { ...state, status: payload.status, type: payload.type, error: null };
    },
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.role);
      setUserInfo(payload);
      return { ...state, status: payload.status, type: payload.type, error: null };
    },
    loginError(state, { payload }) {
      return { ...state, error: payload };
    },
  },
};
export default Model;
