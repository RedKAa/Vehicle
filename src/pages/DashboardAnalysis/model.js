import { getSaleData, getSupplierSaleData } from './service';

const initState = {
  salesData: {
    order: 0,
    order_item: 0,
    sale: 0,
  },
  supplierSales: [],
};
const Model = {
  namespace: 'dashboardAnalysis',
  state: initState,
  effects: {
    *fechReport(_, { call, put, all }) {
      console.log(all);
      const res = yield all([call(getSaleData), call(getSupplierSaleData)]);
      const [areaSales, supplierSales] = res ?? [];
      // console.log(`areaSales`, areaSales);
      // console.log(`supplierSales`, supplierSales);
      yield put({
        type: 'save',
        payload: {
          salesData: areaSales.data,
          supplierSales: supplierSales.data,
        },
      });
    },
    *fetchSalesData({ dateFilter }, { call, put }) {
      const supplierSales = yield call(getSupplierSaleData, dateFilter);
      yield put({
        type: 'save',
        payload: {
          supplierSales,
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },

    clear() {
      return initState;
    },
  },
};
export default Model;
