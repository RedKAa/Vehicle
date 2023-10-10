// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;

const ROLE_DATA = {
  SYSTEM_ADMIN: 'Admin',
  ASSESSOR: 'Assessor',
  STAFF: 'Staff',
  SELLER: 'Seller'
};

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'vi-VN',
    // default true, when it is true, will use `navigator.language` overwrite default
    // antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  define: {
    // API_BATCH_URL: 'http://13.212.101.182:8089/api/v1',
    // API_URL: 'http://13.212.101.182:8090/api/admin',
    API_BATCH_URL:
      REACT_APP_ENV == 'dev'
        ? 'http://13.212.101.182:8089/api/v1'
        : 'http://13.212.101.182:8088/api/v1',
    API_URL:
      REACT_APP_ENV == 'dev'
        ? 'https://webapp-230621221913.azurewebsites.net/api'
        : 'https://webapp-230621221913.azurewebsites.net/api',
    REQUEST_HEADER_VALUE: 'bPG0upAJLk0gz/2W1baS2Q==',
    REACT_APP_ENV,
    ROLE_DATA,
    X_API_KEY:
      'WPtBjoESTkSKsMoezOjDcY3eQZBz9XPmv3Ftv2jv+rtL4XdhFUB19SGTGZYr1yQjTj0eVbQiv6TJ7mlnKrVGUg==',
    X_CLIENT_ID: '3',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
              exact: true,
            },
            {
              path: `/user/login`,
              component: './user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              name: 'resetpassword',
              icon: 'smile',
              path: '/user/resetpassword/',
              component: './user/resetpassword',
            },
            {
              component: './404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: [ROLE_DATA.SYSTEM_ADMIN],
          routes: [
            {
              path: '/',
              redirect: '/profile',
            },
            {
              path: '/accounts',
              name: 'Người dùng',
              icon: 'user-add',
              component: './account/',
              authority: [ROLE_DATA.SYSTEM_ADMIN],
            },
            {
              name: 'Phiếu nhập xe',
              icon: 'shopping',
              path: '/itemreceipts/',
              authority: [ROLE_DATA.SYSTEM_ADMIN,ROLE_DATA.STAFF, ROLE_DATA.ASSESSOR],
              routes: [
                {
                  path: '/itemreceipts/',
                  redirect: '/itemreceipts/index',
                },
                {
                  name: 'Phiếu nhập xe',
                  hideInMenu: true,
                  path: '/itemreceipts/index',
                  component: './v_itemreceipt/index',
                },
                {
                  name: 'Tạo phiếu nhập xe',
                  hideInMenu: true,
                  path: '/itemreceipts/create',
                  component: './v_itemreceipt/create',
                },
                {
                  name: 'Phiếu nhập xe',
                  hideInMenu: true,
                  path: '/itemreceipts/:updateId',
                  component: './v_itemreceipt/[updateId]',
                },
              ],
            }, //end
            {
              name: 'Phiếu bán hàng',
              icon: 'shopping',
              path: '/saleorders/',
              authority: [ROLE_DATA.SYSTEM_ADMIN, ROLE_DATA.SELLER],
              routes: [
                {
                  path: '/saleorders/',
                  redirect: '/saleorders/index',
                },
                {
                  name: 'Phiếu bán hàng',
                  hideInMenu: true,
                  path: '/saleorders/index',
                  component: './v_saleorder/index',
                },
                {
                  name: 'Tạo phiếu bán hàng',
                  hideInMenu: true,
                  path: '/saleorders/create',
                  component: './v_saleorder/create',
                },
                {
                  name: 'Phiếu bán hàng',
                  hideInMenu: true,
                  path: '/saleorders/:updateId',
                  component: './v_saleorder/[updateId]',
                },
              ],
            }, //end
            {
              name: 'Phiếu nhập/xuất kho',
              icon: 'shopping',
              path: '/transferorders/',
              authority: [ROLE_DATA.STAFF,ROLE_DATA.SYSTEM_ADMIN],
              routes: [
                {
                  path: '/transferorders/',
                  redirect: '/transferorders/index',
                },
                {
                  name: 'Danh sách phiếu nhập/xuất kho',
                  hideInMenu: true,
                  path: '/transferorders/index',
                  component: './v_transferorder/index',
                },
                {
                  name: 'Tạo phiếu nhập kho',
                  hideInMenu: true,
                  path: '/transferorders/create_ir',
                  component: './v_transferorder/create_ir',
                },
                {
                  name: 'Tạo phiếu xuất kho',
                  hideInMenu: true,
                  path: '/transferorders/create_so',
                  component: './v_transferorder/create_so',
                },
                // {
                //   name: 'update',
                //   hideInMenu: true,
                //   path: '/transferorders/:updateId',
                //   component: './v_transferorder/[updateId]',
                // },
              ],
            }, //end
            {
              path: '/sellers',
              name: 'Nhân viên bán hàng',
              icon: 'user',
              component: './seller/',
              authority: [ROLE_DATA.SYSTEM_ADMIN],
            },
            {
              path: '/assessors',
              name: 'Thẩm định viên',
              icon: 'user',
              component: './v_assessor/',
              authority: [ROLE_DATA.SYSTEM_ADMIN],
            },
            {
              path: '/staffs',
              name: 'Nhân viên',
              icon: 'user',
              component: './v_staff/',
              authority: [ROLE_DATA.SYSTEM_ADMIN],
            },
            {
              path: '/warehouses',
              name: 'Kho bãi',
              icon: 'shop',
              component: './v_warehouse/',
              authority: [ROLE_DATA.SYSTEM_ADMIN],
            },
            {
              path: '/vehicles',
              name: 'Xe',
              icon: 'shop',
              component: './v_vehicle/',
              authority:  [ROLE_DATA.ASSESSOR, ROLE_DATA.STAFF,ROLE_DATA.SELLER,ROLE_DATA.SYSTEM_ADMIN],
            },
            {
              path: '/vehicleowners',
              name: 'Chủ sở hữu',
              icon: 'user',
              component: './v_vehicleowner/',
              authority: [ROLE_DATA.STAFF, ROLE_DATA.SYSTEM_ADMIN],
            },
            {
              path: '/customers',
              name: 'Khách hàng',
              icon: 'user',
              component: './v_customer/',
              authority: [ROLE_DATA.SELLER, ROLE_DATA.STAFF, ROLE_DATA.SYSTEM_ADMIN],
            },
            {
              path: '/customers',
              name: 'test01',
              icon: 'user',
              component: './v_customer/',
              authority: [ROLE_DATA.SELLER, ROLE_DATA.STAFF, ROLE_DATA.SYSTEM_ADMIN],
            },
            {
              name: 'Tài khoản',
              icon: 'user',
              path: '/profile',
              authority: [ROLE_DATA.ASSESSOR, ROLE_DATA.SELLER, ROLE_DATA.STAFF, ROLE_DATA.SYSTEM_ADMIN],
              routes: [
                {
                  path: '/profile/',
                  redirect: '/profile/index',
                },
                {
                  name: 'Tài khoản người dùng',
                  hideInMenu: true,
                  path: '/profile/index',
                  component: './profile/index',
                },
              ],
            }, //end
            {
              component: './404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
