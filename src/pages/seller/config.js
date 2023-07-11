import React from 'react';
import { formatCurrency } from '@/utils/utils';
import { Badge, Input, Tag, Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { TextArea } = Input;

export const sellersColumn = [
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
    copyable: true,
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
  },
  {
    title: 'Xe đã bán',
    dataIndex: 'vehiclesSold',
    hideInSearch: true,
    sorter: (a, b) => a.vehiclesSold > b.vehiclesSold,
  },
];
