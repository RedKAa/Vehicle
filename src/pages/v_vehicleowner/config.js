import { Image, Input, Tag } from 'antd';
import moment from 'moment';
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
    title: 'Địa chỉ',
    dataIndex: 'address',
  },
  {
    title: 'SĐT',
    dataIndex: 'phone',
    copyable: true,
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
