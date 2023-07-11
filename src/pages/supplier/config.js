import { Link } from 'umi';
import React from 'react';

export const columns = [
  {
    title: 'Tên Nhà cung cấp',
    dataIndex: 'name',
    fixed: 'left',
    // render: (_, supplierData) => (
    //   <Link to={{ pathname: `/supplier/${supplierData.id}`, state: supplierData }}>
    //     {supplierData.name}
    //   </Link>
    // ),
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    search: false,
    width: 250,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'create_date',
    search: false,
    width: 150,
  },
];
