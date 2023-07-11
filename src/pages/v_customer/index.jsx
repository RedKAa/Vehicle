import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import { columns } from './config';
import { ModalForm } from '@ant-design/pro-form';
import { activationById, createCustomer, updateCustomer } from '@/services/v_customer';
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
    const res = await createCustomer(values);
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
      render: (_, customer) => {
        return (
          <Switch
            checked={customer.status == 'Active' ? true : false}
            onChange={(bool) => {
              let status = bool ? 'Active' : 'Disable';
              let id = customer.id;
              activationHandler({id, status});
            }}
          />
        );
      },
    },
    {
      title: 'Hành động',
      search: false,
      render: (_, customer) =>
        (<ModalForm
          title="Cập nhật khách hàng "
          modalProps={{
            destroyOnClose: true,
          }}
          name="upadte-customer"
          key={`upadte-customer${customer.id}`}
          initialValues={customer}
          onFinish={(values) =>
            updateCustomer(customer.id, values)
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
              title: 'Xác nhận xóa khách hàng',
              content: 'Bạn có muốn xóa khách hàng này không',
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            // onClick={() => deleteBlogHandler().then(onCleanSelected)}
            title={`Xóa ${selectedRows.length} khách hàng`}
            key={1}
          />,
        ]}
        columns={dcolumns}
        scroll={{
          x: 650,
        }}
        toolBarRender={() => [
          <ModalForm
            title="Tạo khách hàng"
            modalProps={{
              destroyOnClose: true,
            }}
            onValuesChange={console.log}
            onFinishFailed={console.log}
            name="create-customer"
            key="create-customer"
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
            trigger={<Button icon={<PlusOutlined />} type="primary"  onClick={() => setVisible(true)}>Thêm khách hàng</Button>}
          >
            <VehicleOwnerForm />
          </ModalForm>
        ]}
        rowKey="id"
        resource="customers"
        actionRef={ref}
        isShowSelection={false}
        // additionParams={{orderBy: 'createAt-dec'}}
      />
    </PageContainer>
  );
};

export default Page;
