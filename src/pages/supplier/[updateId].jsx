import SupplierForm from '@/components/Form/SupplierForm';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@ant-design/pro-layout';
import React, { useRef, useState } from 'react';
import {
  createStoreOfSupplier,
  deleteStoreOfSupplier,
  updateStoreOfSupplier,
  updateSupplier,
} from '@/services/brand';
import ResoTable from '@/components/ResoTable/ResoTable';

import { storeColumns } from '@/pages/store/config';
import { Button, message } from 'antd';
import { ModalForm } from '@ant-design/pro-form';
import { PlusCircleOutlined } from '@ant-design/icons';
import StoreForm from '@/components/Form/StoreForm';
import AsyncButton from '@/components/AsyncButton';
import { getAuthority } from '@/utils/authority';

const UpdateSupplier = (props) => {
  const {
    match: {
      params: { updateId },
    },
    location: { state: supplier },
  } = props;
  const [selectedRows, setSelectedRows] = useState([]);

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
  };
  const ref = useRef();
  const isStoreManager = getAuthority()?.includes(ROLE_DATA.PROVIDER);

  return (
    <PageContainer>
      <ProCard direction="column" gutter={16} title="Thông tin Nhà cung cấp" headerBordered>
        <SupplierForm
          submitter={false}
          onFinish={(values) => updateSupplier(updateId, values)}
          initialValues={supplier}
          readOnly={isStoreManager}
        />
        {isStoreManager && (
          <ProCard
            gutter={[0, 16]}
            style={{ marginTop: 16 }}
            type="inner"
            title="Danh sách cửa hàng nhà cung cấp"
            headerBordered
            bordered
            extra={
              <ModalForm
                trigger={
                  <Button type="link">
                    <PlusCircleOutlined />
                    Thêm cửa hàng
                  </Button>
                }
                title="Thêm cửa hàng"
                onFinish={async (values) => {
                  const res = await createStoreOfSupplier(updateId, values);
                  if (res.status >= 400) {
                    message.error(`Có lỗi khi tạo`);
                    return false;
                  }
                  message.success(`Tạo thành công ${values.name} `);
                  ref.current?.reload();

                  return true;
                }}
              >
                <StoreForm />
              </ModalForm>
            }
          >
            <ResoTable
              actionRef={ref}
              search={false}
              columns={[
                ...storeColumns,
                {
                  title: 'Hành động',
                  width: 100,
                  render: (_, store) => (
                    <ModalForm
                      trigger={<Button type="link">Cập nhật</Button>}
                      title="Cập nhật cửa hàng"
                      initialValues={{
                        ...store,
                        time_from_to: [store?.open_time, store?.close_time],
                      }}
                      modalProps={{ destroyOnClose: true }}
                      onFinish={async (values) => {
                        const res = await updateStoreOfSupplier(updateId, store.id, values);
                        console.log('res :>> ', res);
                        if (res.status >= 400) {
                          message.error(`Có lỗi khi cập nhật`);
                          return false;
                        }
                        message.success(`Cập nhật thành công ${values.name} `);
                        ref.current?.reload();

                        return true;
                      }}
                    >
                      <StoreForm store={store} isUpdateMode />
                    </ModalForm>
                  ),
                },
              ]}
              resource={`suppliers/${updateId}/stores`}
              tableAlertOptionRender={({ _, __, onCleanSelected }) => [
                <AsyncButton
                  isNeedConfirm={{
                    title: 'Xác nhận xóa cửa hàng',
                    content: 'Bạn có muốn xóa cửa hàng này không',
                    okText: 'Xác nhận',
                    cancelText: 'Không',
                  }}
                  btnProps={{ danger: true, type: 'link' }}
                  onClick={() =>
                    deleteStoreOfSupplier(updateId, selectedRows[0])
                      .then(() => ref.current?.reload())
                      .then(() => onCleanSelected())
                  }
                  title={`Xóa ${selectedRows.length} cửa hàng`}
                />,
              ]}
              rowSelection={rowSelection}
              rowKey="id"
            />
          </ProCard>
        )}
      </ProCard>
    </PageContainer>
  );
};

export default UpdateSupplier;
