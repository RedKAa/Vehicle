import request from '@/utils/requestServer';

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export const getSupplierSaleData = (dateFilter) => {
  console.log('data', dateFilter);
  return request.get(`/kpi/range`, { params: dateFilter });
}


export const getSaleData = (year) => {
  console.log('data', year);
  return request.get(`/kpi/year`, { params: year });
}

export const getSaleDataProvider = (dateFilter) => {
  console.log('data', dateFilter);
  return request.get(`/kpi/range-provider`, { params: dateFilter });
}


export const getYearSaleDataProvider = (year) => {
  console.log('data', year);
  return request.get(`/kpi/year-provider`, { params: year });
}

