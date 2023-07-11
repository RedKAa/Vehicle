import { SelectStore, SelectPaymentType } from '@/components/CommonSelect/CommonSelect';
import { getStore } from '@/services/store';
import { PAYMENT_TYPE } from '@/utils/constraints';
import { convertDateToStr, getOrderType } from '@/utils/utils';
import { Typography, Tag } from 'antd';
import React from 'react';
import { FormattedMessage } from 'umi';

const { Text } = Typography;

export const orderStatus = [
  {
    label: <Text type="warning">Mới</Text>,
    value: 1,
  },
  {
    label: <Text type="secondary">Đang giao</Text>,
    value: 2,
  },
  {
    label: <Text type="success">Đã hoàn thành đơn hàng</Text>,
    value: 3,
  },
  {
    label: <Text type="danger">Đã bị hủy</Text>,
    value: 4,
  },
];

export const getPaymentType = (type) => {
  return PAYMENT_TYPE.find(({ value }) => value === type)?.label ?? <span>{type}</span>;
};

export const orderColumns = [
  {
    title: <FormattedMessage id="order.invoice_id" />,
    dataIndex: 'invoice_id',
    search: false,
    width: 150,
    fixed: 'left',
  },
  {
    title: <FormattedMessage id="order.customerName" />,
    dataIndex: 'customer.name',
    search: false,
    width: 250,
    render: (_, { customer }) => <Text>{customer?.name}</Text>,
  },
  // {
  //   title: 'Cửa hàng',
  //   dataIndex: 'store-id',
  //   hideInTable: true,
  //   renderFormItem: (item, props) => (
  //     <SelectStore
  //       onSearch={() => getStore({ params: { 'main-store': false } })}
  //       style={{ width: '100%' }}
  //       allowClear
  //       {...props}
  //     />
  //   ),
  // },
  {
    title: <FormattedMessage id="order.phone" />,
    dataIndex: 'customer.phone_number',
    width: 150,
    render: (_, { customer }) => <Text>{customer?.phone_number}</Text>,
    // render: (_, { delivery_phone }) => <span>{delivery_phone}</span>,
  },
  {
    title: <FormattedMessage id="order.location" />,
    dataIndex: 'address',
    search: false,
    width: 250,
    // ellipsis: true,
  },
  {
    title: <FormattedMessage id="order.paymentType" />,
    dataIndex: 'payment-type',
    valueType: 'select',
    width: 150,
    renderFormItem: (item, props) => <SelectPaymentType {...props} />,
    render: (_, { payment_type }) => {
      return <Tag>{getPaymentType(payment_type)}</Tag>;
    },
  },
  // {
  //   title: 'order.payment_status',
  //   dataIndex: 'payment_status',
  //   search: false,
  //   width: 150,
  //   render: (_, { payment_status }) => {
  //     return payment_status === 1 ? 'Đã thanh toán' : 'Chưa thanh toán';
  //   },
  // },
  {
    title: <FormattedMessage id="order.dateRange" />,
    dataIndex: 'dateRange',
    show: false,
    valueType: 'dateRange',
    search: {
      transform: (value) => ({
        'from-date': `${value[0]}T00:00:00`,
        'to-date': `${value[1]}T23:59:00`,
      }),
    },
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'check_in_date',
    search: false,
    render: (_, { check_in_date }) => {
      return convertDateToStr(check_in_date, 'HH:mm DD/MM/YYYY');
    },
  },
  {
    title: <FormattedMessage id="order.status" />,
    dataIndex: 'order_status',
    search: false,
    width: 150,
    render: (_, { order_status }) => {
      return orderStatus.find(({ value }) => value == order_status)?.label ?? '-';
    },
  },

  {
    title: <FormattedMessage id="order.total" />,
    dataIndex: 'final_amount',
    render: (_, { final_amount }) => (
      <Typography.Title level={5}>
        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
          final_amount,
        )}
      </Typography.Title>
    ),
    search: false,
    width: 150,
    fixed: 'right',
  },
];
