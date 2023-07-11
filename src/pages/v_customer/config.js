import { Input } from 'antd';
const { TextArea } = Input;


export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    hideInForm: true,
    copyable: true,
  },
  {
    title: 'Tên',
    dataIndex: 'name',
  },
  {
    title: 'SĐT',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
  },
  {
    title: 'Ngày Tạo',
    dataIndex: 'createAt',
    valueType: 'date',
    hideInSearch: true,
    sorter: (a, b) => a.createAt > b.createAt,
  },
  {
    title: 'Tạo:',
    sorter: true,
    dataIndex: 'createdInRange',
    hideInTable: true,
    hideInForm: true,
    valueType: 'dateTimeRange',
    search: {
      transform: (value) => ({ createAt_startTime: value[0], createAt_endTime: value[1] }),
    },
  },
];
