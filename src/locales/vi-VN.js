import component from './en-US/component';
import globalHeader from './en-US/globalHeader';
import pwa from './en-US/pwa';
import settingDrawer from './en-US/settingDrawer';
import settings from './en-US/settings';

import menu from './vi-VN/menu';
import dashboard from './vi-VN/dashboard';
import orders from './vi-VN/orders';
import select from './vi-VN/select';
import suggestedDishes from './vi-VN/suggestedDishes';
import bestSeller from './vi-VN/best-seller';
import global from './vi-VN/global';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.preview.down.block': 'Download this page to your local project',
  'app.welcome.link.fetch-blocks': 'Get all block',
  'app.welcome.link.block-list': 'Quickly build standard, pages based on `block` development',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...dashboard,
  ...orders,
  ...select,
  ...suggestedDishes,
  ...bestSeller,
  ...global,
};
