import { formatChartData, formatChartDataP, formatRevenueChartData, formatRevenueChartDataP } from '@/utils/utils';
import { useRequest } from '@umijs/hooks';
import { Card, Col, DatePicker, Row, Spin, Tabs, Typography } from 'antd';
import { Chart, Legend, Line, Point, Tooltip } from 'bizcharts';
import moment from 'moment';
import React from 'react';
import { formatMessage, FormattedMessage } from 'umi';
import { getYearSaleDataProvider } from '../service';
import styles from '../style.less';

const { TabPane } = Tabs;
const rankingListData = [];

for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: formatMessage(
      {
        id: 'dashboardanalysis.analysis.test',
      },
      {
        no: i,
      },
    ),
    total: 323234,
  });
}
const INTERVALPOLLSALETIME = 5000;
const SalesCard = (props) => {
  const [state, setState] = React.useState({
    salesType: 'all',
    currentTabKey: '',
    yearPickerValue: 2022,
  });

  const { loading, data: salesData } = useRequest(
    () =>
    getYearSaleDataProvider({
        year: state.yearPickerValue
      }),
    {
      pollingInterval: INTERVALPOLLSALETIME,
      refreshDeps: [state.yearPickerValue],
      formatResult: (res) => res,
      cacheKey: 'supplier_data',
    },
  );

  const handleYearPickerChange = (yearPickerValue) => {
    console.log(moment(yearPickerValue).year());
    setState({
      ...state,
      yearPickerValue: moment(yearPickerValue).year(),
    });
  };

  // const { yearPickerValue } = state;

  const chartData = React.useMemo(() => {
    if(salesData) {
      return formatRevenueChartDataP(salesData);
    }
    return [];
  }, [salesData]);

  // console.log(`chartData`, chartData);

  const chartDataQ = React.useMemo(() => {
    if(salesData) {
      return formatChartDataP(salesData);
    }
    return [];
  }, [salesData]);

  const scale = {
    temperature: { min: 0 },
    month: {
      formatter: v => {
        return {
          1: 'Tháng 1',
          2: 'Tháng 2',
          3: 'Tháng 3',
          4: 'Tháng 4',
          5: 'Tháng 5',
          6: 'Tháng 6',
          7: 'Tháng 7',
          8: 'Tháng 8',
          9: 'Tháng 9',
          10: 'Tháng 10',
          11: 'Tháng 11',
          12: 'Tháng 12',
        }[v]
      }
    }
  }

  return (
    <>
      <Typography.Title level={4}>Tổng hợp</Typography.Title>
      <Row gutter={8}  style={{ marginTop: '20px' }}>
        <Col xs={24}>
          <Card
            bordered={false}
            bodyStyle={{
              padding: 20,
            }}
            style={{ height: '100%' }}
          >
            <div className={styles.salesCard}>
              <Tabs
                tabBarExtraContent={
                  <div className={styles.salesExtraWrap}>
                    <DatePicker onChange={handleYearPickerChange} picker="year" value={moment()}/>
                  </div>
                }
                size="large"
                tabBarStyle={{
                  marginBottom: 24,
                }}
              >
                <TabPane
                  tab={
                    <FormattedMessage
                      id="dashboardanalysis.analysis.sales.r"
                      defaultMessage="Chi tiết"
                    />
                  }
                  key="sales"
                >
                  <Spin spinning={loading} style={{ width: '100%' }}>
                    <div className={styles.salesBar}>
                     <Chart scale={scale} padding={[30, 300, 100, 200]} autoFit height={350} data={chartData} interactions={['element-active']}>
                      <Point position="month*temperature" color="city" shape='circle' />
                      <Line shape="smooth" position="month*temperature" color="city" label="temperature" />
                      <Tooltip shared showCrosshairs region={null} g2-tooltip-list-item={{display:'flex'}}/>
                      <Legend background={{
                        padding:[5,200,5,36],
                        style: {
                          fill: '#eaeaea',
                          stroke: '#fff'
                        }
                      }} />
                    </Chart>
                    </div>
                  </Spin>
                </TabPane>
              </Tabs>
            </div>
          </Card>
        </Col>

      </Row>
      <Row gutter={8}>
        <Col xs={24}>
          <Card
            // loading={loading}
            bordered={false}
            bodyStyle={{
              padding: 20,
            }}
            style={{ height: '100%' }}
          >
            <div className={styles.salesCard}>
              <Tabs
                tabBarExtraContent={
                  <div className={styles.salesExtraWrap}>
                    <DatePicker onChange={handleYearPickerChange} picker="year" value={moment()}/>
                  </div>
                }
                size="large"
                tabBarStyle={{
                  marginBottom: 24,
                }}
              >
                <TabPane
                  tab={
                    <FormattedMessage
                      id="dashboardanalysis.analysis.sales.q"
                      defaultMessage="Chi tiết"
                    />
                  }
                  key="sales"
                >
                  <Spin spinning={loading} style={{ width: '100%' }}>
                    <div className={styles.salesBar}>
                     <Chart scale={scale} padding={[30, 300, 100, 200]} autoFit height={350} data={chartDataQ} interactions={['element-active']}>
                      <Point position="month*temperature" color="city" shape='circle' />
                      <Line shape="smooth" position="month*temperature" color="city" label="temperature" />
                      <Tooltip shared showCrosshairs region={null} g2-tooltip-list-item={{display:'flex'}}/>
                      <Legend background={{
                        padding:[5,200,5,36],
                        style: {
                          fill: '#eaeaea',
                          stroke: '#fff'
                        }
                      }} />
                    </Chart>
                    </div>
                  </Spin>
                </TabPane>
              </Tabs>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SalesCard;
