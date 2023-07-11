import requestServer from '@/utils/requestServer';

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export const getTableData2 = (resource, options) => {
  // return {
  //   total: data.length,
  //   list: data,
  // };
  console.log('options', options);
  return requestServer.get(`/${resource}`, options).then((res) => {
    console.log('res', {
      total: res.total ? res.total : (res.length ?? res.data.length),
      data: res.data ?? res,
      success: true,
    });
    return {
      total: res.total ? res.total : (res.length ?? res.data.length),
      data: res.data ?? res,
      success: true,
    };
  });
};

export const getTableData = (resource, options) => {
  return requestServer.get(`/${resource}`, options).then((res) => ({
    total: res.total ? res.total : (res.length ?? res.data.length),
    list: res,
  }));
};
