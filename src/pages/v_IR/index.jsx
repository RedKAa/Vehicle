import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import { columns } from './config';
import { ModalForm } from '@ant-design/pro-form';
import { activationById, createItemreceipt, updateItemreceipt } from '@/services/v_itemreceipt';
import ItemreceiptForm from '@/components/Form/v_ItemreceiptForm/ItemreceiptForm';
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
    const res = await createItemreceipt(values);
    ref.current?.reload();
    return true;
  };

  const dcolumns = [
    ...columns,
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
      render: (_, itemreceipt) => {
        return (
          <Switch
            checked={itemreceipt.status == 'Active' ? true : false}
            onChange={(bool) => {
              let status = bool ? 'Active' : 'Disable';
              let id = itemreceipt.id;
              activationHandler({id, status});
            }}
          />
        );
      },
    },
    {
      title: 'Hành động',
      search: false,
      render: (_, itemreceipt) =>
        (<ModalForm
          title="Cập nhật Phiếu nhập hàng bãi"
          modalProps={{
            destroyOnClose: true,
          }}
          name="upadte-itemreceipt"
          key={`upadte-itemreceipt${itemreceipt.id}`}
          initialValues={itemreceipt}
          onFinish={(values) =>
            updateItemreceipt(itemreceipt.id, values)
              .then(ref.current?.reload)
              .then(() => true)
          }
          trigger={<Button type="link">Cập nhật</Button>}
        >
          <ItemreceiptForm update/>
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
              title: 'Xác nhận xóa Phiếu nhập hàng',
              content: 'Bạn có muốn xóa Phiếu nhập hàng này không',
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            // onClick={() => deleteBlogHandler().then(onCleanSelected)}
            title={`Xóa ${selectedRows.length} Phiếu nhập hàng`}
            key={1}
          />,
        ]}
        columns={dcolumns}
        scroll={{
          x: 650,
        }}
        toolBarRender={() => [
          <ModalForm
            title="Tạo Phiếu nhập hàng"
            modalProps={{
              destroyOnClose: true,
            }}
            onValuesChange={console.log}
            onFinishFailed={console.log}
            name="create-itemreceipt"
            key="create-itemreceipt"
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
            trigger={<Button icon={<PlusOutlined />} type='primary'  onClick={() => setVisible(true)}>Thêm Phiếu nhập hàng</Button>}
          >
            <ItemreceiptForm />
          </ModalForm>
        ]}
        rowKey="id"
        resource="itemreceipts"
        actionRef={ref}
        isShowSelection={false}
        // additionParams={{orderBy: 'createAt-dec'}}
      />
    </PageContainer>
  );
};

export default Page;
