import { Image, Input, Tag } from 'antd';
import React from 'react';

export const RankColumn = [
  {
    title: 'ID',
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: 'Xếp hạng',
    dataIndex: 'rank',
    hideInSearch: true,
  },
  {
    title: 'Logo',
    dataIndex: 'avatarLink',
    hideInSearch: true,
    render: (_, { logo }) =>  logo && (<Image
        width={100}
        src={logo}
      />)
  },
  {
    title: 'Tỉ lệ hoa hồng',
    dataIndex: 'commissionRatePercent',
    hideInSearch: true,
  },
  {
    title: 'Kinh nghiệm yêu cầu',
    dataIndex: 'epxRequired',
    hideInSearch: true,
  },
  {
    title: 'Tổng số CTV',
    dataIndex: 'numberOfSeller',
    hideInSearch: true,
  },
];
