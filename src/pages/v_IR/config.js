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
    title: 'Trạng thái',
    dataIndex: 'itemReceiptStatus',
  },
];
