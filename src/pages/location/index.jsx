import React from 'react';
import {
  addLocationToStore,
  getLocations,
  deleteLocationFromStore,
  updateLocation,
} from '@/services/store';
import { DeleteTwoTone, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { ModalForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from '@umijs/hooks';
import { Button, message, Popconfirm, Result, Space, Spin, Typography } from 'antd';
import LocationForm from './location-form';
import ProList from '@ant-design/pro-list';
import AsyncButton from '@/components/AsyncButton';
import {
  createDestinationLocation,
  deleteDestinationLocation,
  updateDestinationLocation,
} from '@/services/location';
import DestinationForm from './destination-form';

const LocationPage = () => {
  const { data: locations, loading, error, refresh } = useRequest(getLocations);

  if (error) {
    return <Result status="error" title={error} />;
  }

  return (
    <PageContainer
      extra={[
        <ModalForm
          key="add-location-modal"
          trigger={
            <Button type="ghost">
              <PlusCircleOutlined />
              Thêm điểm giao
            </Button>
          }
          title="Thêm nơi nhận"
          onFinish={async (values) => {
            if (!(values.lat && values.long)) {
              message.error({ content: 'Vui lòng chọn địa chỉ' });
              return false;
            }
            await addLocationToStore(values);
            refresh();
            return true;
          }}
        >
          <LocationForm />
        </ModalForm>,
      ]}
    >
      <Spin spinning={loading}>
        <ProCard title="Danh sách điểm giao" gutter={8}>
          {locations?.map((location) => {
            const { address, destination_id } = location;
            return (
              <ProCard
                key={`location_${destination_id}`}
                headerBordered
                title={
                  <Typography.Paragraph
                    style={{ margin: 0 }}
                    title={address}
                    ellipsis={{ rows: 2 }}
                  >
                    {address}
                  </Typography.Paragraph>
                }
                colSpan={{ xs: 12, sm: 8, md: 10, lg: 12 }}
                extra={
                  <Space direction="horizontal">
                    <Popconfirm
                      title="Bạn có muốn xóa điểm giao này?"
                      onConfirm={() => deleteLocationFromStore(destination_id).then(refresh)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="text">
                        <DeleteTwoTone twoToneColor="#eb2f4e" />
                      </Button>
                    </Popconfirm>
                    <ModalForm
                      trigger={<Button type="link" icon={<EditOutlined />} />}
                      title="Cập nhật điểm giao"
                      initialValues={location}
                      onFinish={async (values) => {
                        if (!(values.lat && values.long)) {
                          message.error({ content: 'Vui lòng chọn địa chỉ' });
                          return false;
                        }
                        await updateLocation(destination_id, values);
                        refresh();
                        message.success(`Cập nhật thành công ${values.address} `);
                        return true;
                      }}
                    >
                      <LocationForm location={location} />
                    </ModalForm>
                  </Space>
                }
                layout="center"
                bordered
                bodyStyle={{
                  padding: 0,
                }}
              >
                {/* RENDER DESTINATION DETAIL */}
                <ProList
                  style={{ width: '100%' }}
                  rowKey="destination_location_id"
                  headerTitle="Chi tiết"
                  dataSource={location.locations}
                  toolBarRender={() => {
                    return [
                      <ModalForm
                        initialValues={{
                          destination_id,
                        }}
                        width="400px"
                        title="Tạo mới chi tiết điểm giao"
                        onFinish={(data) =>
                          createDestinationLocation(data)
                            .then(() => true)
                            .then(refresh)
                        }
                        key="add-destination-location"
                        trigger={<Button>Thêm địa điểm chi tiết</Button>}
                      >
                        <DestinationForm />
                      </ModalForm>,
                    ];
                  }}
                  editable={{
                    onSave: (key, record) => true,
                    actionRender: (row, action, defaultDoms) => (
                      <>
                        <AsyncButton
                          btnProps={{
                            type: 'link',
                          }}
                          onClick={() => {
                            return updateDestinationLocation(row.destination_location_id, {
                              ...action.form.getFieldsValue()[row.destination_location_id],
                              destination_id,
                            })
                              .then(() => action.cancelEditable(row.destination_location_id))
                              .then(refresh);
                          }}
                          title="Lưu"
                        />
                        <Button
                          type="default"
                          onClick={() => {
                            action.cancelEditable(row.destination_location_id);
                          }}
                        >
                          Hủy
                        </Button>
                      </>
                    ),
                  }}
                  metas={{
                    title: {
                      dataIndex: 'name',
                    },
                    avatar: {
                      dataIndex: 'index',
                      valueType: 'indexBorder',
                      width: 48,
                    },
                    description: {
                      dataIndex: 'description',
                    },
                    actions: {
                      render: (text, row, index, action) => [
                        <AsyncButton
                          key="remove"
                          btnProps={{
                            type: 'link',
                            danger: true,
                          }}
                          onClick={() => {
                            return deleteDestinationLocation(row.destination_location_id)
                              .then(() => action.cancelEditable(row.destination_location_id))
                              .then(refresh);
                          }}
                          title="Xóa"
                          isNeedConfirm={{
                            title: 'Xác nhận xóa địa điểm',
                            content: 'Bạn có muốn xóa địa điểm này không',
                          }}
                        />,
                        <Button
                          onClick={() => {
                            action?.startEditable(row.destination_location_id);
                          }}
                          key="link"
                          type="link"
                        >
                          Sửa
                        </Button>,
                      ],
                    },
                  }}
                />
              </ProCard>
            );
          })}
        </ProCard>
      </Spin>
    </PageContainer>
  );
};

export default LocationPage;
