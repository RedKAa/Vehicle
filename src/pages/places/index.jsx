import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import { placesColumn } from './config';
import { ModalForm } from '@ant-design/pro-form';
import { updatePlaceById, createPlace, updatePlace } from '@/services/place';
import PlaceForm from '@/components/Form/PlaceForm/PlaceForm';

const PlacesPage = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = React.useState(false);

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'checkbox',
  };

  const activationHandler = (data) => {
    Promise.resolve(updatePlaceById(data.id, { ...data })).then(() => {
      ref.current?.reload();
    });
  };

  const createHandler = async (values) => {
    console.log(`values`, values);
    const res = await createPlace(values);
    ref.current?.reload();
    return true;
  };

  const columns = [
    ...placesColumn,
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 150,
      valueType: 'select',
      valueEnum: {
        true: { text: 'Đang hiển thị', status: 'Processing' },
        false: { text: 'không hiển thị', status: 'Error' },
      },
      search: false,
      align: 'center',
      render: (_, place) => {
        return (
          <Switch
            checked={place.status == 'Active' ? true : false}
            onChange={(bool) => {
              let status = bool ? 'Active' : 'Disable';
              let id = place.id;
              activationHandler({id, status});
            }}
          />
        );
      },
    },
    {
      title: 'Hành động',
      search: false,
      render: (_, place) =>
        (<ModalForm
          title="Cập nhật địa điểm"
          modalProps={{
            destroyOnClose: true,
          }}
          width="500px"
          name="upadte-place"
          key={`upadte-place${place.id}`}
          initialValues={place}
          onFinish={(values) =>
            updatePlace(place.id, values)
              .then(ref.current?.reload)
              .then(() => true)
          }
          trigger={<Button type="link">Cập nhật</Button>}
        >
          <PlaceForm update/>
        </ModalForm>),
    }
  ];

  return (
    <PageContainer>
      <ResoTable
        rowSelection={rowSelection}
        tableAlertOptionRender={({ _, __, onCleanSelected }) => [
          <AsyncButton
            isNeedConfirm={{
              title: 'Xác nhận xóa địa điểm',
              content: 'Bạn có muốn xóa địa điểm này không',
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            // onClick={() => deleteBlogHandler().then(onCleanSelected)}
            title={`Xóa ${selectedRows.length} địa điểm`}
            key={1}
          />,
        ]}
        columns={columns}
        scroll={{
          x: 650,
        }}
        toolBarRender={() => [
          <ModalForm
            title="Tạo địa điểm"
            modalProps={{
              destroyOnClose: true,
            }}
            onValuesChange={console.log}
            onFinishFailed={console.log}
            name="create-place"
            key="create-place"
            visible={visible}
            onFinish={createHandler}
            submitter={{
              render: (props, defaultDoms) => {
                return [
                  // ...defaultDoms,
                  <Button
                    key="ok"
                    onClick={() => {
                      setVisible(false);
                      try {
                        props.form.validateFields().then((values) => {
                          console.log(`values`, values);
                          createHandler(values);
                          props.reset();
                        });
                      } catch (error) {
                        console.log(`error`, error);
                      }
                    }}
                  >
                    Tạo
                  </Button>,
                ];
              },
            }}
            trigger={<Button icon={<PlusOutlined />} type="primary"  onClick={() => setVisible(true)}>Thêm địa điểm</Button>}
          >
            <PlaceForm />
          </ModalForm>
        ]}
        rowKey="id"
        resource="places"
        actionRef={ref}
        isShowSelection={false}
        additionParams={{orderBy: 'createAt-dec'}}
      />
    </PageContainer>
  );
};

export default PlacesPage;
