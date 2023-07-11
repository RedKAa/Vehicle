import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import { columns } from './config';
import { ModalForm } from '@ant-design/pro-form';
import { activationById, createVehicleOwner, updateVehicleOwner } from '@/services/v_vehicleowner';
import VehicleOwnerForm from '@/components/Form/v_VehicleOwnerForm/VehicleOwnerForm';


const Page = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = React.useState(false);

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'checkbox',
  };

  const activationHandler = (data) => {
    Promise.resolve(activationById(data.id, { ...data })).then(() => {
      ref.current?.reload();
    });
  };

  const createHandler = async (values) => {
    console.log(`values`, values);
    const res = await createVehicleOwner(values);
    ref.current?.reload();
    return true;
  };

  const dcolumns = [
    ...columns,
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
      render: (_, vehicleowner) => {
        return (
          <Switch
            checked={vehicleowner.status == 'Active' ? true : false}
            onChange={(bool) => {
              let status = bool ? 'Active' : 'Disable';
              let id = vehicleowner.id;
              activationHandler({id, status});
            }}
          />
        );
      },
    },
    {
      title: 'Hành động',
      search: false,
      render: (_, vehicleowner) =>
        (<ModalForm
          title="Cập nhật chủ sở hữu "
          modalProps={{
            destroyOnClose: true,
          }}
          name="upadte-vehicleowner"
          key={`upadte-vehicleowner${vehicleowner.id}`}
          initialValues={vehicleowner}
          onFinish={(values) =>
            updateVehicleOwner(vehicleowner.id, values)
              .then(ref.current?.reload)
              .then(() => true)
          }
          trigger={<Button type="link">Cập nhật</Button>}
        >
          <VehicleOwnerForm update/>
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
              title: 'Xác nhận xóa chủ sở hữu',
              content: 'Bạn có muốn xóa chủ sở hữu này không',
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            // onClick={() => deleteBlogHandler().then(onCleanSelected)}
            title={`Xóa ${selectedRows.length} chủ sở hữu`}
            key={1}
          />,
        ]}
        columns={dcolumns}
        scroll={{
          x: 650,
        }}
        toolBarRender={() => [
          <ModalForm
            title="Tạo chủ sở hữu"
            modalProps={{
              destroyOnClose: true,
            }}
            onValuesChange={console.log}
            onFinishFailed={console.log}
            name="create-vehicleowner"
            key="create-vehicleowner"
            visible={visible}
            onFinish={createHandler}
            submitter={{
              render: (props, defaultDoms) => {
                return [
                  // ...defaultDoms,
                  <Button
                  key="cancel"
                  onClick={() => {
                    setVisible(false);
                  }}
                 > Hủy
                 </Button>,
                  <Button
                    key="ok"
                    type="primary"
                    onClick={() => {
                      try {
                        props.form.validateFields().then((values) => {
                          console.log(`values`, values);
                          setVisible(false);
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
            trigger={<Button icon={<PlusOutlined />} type="primary"  onClick={() => setVisible(true)}>Thêm chủ sở hữu</Button>}
          >
            <VehicleOwnerForm />
          </ModalForm>
        ]}
        rowKey="id"
        resource="vehicleowners"
        actionRef={ref}
        isShowSelection={false}
        // additionParams={{orderBy: 'createAt-dec'}}
      />
    </PageContainer>
  );
};

export default Page;
