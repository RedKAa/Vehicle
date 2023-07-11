import React, { useRef, useState } from 'react';
import AsyncButton from '@/components/AsyncButton';
import { PageContainer } from '@ant-design/pro-layout';
import ResoTable from '@/components/ResoTable/ResoTable';
import { useLocation, history } from 'umi';

import { orderColumns } from './config';
import { getTimeDistance } from '@/pages/DashboardAnalysis/utils/utils';
import { Alert, Button, DatePicker, Drawer, Dropdown, Menu, Space, Typography } from 'antd';
import request from '@/utils/requestServer';
import ProList from '@ant-design/pro-list';
import { getTableData2 } from '@/services/table';
import { ArrowLeftOutlined } from '@ant-design/icons';
import OrderDetail from './order-detail';
import { convertDateToStr } from '@/utils/utils';
// import OrderDetail from './order-detail';

const SupplierOrderList = (props) => {
  const {
    query: { supplierId },
    pathname,
  } = useLocation();

  console.log(`location`, location);

  const [currentOrderId, setCurrentOrderId] = useState(null);

  const [currentSupplierId, setCurrentSupplierId] = useState(supplierId);

  React.useEffect(() => {
    setCurrentSupplierId(supplierId);
  }, [supplierId]);

  const formRef = useRef();

  const addedComlumn = [
    ...orderColumns,
    {
      title: 'Hành động',
      search: false,
      render: (_, { order_id }) => (
        <Button type="link" onClick={() => setCurrentOrderId(order_id)}>
          Chi tiết
        </Button>
      ),
      fixed: 'right',
    },
  ];

  const [urlDownload, setUrlDownload] = useState(null);

  const exportMenu = (
    <Menu onClick={(e) => handleExportOrder(e.key)}>
      <Menu.Item key="today">Theo ngày</Menu.Item>
      <Menu.Item key="week">Theo tuần</Menu.Item>
      <Menu.Item key="month">Theo tháng</Menu.Item>
    </Menu>
  );

  const handleExportOrder = (span = 'today') => {
    let dateRange;
    if (span == 'custom') {
      dateRange = formRef.current.getFieldValue(['dateRange']) ?? getTimeDistance('today');
    } else {
      dateRange = getTimeDistance(span);
    }

    return request(`/suppliers/${supplierId}/orders/export`, {
      method: 'GET',
      responseType: 'blob',
      getResponse: true,
      parseResponse: false,
      params: {
        'from-date': convertDateToStr(dateRange[0], 'YYYY-MM-DD'),
        'to-date': convertDateToStr(dateRange[1], 'YYYY-MM-DD'),
      },
    })
      .then((res) => res.blob())
      .then((res) => {
        console.log('res', res);
        const url = window.URL.createObjectURL(new Blob([res]));
        if (url) setUrlDownload(url);
      });
  };

  if (!currentSupplierId) {
    return (
      <ProList
        pagination={{
          defaultPageSize: 8,
          showSizeChanger: false,
        }}
        grid={{ gutter: 16, column: 2 }}
        metas={{
          title: {
            dataIndex: 'name',
            // render: (_, { name }) => <Typography.Title level={5} >{name}</Typography.Title>
          },
          subTitle: {
            dataIndex: 'address',
          },
          avatar: {
            dataIndex: 'image_url',
          },
          actions: {
            render: (text, { id }) => [
              <Button type="link" onClick={() => history.push(`${pathname}?supplierId=${id}`)}>
                Chọn
              </Button>,
            ],
          },
        }}
        headerTitle="Danh sách nhà cung cấp"
        request={() => getTableData2('suppliers')}
      />
    );
  }

  return (
    <PageContainer
      title={
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            type="link"
            onClick={() => history.push(`${pathname}`)}
          />
          <Typography.Title style={{ margin: 0 }} level={4}>
            Đơn hàng nhà cung cấp
          </Typography.Title>
        </Space>
      }
    >
      <Drawer
        width={1000}
        title={`Thông tin đơn hàng ${currentOrderId}`}
        visible={!!currentOrderId}
        onClose={() => setCurrentOrderId(null)}
        destroyOnClose
      >
        <OrderDetail supplierId={currentSupplierId} orderId={currentOrderId} />
      </Drawer>
      <ResoTable
        // additionParams={{ 'store-id': getCurrentStore() }}
        size="small"
        toolBarRender={() => [
          // <AsyncButton
          //   title="Export File"
          //   btnProps={{
          //     type: 'primary',
          //   }}
          //   onClick={handleExportOrder}
          //   htmlType="submit"
          // />
          <Dropdown.Button onClick={() => handleExportOrder('custom')} overlay={exportMenu}>
            Xuất dữ liệu
          </Dropdown.Button>,
          // <DatePicker.RangePicker showTime={false} onChange={console.log} />,
        ]}
        tableExtraRender={() => {
          return urlDownload ? (
            <Alert
              message={
                <a href={urlDownload} download="file.xlsx">
                  Download Link
                </a>
              }
              type="success"
              closable
              onClose={() => setUrlDownload(null)}
            />
          ) : null;
        }}
        columns={addedComlumn}
        scroll={{
          x: 1300,
          y: 800,
        }}
        rowKey="order_id"
        resource={`suppliers/${currentSupplierId}/orders`}
        formRef={formRef}
        isShowSelection={false}
      />
    </PageContainer>
  );
};

SupplierOrderList.propTypes = {};

export default SupplierOrderList;
