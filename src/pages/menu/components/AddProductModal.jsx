import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useRequest, useDebounceFn } from '@umijs/hooks';
import { getAllAreaProduct } from '@/services/product';
import Avatar from 'antd/lib/avatar/avatar';
import { Input, Spin, List } from 'antd';

import styles from '../style.less';
import ProForm, { ProFormText, QueryFilter } from '@ant-design/pro-form';
import { SelectProductType } from '@/components/CommonSelect/CommonSelect';

const PAGE_SIZE = 20;

const getMoreProdList = ({ nextPage = 0, size = 20, ...others }) => {
  return getAllAreaProduct({ page: nextPage, size, ...others }).then((res) => ({
    ...res,
    total: res.metadata?.total,
    list: res.data,
  }));
};

const AddProductModal = () => {
  const [prodName, setProdName] = React.useState(null);
  const { run: changeSearch } = useDebounceFn(
    (val) => {
      setProdName(val);
    },
    [setProdName],
    700,
  );
  const { data, loading, loadMore, loadingMore, noMore } = useRequest(
    (d) =>
      getMoreProdList({
        nextPage: d ? d.metadata.page + 1 : 1,
        size: PAGE_SIZE,
        'product-name': prodName,
      }),
    {
      loadMore: true,
      cacheKey: 'loadMoreProdCachje',
      isNoMore: (d) => {
        return d ? d.metadata?.page == Math.ceil(d.metadata?.total / 20) : false;
      },
      refreshDeps: [prodName],
    },
  );

  return (
    <>
      <Input placeholder="Pizza, Cơm, Bún" onChange={(e) => changeSearch(e.target.value)} />
      <div className={styles['demo-infinite-container']}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={1}
          loadMore={loadMore}
          hasMore={!loading && !noMore}
          useWindow={false}
        >
          <List
            dataSource={data.list}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Avatar src={item.pic_url} />}
                  title={<a href="https://ant.design">{item.product_name}</a>}
                  description={item.product_type_name}
                />
              </List.Item>
            )}
          >
            {loadingMore && !noMore && (
              <div className={styles['demo-loading-container']}>
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default AddProductModal;
