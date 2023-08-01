import React from 'react';
import {  Tag,  Input, Button, Image  } from 'antd';
const { TextArea } = Input;


export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    copyable: true,
    hideInForm: true,
  },
  {
    title: 'Loại phiếu',
    dataIndex: 'transferOrderType',
    valueEnum: {
      In: {
        text: 'Nhập kho',
      },
      Out: {
        text: 'Xuất kho',
      },
      },
  },
  // {
  //   title: 'ID phiếu nhập xe',
  //   hideInForm: true,
  //   dataIndex: 'itemReceipt',
  //   hideInSearch:true,
  //   copyable: true,
  //   render: (_,  item ) => <span>{item.itemReceipt?.id}</span>
  // },
  {
    title: 'ID phiếu nhập xe',
    hideInTable: true,
    dataIndex: 'itemReceiptId',
  },
  // {
  //   title: 'ID phiếu bán hàng',
  //   hideInForm: true,
  //   hideInSearch:true,
  //   copyable: true,
  //   dataIndex: 'saleOrder',
  //   render: (_,  item ) => <span>{item.saleOrder?.id}</span>
  // },
  {
    title: 'ID phiếu bán hàng',
    hideInTable: true,
    dataIndex: 'saleOrderId',
  },
  {
    title: 'Ngày xuất kho',
    dataIndex: 'leaveDate',
    valueType: 'date',
    hideInSearch: true,
    sorter: (a, b) => a.leaveDate > b.leaveDate,
  },
  {
    title: 'Ngày nhận',
    dataIndex: 'receiveDate',
    valueType: 'date',
    hideInSearch: true,
    sorter: (a, b) => a.receiveDate > b.receiveDate,
  },
  {
    title: 'Từ địa chỉ',
    hideInSearch: true,
    dataIndex: 'fromLocationAddress',
    render: (_,  item ) => {
      return <TextArea style={{height: 200}} readOnly value={item.fromLocationAddress}></TextArea>
    }
  },
  {
    title: 'Đến địa chỉ',
    hideInSearch: true,
    dataIndex: 'toLocationAddress',
    render: (_,  item ) => {
      return <TextArea style={{height: 200}} readOnly value={item.toLocationAddress}></TextArea>
    }
  },
  {
    title: 'Ngày Tạo',
    dataIndex: 'createAt',
    valueType: 'date',
    hideInSearch: true,
    sorter: (a, b) => a.createAt > b.createAt,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'approvalStatus',
    valueEnum: {
      Open: {
        text: 'Khởi tạo',
      },
      PendingApproval: {
        text: 'Đợi kiểm duyệt',
      },
      Reject: {
        text: 'Không được duyệt',
      },
      Approved: {
        text: 'Đã duyệt',
      },
    },
  },
];
