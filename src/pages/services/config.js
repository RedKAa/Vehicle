import React from 'react';
import {  Tag,  Input, Button  } from 'antd';
const { TextArea } = Input;


export const serviceColumn = [
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
    title: 'Địa điểm',
    dataIndex: 'locationName',
    hideInSearch: true,
  },
  // {
  //   title: 'Mô tả',
  //   dataIndex: 'description',
  //   hideInSearch: true,
  // },
  {
    title: 'Số lượng voucher đã bán',
    dataIndex: 'kpi',
    hideInForm:true,
    hideInSearch: true,
    render: (_,{kpi}) => <>{kpi.qrCodeSold}</>
  },
  // {
  //   title: 'Trạng thái',
  //   dataIndex: 'status',
  //   sorter: (a, b) => a.status > b.status,
  //   valueEnum: {
  //     "Active": {
  //       text: 'Active',
  //     },
  //     "Disable": {
  //       text: 'Disable',
  //     }
  //   },
  //   render: (_, { status }) => <Tag>{status}</Tag>,
  // },
  // {
  //   title: 'Loại hình dịch vụ',
  //   dataIndex: 'type',
  //   hideInForm:true,
  //   hideInSearch: true,
  // },
];
