import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import IntroduceRow from './components/IntroduceRow';
import SystemAdminDashboard from './system_admin_dashboard';
import SalesCard from './components/SalesCard';
import { getAuthority } from '@/utils/authority';
import IntroduceRowProvider from './components/IntroduceRowProvider';
import SalesCardAdmin from './components/SalesCardAdmin';

const DashboardAnalysis = () => {
  const isStoreManager = getAuthority()?.includes(ROLE_DATA.PROVIDER);

  return (
    <PageContainer>
      {isStoreManager ? (
        <>
          <>
            <IntroduceRowProvider />
          </>
          <SalesCard />
        </>
      ) : (
        <>
        <>
          <IntroduceRow />
        </>
        <SalesCardAdmin />
      </>
      )}
    </PageContainer>
  );
};

export default DashboardAnalysis;
