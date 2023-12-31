import React from 'react';
import {  Tag,  Input, Button, Image  } from 'antd';
import moment from 'moment';
const { TextArea } = Input;


export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    copyable: true,
    hideInForm: true,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'itemReceiptStatus',
    valueEnum: {
      VehicleOwnerOpen: {
        text: 'Khởi tạo',
      },
      WaitingForAssessment: {
        text: 'Đợi thẩm định',
      },
      Submit: {
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
  {
    title: 'Ngày Cập Nhật',
    dataIndex: 'updateAt',
    valueType: 'date',
    hideInSearch: true,
    sorter: (a, b) => a.updateAt > b.updateAt,
    render: ({updateAt}) => {
      return(<Tag color="#78cc7a">{moment(updateAt).format('DD-MM-YYYY')}</Tag>)
    }
  },
];
