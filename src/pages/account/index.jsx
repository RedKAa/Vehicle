import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag, Image, Input, Switch  } from 'antd';
import { ModalForm } from '@ant-design/pro-form';
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ResoTable from '@/components/ResoTable/ResoTable';
import AccountForm from '@/components/Form/AccountForm/AccountForm';
import MutiAccountForm from '@/components/Form/AccountForm/MutiAccountForm';
import { activationById, createAccount, deleteAccount, updateAccount } from '@/services/account';
import AsyncButton from '@/components/AsyncButton';
import {  getValidEmails, getValidPhones, getIds } from '@/utils/utils';
const { TextArea } = Input;

const AccountListPage = () => {
  const ref = React.useRef();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [visibleadd, setVisibleadd] = React.useState(false);
  const [visibleadds, setVisibleadds] = React.useState(false);


  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
  };

  const delecteAccountHandler = () => {
    return deleteAccount(selectedRows[0]).then(() => ref.current?.reload());
  };

  const createHandler = async (values) => {
    console.log(`values`, values);
    let data = {...values};
    const res = await createAccount(data);
    setVisibleadds(false);
    setVisibleadd(false);
    ref.current?.reload();
    return true;
  };

  const activationHandler = (data) => {
    Promise.resolve(activationById(data.id, { ...data })).then(() => {
      ref.current?.reload();
    });
  };

  return (
    <PageContainer title="Danh sách tài khoản">
      <ResoTable
        search={true}
        actionRef={ref}
        // rowSelection={rowSelection}
        tableAlertOptionRender={({ _, __, onCleanSelected }) => [
          <AsyncButton
            isNeedConfirm={{
              title: 'Xác nhận xóa tài khoản',
              content: 'Bạn có muốn xóa tài khoản này không',
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            onClick={() => delecteAccountHandler().then(onCleanSelected)}
            title={`Xóa ${selectedRows.length} tài khoản`}
            key={selectedRows[0]}
          />,
        ]}
        scroll={{
          x: 650,
        }}
        columns={[
          {
            title: 'ID',
            dataIndex: 'id',

            hideInForm: true,
            hideInSearch: true,
            copyable: true,
          },
          // {
          //   title: 'ID',
          //   dataIndex: 'Ids',
          //   hideInTable: true,
          //   renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
          //     return <TextArea placeholder="Nhập danh sách id..." />;
          //   },
          //   search: {
          //     transform : (value) => ({ Ids: getIds(value) })
          //   },
          // },
          
          // {
          //   title: 'Email',
          //   dataIndex: 'Emails',
          //   hideInTable: true,
          //   search: {
          //     transform : (value) => ({ Emails: getValidEmails(value) })
          //   },
          //   renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
          //     return <TextArea placeholder="Nhập danh sách email..." />;
          //   },
          // },
          // {
          //   title: 'Phone',
          //   dataIndex: 'PhoneNumbers',
          //   hideInTable: true,
          //   hideInForm: true,
          //   search: {
          //     transform: (value) =>  ({ PhoneNumbers: getValidPhones(value) }),
          //   },
          //   renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
          //     return <TextArea placeholder="Nhập danh sách số điện thoại..." />;
          //   },
          // },
          {
            title: 'Ảnh đại diện',
            dataIndex: 'avatarLink',
            hideInSearch: true,
            render: (_, { avatarLink }) =>  avatarLink && (<Image
            width={100}
            src={avatarLink}
          />)
          },
          // {
          //   title: 'Tạo:',
          //   sorter: true,
          //   dataIndex: 'createdInRange',
          //   hideInTable: true,
          //   hideInForm: true,
          //   valueType: 'dateTimeRange',
          //   search: {
          //     transform: (value) => ({ createAt_startTime: value[0], createAt_endTime: value[1] }),
          //   },
          // },
          // {
          //   title: 'Cập nhật:',
          //   sorter: true,
          //   dataIndex: 'updatedInRange',
          //   hideInTable: true,
          //   hideInForm: true,
          //   valueType: 'dateTimeRange',
          //   search: {
          //     transform: (value) => ({ updateAt_startTime: value[0], updateAt_endTime: value[1] }),
          //   },
          // },
          {
            title: 'Tên',
            dataIndex: 'userName',
            sorter: (a, b) => a.userName > b.userName,
          },
          {
            title: 'Email',
            dataIndex: 'email',
            copyable: true,
            hideInSearch: false,
          },
          {
            title: 'SĐT',
            dataIndex: 'phone',
            copyable: true,
          },
          {
            title: 'Quyền',
            dataIndex: 'role',
              valueEnum: {
                Admin: {
                  text: 'Quản trị viên',
                },
                Assessor: {
                  text: 'Thẩm định viên',
                },
                Seller: {
                  text: 'Nhân viên bán hàng',
                },
                Staff: {
                  text: 'Nhân viên',
                },
              },
            render: (_, { role }) => <Tag>{role}</Tag>,
          },
          {
            title: 'Ngày Tạo',
            dataIndex: 'createAt',
            valueType: 'date',
            hideInSearch: true,
            hideInTable: true,
            sorter: (a, b) => a.createAt > b.createAt,
          },
          {
            title: 'Ngày Cập Nhật',
            dataIndex: 'updateAt',
            valueType: 'date',
            hideInSearch: true,
            hideInTable: true,
            sorter: (a, b) => a.updateAt > b.updateAt,
          },
          // {
          //   title: 'Ngày Xóa',
          //   dataIndex: 'deleteAt',
          //   valueType: 'date',
          //   hideInSearch: true,
          //   sorter: (a, b) => a.deleteAt > b.deleteAt,
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
            render: (_, account) => {
              return (
                <Switch
                  checked={account.status == 'Active' ? true : false}
                  onChange={(bool) => {
                    let status = bool ? 'Active' : 'Disable';
                    let id = account.id;
                    activationHandler({id, status});
                  }}
                />
              );
            },
          },
          {
            title: 'Hành động',
            search: false,
            render: (_, account) => (
              <ModalForm
                title="Cập nhật tài khoản"
                modalProps={{
                  destroyOnClose: true,
                }}
                name="upadte-account"
                key={`upadte-account_${account.id}`}
                initialValues={account}
                onFinish={(values) =>
                  updateAccount(account.id, values)
                    .then(ref.current?.reload)
                    .then(() => true)
                }
                trigger={<Button type="link">Cập nhật</Button>}
              >
                <AccountForm updateMode />
              </ModalForm>
            ),
          },
        ]}
        toolBarRender={() => [
          <ModalForm
            title="Tạo tài khoản"
            modalProps={{
              destroyOnClose: true,
            }}
            visible={visibleadd}
            onValuesChange={console.log}
            onFinishFailed={console.log}
            name="create-account"
            key="create-account"
            onFinish={createHandler}
            submitter={{
              render: (props, defaultDoms) => {
                return [
                  // ...defaultDoms,
                  <Button
                  key="cancel"
                  onClick={() => {
                    setVisibleadd(false);
                  }}
                >
                  Hủy
                </Button>,
                  <Button
                    key="ok"
                    type='primary'
                    onClick={() => {
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
            trigger={<Button icon={<PlusOutlined />} type="primary" onClick={() => setVisibleadd(true)} type='primary'>Thêm tài khoản</Button>}
          >
            <AccountForm />
          </ModalForm>
        //   <ModalForm
        //   title="Tạo nhiều tài khoản"
        //   modalProps={{
        //     destroyOnClose: true,
        //   }}
        //   visible={visibleadds}
        //   onValuesChange={console.log}
        //   onFinishFailed={console.log}
        //   name="create-mutiaccount"
        //   key="create-mutiaccount"
        //   onFinish={createHandler}
        //   submitter={{
        //     render: (props, defaultDoms) => {
        //       return [
        //         // ...defaultDoms,
        //         <Button
        //         key="cancel"
        //         onClick={() => {
        //           setVisibleadds(false);
        //         }}
        //       >
        //         Huỷ
        //       </Button>,
        //         <Button
        //           key="ok"
        //           type='primary'
        //           onClick={() => {
        //             try {
        //               props.form.validateFields().then((values) => {
        //                 console.log(`values`, values);
        //                 createHandler(values);
        //                 props.reset();
        //               });
        //             } catch (error) {
        //               console.log(`error`, error);
        //             }
        //           }}
        //         >
        //           Tạo
        //         </Button>,
        //       ];
        //     },
        //   }}
        //   trigger={<Button icon={<PlusOutlined />} type="primary" onClick={() => setVisibleadds(true)} type='primary'>Thêm nhiều tài khoản</Button>}
        // >
        //   <MutiAccountForm />
        // </ModalForm>
        ]}
        rowKey="id"
        resource="users"
        additionParams={{orderBy: 'createAt-dec'}}
        isShowSelection={false}
      />
    </PageContainer>
  );
};

export default AccountListPage;
