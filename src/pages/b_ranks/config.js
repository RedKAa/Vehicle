import { Input, Tag } from 'antd';
const { TextArea } = Input;


export const Column = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
  },

  {
    title: 'Tên',
    dataIndex: 'name',

  },

];
