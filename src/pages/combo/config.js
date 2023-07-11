import React from 'react';
import {  Tag,  Input, Button, Card, Image  } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import moment from 'moment';
import { formatCurrency } from '@/utils/utils';

const { TextArea } = Input;


export const comboColumn = [
  {
    title: 'ID',
    dataIndex: 'id',
    hideInTable: true,
    hideInForm: true,
    hideInSearch: true,
    copyable: true,
  },
  {
    title: 'Tên',
    dataIndex: 'voucherName',
    hideInForm:true,
  },
  {
    title: 'Hiệu lực',
    hideInTable: true,
    dataIndex: 'availableInRange',
    valueEnum: {
      true: { text: 'Còn hiệu lực', status: 'Processing' },
      false: { text: 'Hết hiệu lực', status: 'Error' },
    },
    search: {
      transform: (value) => {
        let expiredDateHighBound = null;
        let tmp = null;
        if(value == 'true') {
          tmp = moment().format('YYYY-MM-DD HH:mm');
        } else {
          expiredDateHighBound = moment().format('YYYY-MM-DD HH:mm');
        }
        return ({ expiredDateHighBound, 'date': tmp})
      }
    }
  },
  {
    title: 'Ảnh bìa',
    dataIndex: 'bannerImg',
    hideInSearch: true,
    render: (_, { bannerImg }) =>  bannerImg && (<Image
    width={100}
    src={bannerImg}
  />)
  },
  // {
  //   title: 'Ngày Tạo',
  //   dataIndex: 'createAt',
  //   valueType: 'date',
  //   hideInSearch: true,
  //   sorter: (a, b) => a.createAt > b.createAt,
  // },
  // {
  //   title: 'Ngày Cập Nhật',
  //   dataIndex: 'updateAt',
  //   valueType: 'date',
  //   hideInSearch: true,
  //   sorter: (a, b) => a.updateAt > b.updateAt,
  // },


  {
    title: 'Thời gian hiệu lực',
    valueType: 'date',
    hideInSearch: true,
    render: (_, combo) => {
      let isAvailable = true;
      let today = new moment();
      let endDate = new moment(combo.endDate);
      if(endDate.isBefore(today)){
        isAvailable = false;
      }
      return (
        isAvailable ? (<><Tag color="#78cc7a">{moment(combo.startDate).format('HH:mm DD-MM-YYYY')}</Tag><span>- </span><Tag color="#78cc7a">{moment(combo.endDate).format('HH:mm DD-MM-YYYY')}</Tag></>)
        : (<><Tag color="#f50">{moment(combo.startDate).format('HH:mm DD-MM-YYYY')}</Tag><span>- </span><Tag color="#f50">{moment(combo.endDate).format('HH:mm DD-MM-YYYY')}</Tag></>)
      );
    },
  },
  // {
  //   title: 'Hiệu lực:',
  //   sorter: true,
  //   dataIndex: 'availableInRange',
  //   hideInTable: true,
  //   hideInForm: true,
  //   valueType: 'dateTimeRange',
  //   search: {
  //     transform: (value) => ({  date: value[0], expiredDateHighBound: value[1] }),
  //   },
  // },
  {
    title: 'Giá bán',
    dataIndex: 'kpi',
    hideInForm:true,
    hideInSearch: true,
    render: (_,{soldPrice}) => <>{formatCurrency(soldPrice)}</>
  },
  {
    title: 'Số lượng đã bán',
    dataIndex: 'kpi',
    hideInForm:true,
    hideInSearch: true,
    render: (_,{kpi}) => <>{kpi?.voucherSold}</>
  },
  {
    title: 'Số lượng còn lại',
    dataIndex: 'inventory',
    hideInForm:true,
    hideInSearch: true,
  },
  {
    title: 'Doanh thu nhà cung cấp',
    dataIndex: 'kpi',
    hideInForm:true,
    hideInSearch: true,
    render: (_,{kpi}) => <>{formatCurrency(kpi?.revenue)}</>
  },
  {
    title: 'Hoa hồng nhận được',
    dataIndex: 'kpi',
    hideInForm:true,
    hideInSearch: true,
    render: (_,{kpi}) => <>{formatCurrency(kpi?.commissionFee)}</>
  },
  {
    title: 'Hoa hồng cho CTV',
    dataIndex: 'kpi',
    hideInForm:true,
    hideInSearch: true,
    render: (_,{kpi}) => <>{formatCurrency(kpi?.sellerCommissionFee)}</>
  },
  // {
  //   title: 'Giá bán',
  //   dataIndex: 'soldPrice',
  //   hideInForm:true,
  //   hideInSearch: true,
  // },
];
