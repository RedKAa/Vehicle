
import request from '@/utils/requestServer';

export const searchItemreceiptById = (id) => {
  return request.get('/itemreceipts', {
    params: {
      'id': id,
      'ItemReceiptStatus': 'Approved'
    },
    useCache: true,
  });
};

export const createItemreceipt = (itemreceipt) => {
  return request.post(`/itemreceipts`, {
    data: {
      ...itemreceipt
    },
  });
}

export const getItemreceiptById = (id) =>{
  return request.get(`/itemreceipts/${id}`);
}

export const getTransactionLineByTid = (id) => {
  return request.get(`/transactionlines`, {
    params: {
      TransactionId: id
    },
  });
}

export const updateItemreceiptById = (id, itemreceipt) => {
  return request.put(`/itemreceipts/${id}`, {
    data: {
      ...itemreceipt
    },
  });
}

