import { Image, Input } from 'antd';
const { TextArea } = Input;

export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: 'Ảnh đại diện',
    dataIndex: 'user',
    hideInSearch: true,
    render: (_, { user }) =>  user.avatarLink && (<Image
    width={100}
    src={user.avatarLink}
    />)
  },
  {
    title: 'Tên',
    dataIndex: 'name',
  },
  {
    title: 'SĐT',
    dataIndex: 'phone',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
  },
  
  // {
  //   title: 'Tổng đơn hàng',
  //   dataIndex: 'commissionRevenue',
  //   hideInForm:true,
  //   hideInSearch: true,
  //   render: (_, {kpi}) => <>{kpi?.closeIR}</>
  // },
];
