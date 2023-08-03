import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import { columns } from './config';
import { ModalForm } from '@ant-design/pro-form';
import { activationById, createWarehouse, updateWarehouse } from '@/services/v_warehouse';
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
    const res = await createWarehouse(values);
    ref.current?.reload();
    return true;
  };

  const dcolumns = [
    ...columns,
    // {
    //   title: 'Sức chứa hiện tại',
    //   dataIndex: 'capacity',
    //   width: 150,
    //   valueType: 'select',
    //   valueEnum: {
    //     Low: { text: 'Thấp', status: 'New' },
    //     Medium: { text: 'Trung bình', status: 'Processing' },
    //     High: { text: 'Cao', status: 'Error' },
    //   },
    //   search: true,
    //   align: 'center'
    // },
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
      render: (_, warehouse) => {
        return (
          <Switch
            checked={warehouse.status == 'Active' ? true : false}
            onChange={(bool) => {
              let status = bool ? 'Active' : 'Disable';
              let id = warehouse.id;
              activationHandler({id, status});
            }}
          />
        );
      },
    },
    {
      title: 'Hành động',
      search: false,
      render: (_, warehouse) =>
        (<ModalForm
          title="Cập nhật kho bãi"
          modalProps={{
            destroyOnClose: true,
          }}
          name="upadte-warehouse"
          key={`upadte-warehouse${warehouse.id}`}
          initialValues={warehouse}
          onFinish={(values) =>
            updateWarehouse(warehouse.id, values)
              .then(ref.current?.reload)
              .then(() => true)
          }
          trigger={<Button type="link">Cập nhật</Button>}
        >
          <WarehouseForm update/>
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
              title: 'Xác nhận xóa kho',
              content: 'Bạn có muốn xóa kho này không',
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            // onClick={() => deleteBlogHandler().then(onCleanSelected)}
            title={`Xóa ${selectedRows.length} kho`}
            key={1}
          />,
        ]}
        columns={dcolumns}
        scroll={{
          x: 650,
        }}
        toolBarRender={() => [
          <ModalForm
            title="Tạo kho"
            modalProps={{
              destroyOnClose: true,
            }}
            onValuesChange={console.log}
            onFinishFailed={console.log}
            name="create-warehouse"
            key="create-warehouse"
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
            trigger={<Button icon={<PlusOutlined />} type='primary'  onClick={() => setVisible(true)}>Thêm kho</Button>}
          >
            <WarehouseForm />
          </ModalForm>
        ]}
        rowKey="id"
        resource="warehouses"
        actionRef={ref}
        isShowSelection={false}
        // additionParams={{orderBy: 'createAt-dec'}}
      />
    </PageContainer>
  );
};

export default Page;
