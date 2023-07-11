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
    title: 'Ngày Cập Nhật',
    dataIndex: 'updateAt',
    valueType: 'date',
    hideInSearch: true,
    sorter: (a, b) => a.updateAt > b.updateAt,
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
