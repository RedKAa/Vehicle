import { getStore } from '@/services/store';
import ProCard from '@ant-design/pro-card';
import { useRequest } from '@umijs/hooks';
import { Typography } from 'antd';
import React from 'react';

const SystemAdminDashboard = () => {
  const { loading, data } = useRequest(() => getStore(), {
    formatResult: (res) => res.data,
    cacheKey: 'system_data',
  });

  return (
    <ProCard
      loading={loading}
      title={<Typography.Title level={4}>Các khu vực</Typography.Title>}
      ghost
      gutter={8}
    >
      {data &&
        data.map(({ name, address }) => {
          return (
            <ProCard colSpan={6} layout="default" bordered title={`${name}`}>
              {address}
            </ProCard>
          );
        })}
    </ProCard>
  );
};

export default SystemAdminDashboard;
