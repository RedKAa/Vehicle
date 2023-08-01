import React from 'react';
import {  Tag,  Input, Button, Image  } from 'antd';
import moment from 'moment';
import { formatCurrency } from '@/utils/utils';
const { TextArea } = Input;


export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: 'Ảnh',
    dataIndex: 'imgs',
    hideInSearch: true,
    render: (_, { imgs }) =>  imgs && (<Image
    width={100}
    height={150}
    src={imgs}
  />)
  },
  {
    title: 'Mẫu xe',
    dataIndex: 'carModel',
    valueType: 'select',
    valueEnum: {
      'Sedan': { text: 'Sedan'},
      'SUV': { text: 'SUV'},
      'Truck': { text: 'Truck'},
      'Micro': { text: 'Micro'},
      'Van': { text: 'Van'},
    },
  },
  {
    title: 'Màu sắc',
    dataIndex: 'color',
  },
  {
    title: 'Xuất xứ',
    dataIndex: 'manufacture',
  },
  {
    title: 'Mua mới',
    dataIndex: 'newAt',
    hideInSearch: true,
    render: ({newAt}) => {
      return(<Tag color="#78cc7a">{moment(newAt).format('DD-MM-YYYY')}</Tag>)
    }
  },
  {
    title: 'Định giá',
    dataIndex: 'assessPrice',
    hideInSearch: true,
    render: (_, { assessPrice }) => <Tag>{formatCurrency(assessPrice)}</Tag>
  },
  {
    title: 'Giá bán',
    dataIndex: 'soldPrice',
    hideInSearch: true,
    render: (_, { soldPrice }) => <Tag>{formatCurrency(soldPrice)}</Tag>
  },
  {
    title: 'Đã đi(km)',
    hideInSearch: true,
    dataIndex: 'usage',
  },
  {
    title: 'Ghi chú',
    hideInSearch: true,
    dataIndex: 'description',
    render: (_,  item ) => {
      return <TextArea style={{height: 200}} readOnly value={item.description}></TextArea>
    }
  },
  {
    title: 'Dung tích',
    dataIndex: 'capacity',
    hideInSearch: true,
    hideInTable: true,
  },
  {
    title: 'Tên',
    hideInSearch: true,
    dataIndex: 'name',
    hideInTable: true,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'vehicleStatus',
    valueType: 'select',
    valueEnum: {
      'Draft': { text: 'Nháp'},
      'WaitIn': { text: 'Đợi nhập kho'},
      'Inventory': { text: 'Sẵn bán'},
      'Order': { text: 'Đã chốt đơn'},
      'WaitOut': { text: 'Đợi xuất kho'},
      'Sold': { text: 'Đã bán'},
    },
  },
  {
    title: 'Ngày Tạo',
    dataIndex: 'createAt',
    valueType: 'date',
    hideInSearch: true,
    hideInTable: true,
    sorter: (a, b) => a.createAt > b.createAt,
  },
  {
    title: 'Ngày Cập Nhật',
    dataIndex: 'updateAt',
    valueType: 'date',
    hideInSearch: true,
    hideInTable: true,
    sorter: (a, b) => a.updateAt > b.updateAt,
  },
  // {
  //   title: 'Người tạo',
  //   dataIndex: 'createById',
  //   hideInTable: true,
  // },
  // {
  //   title: 'Người cập nhật',
  //   dataIndex: 'updateById',
  //   hideInTable: true,
  // },
];
