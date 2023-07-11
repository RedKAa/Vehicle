import React from 'react';
import { Col, Row, Spin, Typography } from 'antd';
import { FormattedMessage } from 'umi';
import numeral from 'numeral';
import { getAreaStaff } from '@/services/area-staff';
import { useRequest } from '@umijs/hooks';
import { getAuthority } from '@/utils/authority';
import { getSupplierSaleData } from '../service';
import ChartCard from './Charts/ChartCard';
import { getTimeDistance } from '../utils/utils';
import { convertDateToStr } from '@/utils/utils';

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
const INTERVALPOLLSALETIME = 5000;
const IntroduceRow = () => {
  const isStoreManager = getAuthority()?.includes(ROLE_DATA.PROVIDER);
  const dayFilter = getTimeDistance('day');

  let kpiStartDate = convertDateToStr(dayFilter[0], 'MM/DD/YYYY');
  let kpiEndDate = convertDateToStr(dayFilter[1], 'MM/DD/YYYY');

  const { loading, data: salesData } = useRequest(() => getSupplierSaleData({kpiStartDate, kpiEndDate}), {
    // refreshDeps: [state.rangePickerValue],
    formatResult: (res) => res,
    pollingInterval: INTERVALPOLLSALETIME,
  });

  const { commissionFee = 0, sellerCommission = 0, providerRevenue = 0, orderSold = 0, voucherSold = 0, qrCodeSold=0} = salesData ?? {};
  return (
    <Spin spinning={loading} style={{ width: '100%' }}>
      <Row gutter={24}>
        <Col span={24}>
          <Typography.Title level={3}>Thống kê hôm nay</Typography.Title>
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title={
              <FormattedMessage
                id="dashboardanalysis.analysis.total-sales"
                defaultMessage="Tổng đơn ngày hôm nay"
              />
            }
            total={() => <>{orderSold}</>}
            contentHeight={24}
          >
            {/* TOTAL ORDER */}
          </ChartCard>
        </Col>
        {isStoreManager && <><Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="Thu nhập"
            total={() => <>{numeral(providerRevenue).format('0,0')} VND</>}
            contentHeight={24}
          >
            {/* TOTAL ORDER */}
          </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
        {/* SALE */}
        <ChartCard
          bordered={false}
          title={'Tổng hoa hồng đã trả'}
          total={() => <>{numeral(commissionFee).format('0,0')} VND</>}
          contentHeight={24}
        >
          {/* TOTAL ORDER */}
        </ChartCard>
      </Col></>
      }
      {!isStoreManager && <>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title={
              <FormattedMessage
                id="voucher"
                defaultMessage="Tổng voucher đã bán"
              />
            }
            total={() => <>{qrCodeSold}</>}
            contentHeight={24}
          >
            {/* TOTAL ORDER */}
          </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
        {/* SALE */}
        <ChartCard
          bordered={false}
          title={'Tổng hoa hồng nhận được'}
          total={() => <>{numeral(commissionFee).format('0,0')} VND</>}
          contentHeight={24}
        >
          {/* TOTAL ORDER */}
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        {/* SALE */}
        <ChartCard
          bordered={false}
          title={'Tổng hoa hồng cho CTV'}
          total={() => <>{numeral(sellerCommission).format('0,0')} VND</>}
          contentHeight={24}
        >
          {/* TOTAL ORDER */}
        </ChartCard>
      </Col>
      </>
      }
      </Row>
    </Spin>
  );
};

export default IntroduceRow;
