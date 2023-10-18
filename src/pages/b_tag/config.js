import { Input, Tag } from 'antd';
import moment from 'moment';
const { TextArea } = Input;

export const Column = [
  {
    title: 'ID',
    dataIndex: 'id',

  },

  {
    title: 'Name',
    dataIndex: 'name',

  },

  {
    title: 'Ngày Tạo',
    dataIndex: 'createAt',
    valueType: 'date',
    hideInSearch: true,
    sorter: (a, b) => a.createAt > b.createAt,
    render: ({createAt}) => {
      return(<Tag color="#78cc7a">{moment(createAt).format('DD-MM-YYYY')}</Tag>)
    }
  },

];