import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import { columns } from './config';
import { ModalForm } from '@ant-design/pro-form';
import { activationById, createVehicle, updateVehicle } from '@/services/v_vehicle';
import VehicleForm from '@/components/Form/v_VehicleForm/VehicleForm';
import VehicleOwnerForm from '@/components/Form/v_VehicleOwnerForm/VehicleOwnerForm';
import AccountForm from '@/components/Form/AccountForm/AccountForm';
import WarehouseForm from '@/components/Form/v_WarehouseForm/WarehouseForm';


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
    const res = await createVehicle(values);
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
      render: (_, vehicle) => {
        return (
          <Switch
            checked={vehicle.status == 'Active' ? true : false}
            onChange={(bool) => {
              let status = bool ? 'Active' : 'Disable';
              let id = vehicle.id;
              activationHandler({id, status});
            }}
          />
        );
      },
    },
    {
      title: 'Kho bãi',
      sorter: true,
      dataIndex: 'wareHouse',
      hideInForm: true,
      hideInTable: true,
      search: false,
      render: (_, { wareHouse }) => (
        <ModalForm
          title="Chủ xe"
          name="upadte-account"
          key={`upadte-account_${wareHouse.name}`}
          initialValues={wareHouse}
          modalProps={{
            destroyOnClose: true,
          }}
          submitter={{
            searchConfig: {
              submitText: 'Ok',
          },
          render: (props, doms) => {
            return [
            ];
          },
          }}
        >
          <WarehouseForm readonly/>
        </ModalForm>
      ),
    },
    {
      title: 'Nhân viên',
      sorter: true,
      dataIndex: 'staff',
      hideInForm: true,
      search: false,
      render: (_, { staff }) => (
        <ModalForm
          title="Nhân viên"
          name="upadte-account"
          key={`upadte-account_${staff?.userName}`}
          initialValues={staff}
          onFinish={(values) =>
            updateAccount(staff.id, values)
              .then(ref.current?.reload)
              .then(() => true)
          }
          trigger={<Button type="link">{staff?.userName}</Button>}
        >
          <AccountForm updateMode/>
        </ModalForm>
      ),
    },
    {
      title: 'Thẩm định viên',
      sorter: true,
      dataIndex: 'assessor',
      hideInForm: true,
      search: false,
      render: (_, { assessor }) => (
        <ModalForm
          title="Nhân viên"
          name="upadte-account"
          key={`upadte-account_${assessor?.userName}`}
          initialValues={assessor}
          onFinish={(values) =>
            updateAccount(assessor.id, values)
              .then(ref.current?.reload)
              .then(() => true)
          }
          trigger={<Button type="link">{assessor?.userName}</Button>}
        >
          <AccountForm updateMode/>
        </ModalForm>
      ),
    },
    {
      title: 'Kiểm duyệt',
      sorter: true,
      dataIndex: 'approver',
      hideInForm: true,
      search: false,
      render: (_, { approver }) => (
        <ModalForm
          title="Nhân viên"
          name="upadte-account"
          key={`upadte-account_${approver?.userName}`}
          initialValues={approver}
          onFinish={(values) =>
            updateAccount(approver.id, values)
              .then(ref.current?.reload)
              .then(() => true)
          }
          trigger={<Button type="link">{approver?.userName}</Button>}
        >
          <AccountForm updateMode/>
        </ModalForm>
      ),
    },
    {
      title: 'Chủ xe',
      sorter: true,
      dataIndex: 'vehicleOwner',
      hideInForm: true,
      hideInTable: false,
      search: false,
      render: (_, { vehicleOwner }) => (
        <ModalForm
          title="Chủ xe"
          name="upadte-account"
          key={`upadte-account_${vehicleOwner.name}`}
          initialValues={vehicleOwner}
          modalProps={{
            destroyOnClose: true,
          }}
          submitter={{
            searchConfig: {
              submitText: 'Ok',
          },
          render: (props, doms) => {
            return [
            ];
          },
          }}
          trigger={<Button type="link">{vehicleOwner.name}</Button>}
        >
          <VehicleOwnerForm readonly/>
        </ModalForm>
      ),
    },
    {
      title: 'Thẩm định viên',
      sorter: true,
      dataIndex: 'assessor',
      hideInForm: true,
      hideInTable: true,
      search: false,
      render: (_, { assessor }) => (
        <ModalForm
          title="Chủ xe"
          name="upadte-account"
          key={`upadte-account_${assessor.userName}`}
          initialValues={assessor}
          modalProps={{
            destroyOnClose: true,
          }}
          submitter={{
            searchConfig: {
              submitText: 'Ok',
          },
          render: (props, doms) => {
            return [
            ];
          },
          }}
        >
          <AccountForm readonly/>
        </ModalForm>
      ),
    },
    {
      title: 'Hành động',
      search: false,
      render: (_, vehicle) =>
        (<ModalForm
          title="Cập nhật xe"
          modalProps={{
            destroyOnClose: true,
          }}
          name="upadte-vehicle"
          key={`upadte-vehicle${vehicle.id}`}
          initialValues={vehicle}
          onFinish={(values) =>
            updateVehicle(vehicle.id, values)
              .then(ref.current?.reload)
              .then(() => true)
          }
          trigger={<Button type="link">Cập nhật</Button>}
        >
          <VehicleForm update/>
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
              title: 'Xác nhận xóa xe',
              content: 'Bạn có muốn xóa xe này không',
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            // onClick={() => deleteBlogHandler().then(onCleanSelected)}
            title={`Xóa ${selectedRows.length} xe`}
            key={1}
          />,
        ]}
        columns={dcolumns}
        scroll={{
          x: 650,
        }}
        toolBarRender={() => [
          <ModalForm
            title="Tạo xe"
            modalProps={{
              destroyOnClose: true,
            }}
            onValuesChange={console.log}
            onFinishFailed={console.log}
            name="create-vehicle"
            key="create-vehicle"
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
                    type='primary'
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
            trigger={<Button icon={<PlusOutlined />} type='primary'  onClick={() => setVisible(true)}>Thêm xe</Button>}
          >
            <VehicleForm />
          </ModalForm>
        ]}
        rowKey="id"
        resource="vehicles"
        actionRef={ref}
        isShowSelection={false}
        // additionParams={{orderBy: 'createAt-dec'}}
      />
    </PageContainer>
  );
};

export default Page;
