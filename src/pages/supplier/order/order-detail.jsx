import { useRequest } from '@umijs/hooks';
import React, { useMemo } from 'react';
import ProCard from '@ant-design/pro-card';
import ProSkeleton from '@ant-design/pro-skeleton';
import { convertDateToStr, formatCurrency, transformOrderToCart } from '@/utils/utils';
import { Descriptions, Tag, Typography } from 'antd';
import { getOrderDetail } from '@/services/supplier';
import { orderStatus, getPaymentType } from './config';
import ProTable from '@ant-design/pro-table';
import CartItem from './cart-item';
import CartComboItem from './cartCombo-item';
import { PRODUCT_COMBO } from '@/utils/constraints';
const { Item } = Descriptions;

const OrderDetail = ({ orderId, supplierId }) => {
  const { data, loading, error } = useRequest(() => getOrderDetail(supplierId, orderId), {
    formatResult: (res) => res?.data,
  });

  // const formatedCart = useMemo(
  //   () => (data?.list_order_details ? transformOrderToCart(data?.list_order_details) : null),
  //   [data?.list_order_details],
  // );

  if (loading)
    return (
      <div
        style={{
          background: '#fafafa',
          padding: 24,
        }}
      >
        <ProSkeleton type="list" />
      </div>
    );

  const {
    customer,
    payment_type,
    order_status,
    address,
    check_in_date,
    total_amount,
    list_order_details = [],
    final_amount,
    discount,
    notes,
    invoice_id,
  } = data || {};

  const { name, email, phone_number } = customer || {};

  console.log('data', data);

  return (
    <>
      <ProCard split="vertical">
        <ProCard colSpan={10}>
          <Descriptions layout="horizontal" title="Thông tin khách hàng">
            <Item label="Tên khách hàng" span={3}>
              {name}
            </Item>
            {/* <Item label="Email" span={3}>
              {email}
            </Item> */}
            <Item label="SDT" span={3}>
              {phone_number}
            </Item>
            {/* <Item label="P.thức giao hàng" span={3}>
              {getOrderType(payment_type)}
            </Item> */}
            {/* <Item label="Cửa hàng" span={3}>
              {store_name}
            </Item> */}
          </Descriptions>
        </ProCard>
        <ProCard colSpan={14}>
          <Descriptions title="Thông tin đơn hàng">
            <Item label="Mã đơn" span={3}>
              <Typography.Text strong>{invoice_id}</Typography.Text>
            </Item>
            <Item label="Trạng thái">
              {orderStatus.find(({ value }) => value == order_status)?.label ?? '-'}
            </Item>
            <Item label="Ghi chú" span={2}>
              {notes?.map(({ content }) => (
                <Typography.Paragraph>{content}</Typography.Paragraph>
              ))}
            </Item>
            <Item label="Địa chỉ" span={2}>
              {address}
            </Item>
            <Item label="Thời gian đặt" span={3}>
              {convertDateToStr(check_in_date)}
            </Item>
            <Item label="P.thức thanh toán" span={3}>
              <Tag>{getPaymentType(payment_type)}</Tag>
            </Item>

            {/* <Item label="Tổng" span={3}>
              {formatCurrency(total_amount)}
            </Item> */}
            {/* <Item label="Giảm giá" span={3}>
              {formatCurrency(discount)}
            </Item> */}
            <Item label="Tổng đơn hàng" span={3}>
              {formatCurrency(final_amount)}
            </Item>
          </Descriptions>
        </ProCard>
      </ProCard>

      <ProCard ghost layout="center">
        <ProTable
          headerTitle="Danh sách voucher"
          dataSource={list_order_details}
          search={false}
          columns={[
            {
              title: 'Tên SP',
              dataIndex: 'product_name',
              render: (_, item) =>
                item.product_type_id !== PRODUCT_COMBO ? (
                  <CartItem item={item} />
                ) : (
                  <CartComboItem item={item} />
                ),
            },
            {
              title: 'Giá mua',
              width: 120,
              dataIndex: 'unit_cost',
              render: (value, { unit_cost }) => <span>{formatCurrency(unit_cost)}</span>,
            },
            {
              title: 'Số lượng',
              dataIndex: 'quantity',
              width: 100,
            },
            {
              title: 'Giá bán',
              width: 120,
              dataIndex: 'unit_price',
              render: (value, { unit_price }) => <span>{formatCurrency(unit_price)}</span>,
            },
            {
              title: 'Tổng cộng',
              dataIndex: 'final_amount',
              render: (value, { quantity, unit_price }) => (
                <Typography.Text strong>{formatCurrency(quantity * unit_price)}</Typography.Text>
              ),
            },
          ]}
          scroll={{
            y: 250,
          }}
        />
      </ProCard>
    </>
  );
};

export default OrderDetail;
