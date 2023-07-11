import React from 'react';
import { Link } from 'umi';
import { FormattedMessage } from 'umi';
import { Card, Image } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
const { Meta } = Card;

export const blogPostColumns = [
  {
    title: "Tiêu đề",
    dataIndex: 'title',
    width: 240,
    hideInTable: true,
  },
  {
    title: "Nội dung",
    dataIndex: 'content',
    width: 240,
    search: false,
    render: (_, { content }) => (
        <div style={{border:'1px dotted', padding: '20px', height: '500px', 'overflow-y': 'scroll'}} dangerouslySetInnerHTML={{ __html: content }} />
    ),
  },
];
