export const PRODUCT_MASTER = 6;
export const PRODUCT_EXTRA = 5;
export const PRODUCT_DETAIL = 7;
export const PRODUCT_SINGLE = 0;
export const PRODUCT_COMBO = 1;
export const PRODUCT_COMPLEX = 10;
export const PRODUCT_GIFT = 12;

export const ARTICLE_HELLOBAR = 0;
export const ARTICLE_SLIDES = 1;
export const ARTICLE_STOREIS = 2;

export const BESTSELLER_COLLECTION = 1;
export const SUGGESTED_DISHES = 2;
export const COMMON_COLLECTION = 0;

export const BLOGPOST_PROMOTION_TYPE = 3;

export const BATCH_STATUS = {
  0: { text: 'New', status: 'default' },
  1: { text: 'In-progress', status: 'processing' },
  2: { text: 'Success', status: 'success' },
  3: { text: 'Fail', status: 'error' },
  4: { text: 'Abandon', status: 'error' },
};

export const ARTICLE_TYPE_DATA = [
  {
    value: `${ARTICLE_HELLOBAR}`,
    label: 'HelloBar',
  },
  {
    value: ARTICLE_SLIDES,
    label: 'Slides',
  },
  {
    value: ARTICLE_STOREIS,
    label: 'Stories',
  },
];

export const PRODUCT_TYPE_DATA = [
  {
    value: PRODUCT_MASTER,
    typeCode: 'master',
    label: 'SP Master',
  },
  {
    value: PRODUCT_COMPLEX,
    typeCode: 'complex',
    label: 'SP có extra',
  },
  // {
  //   value: PRODUCT_COMBO,
  //   typeCode: 'combo',
  //   label: 'SP Combo',
  // },
  {
    value: PRODUCT_SINGLE,
    typeCode: 'single',
    label: 'SP Đơn',
  },
  {
    value: PRODUCT_EXTRA,
    typeCode: 'extra',
    label: 'SP Extra',
  },
  {
    value: PRODUCT_GIFT,
    typeCode: 'gift',
    label: 'Quà tặng',
  },
];

export const STORE_TYPE = [
  {
    value: 0,
    label: 'Nhà kho',
  },
  {
    value: 1,
    label: 'Cửa hàng',
  },
  {
    value: 2,
    label: 'Cửa hàng có thuê giờ',
  },
  {
    value: 3,
    label: 'Bida/Karaoke',
  },
  {
    value: 4,
    label: 'Nhà hàng/Cafe',
  },
  {
    value: 5,
    label: 'Cửa hàng/Cafe mang đi',
  },
  {
    value: 6,
    label: 'Tổng đài đặt hàng',
  },
  {
    value: 7,
    label: 'Website',
  },
  {
    value: 8,
    label: 'MobileApp',
  },
];

export const BLOGPOST_TYPE = [
  {
    value: 3,
    label: 'Khuyến Mãi',
  },
  {
    value: 1,
    label: 'Tin Tức',
  },
  {
    value: 10,
    label: 'Cam kết',
  },
  {
    value: 11,
    label: 'Lịch sử',
  },
  {
    value: 12,
    label: 'Tuyển dụng',
  },
];

export const PAYMENT_TYPE = [
  {
    value: 1,
    label: 'Tiền mặt',
  },
  {
    value: 2,
    label: 'Thẻ thành viên',
  },
];
