import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { PlusOutlined } from '@ant-design/icons';
import { DrawerForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import { deleteCollections, updateCollection, addCollection } from '@/services/collection';
import { groupProductColumns } from './config';
import CollectionForm from './collection-form';

const GroupProduct = () => {
  const ref = useRef();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const rowSelection = {
    onChange: setSelectedRowKeys,
    type: 'checkbox',
  };

  const colums = [
    ...groupProductColumns,
    {
      title: 'Hành động',
      search: false,
      width: 100,
      fixed: 'right',
      render: (collection) => (
        <DrawerForm
          modalProps={{
            destroyOnClose: true,
          }}
          name="update-collection"
          width="28rem"
          key="update-collection"
          submitter={{
            searchConfig: {
              submitText: 'Cập nhật NSP',
              resetText: 'Quay về',
            }
          }}
          onKeyPress={e => handleKeyPress(e)}
          onFinish={(submitData) => {
            return updateCollection(submitData)
              .then(ref.current?.reload)
              .then(() => true);
          }}
          title={`Cập nhật ${collection.name}`}
          trigger={<Button type="link">Cập nhật</Button>}
          initialValues={collection}
        >
          <CollectionForm />
        </DrawerForm>
      ),
    },
  ];

  //prevent form submit when hit Enter inside text area 
  const handleKeyPress = (e) => {
    e.keyCode === 13 ? e.preventDefault() : ''
  }

  return (
    <PageContainer>
      <ResoTable
        columns={colums}
        resource="collections"
        tableAlertOptionRender={({ onCleanSelected }) => [
          <AsyncButton
            isNeedConfirm={{
              title: 'Xác nhận xóa các NSP',
              content: `Bạn có muốn xóa ${selectedRowKeys.length} NSP này không`,
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            onClick={() => {
              return deleteCollections(selectedRowKeys)
                .then(onCleanSelected)
                .then(ref.current?.reload)
                .then(() => true)
            }}
            title={`Xóa ${selectedRowKeys.length} NSP`}
          />,
        ]}
        toolBarRender={() => [
          <Button type="primary" onClick={() => setShowCreateModal(true)} icon={<PlusOutlined />}>
            Thêm NSP
          </Button>,
        ]}
        pagination
        actionRef={ref}
        rowKey="id"
        scroll={{
          x: 650,
        }}
        rowSelection={rowSelection}
      />

      {/* CREATE_FORM */}
      <DrawerForm
        modalProps={{
          destroyOnClose: true,
        }}
        initialValues={{
          position: 0,
          show_on_home: true,
        }}
        onKeyPress={e => handleKeyPress(e)}
        visible={showCreateModal}
        name="create-collection"
        key="create-collection"
        width="28rem"
        submitter={{
          searchConfig: {
            submitText: 'Tạo NSP',
            resetText: 'Quay về',
          }
        }}
        onFinish={(newCollection) => {
          return addCollection(newCollection)
            .then(setShowCreateModal(false))
            .then(ref.current?.reload)
            .then(() => true);
        }}
        onVisibleChange={setShowCreateModal}
        title="Tạo NSP"
      >
        <CollectionForm />
      </DrawerForm>
    </PageContainer>
  );
};

export default GroupProduct;
