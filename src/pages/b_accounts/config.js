import { Input, Tag } from 'antd';
import moment from 'moment';
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
