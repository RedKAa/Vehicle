import ResoTable from '@/components/ResoTable/ResoTable';
import { removeSupplier } from '@/services/supplier';
import { getAuthority } from '@/utils/authority';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'umi';
import { columns } from './config';

const SupplierList = () => {
  const history = useHistory();

  const isStoreManager = getAuthority()?.includes(ROLE_DATA.PROVIDER);

  const deleteSupplierHandler = (selectedRows) => {
    // console.log('selectedRows', selectedRows);
    return removeSupplier(selectedRows[0])
      .then(() => ref.current?.reload())
      .then(() => true);
  };
  return (
    <PageContainer content="Danh sách Nhà cung cấp">
      <ResoTable
        toolBarRender={() => [
          !isStoreManager && (
            <Button
              type="primary"
              onClick={() => history.push('/supplier/create')}
              icon={<PlusOutlined />}
            >
              Thêm Nhà cung cấp
            </Button>
          ),
        ]}
        rowKey="id"
        onDeleteSelection={deleteSupplierHandler}
        isShowSelection={!isStoreManager}
        columns={[
          ...columns,
          {
            title: 'Hành động',
            search: false,
            fixed: 'right',
            width: 150,
            render: (_, supplier) => (
              <Button
                type="link"
                onClick={() => {
                  history.push({ pathname: `/supplier/${supplier.id}`, state: supplier });
                }}
              >
                Cập nhật
              </Button>
            ),
          },
        ]}
        resource="suppliers"
      />
    </PageContainer>
  );
};

export default SupplierList;
