import Text from 'antd/lib/typography/Text';
import React from 'react';

export const groupProductColumns = [
  {
    title: 'ID',
    dataIndex: 'id',


    render: (_, { id }) => <Text>{id}</Text>,
    fixed: 'left',
    width: 150,
  },
  {
    title: 'Nhóm sảm phẩm',
    dataIndex: 'name',
    render: (_, { name }) => <Text>{name}</Text>,
    sort: true,
    sorter: (a, b) => a.name > b.name,
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    search: false,
    render: (_, { description }) => <Text>{description}</Text>,
  },
  // {
  //   title: 'Loại',
  //   dataIndex: 'type',
  //   search: false,
  //   render: (_, { type }) => <Text>{type}</Text>,
  // },
  {
    title: 'Vị trí',
    dataIndex: 'type',
    search: false,
    render: (_, { position }) => <Text>{position}</Text>,
  },
];
