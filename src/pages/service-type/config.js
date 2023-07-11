import React from 'react';
import {  Tag,  Input, Button  } from 'antd';
import { formatCurrency } from '@/utils/utils';
const { TextArea } = Input;


export const serviceTypeColumn = [
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
    title: 'Hoa hồng mặc định',
    dataIndex: 'defaultCommissionRate',
    sorter: (a, b) => a.defaultCommissionRate > b.defaultCommissionRate,
    render: (_, { defaultCommissionRate }) => <Tag>{`${parseFloat(defaultCommissionRate).toFixed(2)}`}</Tag>,
  },
  // {
  //   title: 'Ngày Tạo',
  //   dataIndex: 'createAt',
  //   valueType: 'date',
  //   sorter: (a, b) => a.createAt > b.createAt,
  //   hideInSearch: true,
  // },
  // {
      //   title: 'Hoa hồng cho CTV',
      //   dataIndex: 'kpi',
      //   hideInForm:true,
      //   hideInSearch: true,
      //   render: (_,{kpi}) => <>{formatCurrency(kpi.sellerCommissionFee)}</>
      // },
      {
        title: 'Số lượng voucher đã bán',
        dataIndex: 'kpi',
        hideInForm:true,
        hideInSearch: true,
        render: (_,{kpi}) => <>{kpi.qrCodeSold}</>
      },
      {
        title: 'Hoa hồng nhận được',
        dataIndex: 'kpi',
        hideInForm:true,
        hideInSearch: true,
        render: (_,{kpi}) => <>{formatCurrency(kpi.commissionFee)}</>
      },
  // {
  //   title: 'Ngày Cập Nhật',
  //   dataIndex: 'updateAt',
  //   valueType: 'date',
  //   hideInSearch: true,
  //   sorter: (a, b) => a.updateAt > b.updateAt,
  // },
  // {
  //   title: 'Ngày Xóa',
  //   dataIndex: 'deleteAt',
  //   valueType: 'date',
  //   hideInSearch: true,
  //   sorter: (a, b) => a.deleteAt > b.deleteAt,
  // },
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
