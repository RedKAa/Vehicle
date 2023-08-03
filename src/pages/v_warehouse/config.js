import React from 'react';
import {  Tag,  Input, Button, Image  } from 'antd';
const { TextArea } = Input;


export const columns = [
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
    title: 'Địa chỉ',
    dataIndex: 'address',
  },
  {
    title: 'SĐT',
    dataIndex: 'phone',
  },
  // {
  //   title: 'Xe đang bán',
  //   dataIndex: 'vehiclesOrdered',
  //   hideInSearch: true,
  //   sorter: (a, b) => a.vehiclesOrdered > b.vehiclesOrdered,
  // },
  {
    title: 'Xe đã bán',
    dataIndex: 'vehiclesSold',
    hideInSearch: true,
    sorter: (a, b) => a.vehiclesSold > b.vehiclesSold,
  },
  // {
  //   title: 'Sức chứa tối đa',
  //   dataIndex: 'maxCapacity',
  //   hideInSearch: true,
  // },
  // {
  //   title: 'Còn trống',
  //   dataIndex: 'availableCapacity',
  //   hideInSearch: true,
  // },
  // {
  //   title: 'Tạo:',
  //   sorter: true,
  //   dataIndex: 'createdInRange',
  //   hideInTable: true,
  //   hideInForm: true,
  //   valueType: 'dateTimeRange',
  //   search: {
  //     transform: (value) => ({ createAt_startTime: value[0], createAt_endTime: value[1] }),
  //   },
  // },
  // {
  //   title: 'Cập nhật:',
  //   sorter: true,
  //   dataIndex: 'updatedInRange',
  //   hideInTable: true,
  //   hideInForm: true,
  //   valueType: 'dateTimeRange',
  //   search: {
  //     transform: (value) => ({ updateAt_startTime: value[0], updateAt_endTime: value[1] }),
  //   },
  // },
];
