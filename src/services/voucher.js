import request from '@/utils/requestServer';
import {
  getCurrentProviderId
} from '@/utils/utils';

const providerId = getCurrentProviderId();

export const getVouchers = (params) =>
  request.get('/vouchers', {
    ...params,
    providerId
});

// export const getVoucherById = (voucherId) => request.get(`/vouchers/${voucherId}`);

export const updateVoucherById = (voucherId, voucher) => {
  return request.put(`/vouchers/${voucherId}`, {
    data: {
      ...voucher,
      providerId
    },
  });
}

export const createVoucher = (voucher) => {
  return request.post(`/vouchers`, {
    data: {
      ...voucher,
      providerId
    },
  });
}
export const getVoucherById = (voucherId) =>{
  return request.get(`/vouchers`, {
    params: {
      id: voucherId,
      providerId
    },
  });
}

export const activationById = (id, data) => {
  return request.put(`/vouchers/${id}`, {
    data: {
      ...data,
      providerId
    },
  });
}

export const updateListVouchersStatus = (voucherIds, status) => {
  return request.put(`/vouchers/status`, {
    data: {
      voucherIds,
      status
    },
  });
}

export const getVoucherByName = (name) => {
  return request.get('/vouchers', {
    params: {
      'VoucherName': name,
      'status': 'Active',
      isCombo: false,
      providerId,
    },
    useCache: true,
  });
};


export const generateQRCodeListVouchers = (voucherIds, quantity) => {
  return request.put(`/vouchers/autogenerate`, {
    data: {
      voucherIds,
      quantity
    },
  });
}