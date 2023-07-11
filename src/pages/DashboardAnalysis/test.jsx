import React from 'react';

import { PageContainer } from '@ant-design/pro-layout';
import MenuList from '@/pages/menu/menu-list';
import IntroduceRow from './components/IntroduceRow';
import { Card, Col, Row, Spin, Typography } from 'antd';
import { FormattedMessage } from 'umi';
import useRequest from '@umijs/use-request';
import { getAreaStaff } from '@/services/area-staff';
import { getSaleData } from './service';
import numeral from 'numeral';
import { getAuthority } from '@/utils/authority';

const INTERVALPOLLSALETIME = 5000;

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};
const DashboardAnalysis = (props) => {
  const isStoreManager = getAuthority()?.includes(ROLE_DATA.PROVIDER);
  const { loading: loadingDriver, data: driverData } = useRequest(
    () =>
      getAreaStaff({
        'role-type': [ROLE_DATA.DRIVER],
        'is-available': true,
      }),
    {
      formatResult: (res) => res.data,
      cacheKey: 'driver_data',
      manual: !isStoreManager,
    },
  );

  const { loading, data: salesData } = useRequest(() => getSaleData(), {
    // refreshDeps: [state.rangePickerValue],
    formatResult: (res) => res.data,
    pollingInterval: INTERVALPOLLSALETIME,
    manual: !isStoreManager,
  });

  const driverQuantity = driverData?.length ?? 0;
  const { order = 0, order_item = 0, sale = 0 } = salesData ?? {};

  return (
    <PageContainer>
      <Spin spinning={loading} style={{ width: '100%' }}>
        <Row gutter={24}>
          <Col span={24}>
            <Typography.Title level={3}>Thống kê hôm nay</Typography.Title>
          </Col>
          <Col {...topColResponsiveProps}></Col>
          <Col {...topColResponsiveProps}></Col>

          <Col {...topColResponsiveProps}>{/* SALE */}</Col>
          <Col {...topColResponsiveProps}>{/* SALE */}</Col>
        </Row>
      </Spin>
    </PageContainer>
  );
};

export default DashboardAnalysis;
