import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import ProCard from '@ant-design/pro-card';
import { createSupplier } from '@/services/brand';
import SupplierForm from '@/components/Form/SupplierForm';

const CreateSupplier = ({ history }) => {
  const createSupplierHandler = (supplier) => {
    return createSupplier(supplier).then((res) => {
      if (res?.data) {
        history.replace(`/supplier/${res.data.id}`, { ...res.data, name: res.brand_name });
      }
    });
  };

  return (
    <PageContainer content="Tạo Nhà cung cấp">
      <ProCard>
        <SupplierForm onFinish={createSupplierHandler} />
      </ProCard>
    </PageContainer>
  );
};

export default CreateSupplier;
