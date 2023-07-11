import { Input, Tag } from 'antd';
const { TextArea } = Input;


export const TagColumn = [
  {
    title: 'ID',
    dataIndex: 'id',


    hideInForm: true,
  },
  {
    title: 'Tên',
    dataIndex: 'name',
  },
  {
    title: 'Ngày Tạo',
    dataIndex: 'createAt',
    valueType: 'date',
    sorter: (a, b) => a.createAt > b.createAt,
    hideInSearch: true,
  },
  {
    title: 'Ngày Cập Nhật',
    dataIndex: 'updateAt',
    valueType: 'date',
    hideInSearch: true,
    sorter: (a, b) => a.updateAt > b.updateAt,
  },
  {
    title: 'Ngày Xóa',
    dataIndex: 'deleteAt',
    valueType: 'date',
    hideInSearch: true,
    sorter: (a, b) => a.deleteAt > b.deleteAt,
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
  {
    title: 'Cập nhật:',
    sorter: true,
    dataIndex: 'updatedInRange',
    hideInTable: true,
    hideInForm: true,
    valueType: 'dateTimeRange',
    search: {
      transform: (value) => ({ updateAt_startTime: value[0], updateAt_endTime: value[1] }),
    },
  },
];
