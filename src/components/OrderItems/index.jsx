import { Avatar, Image, List, message, Skeleton, Spin } from 'antd';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useState } from 'react';
import { getOrderById } from '@/services/orders';
import { convertDateToStr } from '@/utils/utils';
import { Link } from 'umi';

const ContainerHeight = 400;

const OrderItems = ({orderId}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const appendData = () => {
    getOrderById(orderId)
      .then((res) => {
        setData(data.concat(res.orderItems));
      })
      .then(() => setLoading(false));
  };
  useEffect(() => {
    appendData();
  }, []);
  const onScroll = (e) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      appendData();
    }
  };
  return (
      <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="id"
        width={600}
      >
        {(item) => (
          <Link to={`/vouchers/${item.id}`}>
            <List.Item key={item.id}>
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                style={{'align-items': 'center'}}
                avatar={<Image width={100} height={100} src={item.image} />}
                title={<a href={`/vouchers/${item.id}`}>{item.voucherName}</a>}
                description={`HSD: ${convertDateToStr(item.useDate)}`}
                />
              <div>{item.soldPrice} VND</div>
            </Skeleton>
          </List.Item>
          </Link>
        )}
      </VirtualList>
    </List>
    )
  ;
};
export default OrderItems;