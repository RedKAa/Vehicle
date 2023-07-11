import { formatCurrency, formatWhitespace } from '@/utils/utils';
import { Input, Tag } from 'antd';
import React from 'react';

const { TextArea } = Input;



export const orderColumn = [
  {
    title: 'ID',
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: 'Tổng giá',
    dataIndex: 'totalPrice',
    valueType: 'number',
    hideInSearch: true,
    render: (_,{totalPrice}) => <>{formatCurrency(totalPrice)}</>
  },
  {
    title: 'Trạng thái đơn hàng',
    dataIndex: 'orderStatus',
    sorter: (a, b) => formatWhitespace(a.orderStatus) > formatWhitespace(b.orderStatus),
    valueEnum: {
      Completed: {
        text: 'Completed',
      },
      Processing: {
        text: 'Processing',
      },
      Failed: {
        text: 'Failed',
      },
    },
    render: (_, { orderStatus }) => <Tag>{`${orderStatus}`}</Tag>,
  },
  {
    title: 'Hoa hồng nhận được',
    dataIndex: 'kpi',
    hideInForm:true,
    hideInSearch: true,
    render: (_,{commissionFee}) => <>{formatCurrency(commissionFee)}</>
  },
  {
    title: 'Hoa hồng cho CTV',
    dataIndex: 'kpi',
    hideInForm:true,
    hideInSearch: true,
    render: (_,{sellerCommission}) => <>{formatCurrency(sellerCommission)}</>
  },
  {
    title: 'Ngày Tạo',
    dataIndex: 'createAt',
    valueType: 'date',
    hideInSearch: true,
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
