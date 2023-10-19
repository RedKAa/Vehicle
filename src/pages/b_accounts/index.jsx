import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag, Image, Input, Switch  } from 'antd';
import { ModalForm } from '@ant-design/pro-form';
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ResoTable from '@/components/ResoTable/ResoTable';
import AccountForm from '@/components/Form/b_AccountForm/AccountForm';
import { activationById, createAccount, deleteAccount, updateAccount } from '@/services/b_account';
import AsyncButton from '@/components/AsyncButton';
import moment from 'moment';

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
    <PageContainer title="Danh sách người dùng">
      <ResoTable
        search={true}
        actionRef={ref}
        // rowSelection={rowSelection}
        tableAlertOptionRender={({ _, __, onCleanSelected }) => [
          <AsyncButton
            isNeedConfirm={{
              title: 'Xác nhận xóa người dùng',
              content: 'Bạn có muốn xóa người dùng này không',
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            onClick={() => delecteAccountHandler().then(onCleanSelected)}
            title={`Xóa ${selectedRows.length} người dùng`}
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

          {
            title: 'Tên',
            dataIndex: 'userName',
            sorter: (a, b) => a.userName > b.userName,
          },


          {
            title: 'Vai Trò',
            dataIndex: 'role',
              valueEnum: {
                Admin: {
                  text: 'Quản trị viên',
                },
                Teacher: {
                  text: 'Giảng viên',
                },
                Student: {
                  text: 'Sinh viên',
                },
              },
              render: (text, record) => {
                if (record.role === 'Student') {
                  return <Tag>Sinh viên</Tag>;
                } else if (record.role === 'Teacher') {
                  return <Tag>Giảng viên</Tag>;
                } else if (record.role === 'Admin') {
                  return <Tag>Quản trị viên</Tag>;
                }
                return <Tag>{record.role}</Tag>;
              },
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
            title: 'Ngày Tạo',
            dataIndex: 'createAt',
            valueType: 'date',
            hideInSearch: true,
            // hideInTable: true,
            sorter: (a, b) => a.createAt > b.createAt,
            render: ({ createAt }) => (
              <Tag color="#78cc7a">{moment(createAt).format('DD-MM-YYYY')}</Tag>
            ),
          },
          {
            title: 'Ngày Cập Nhật',
            dataIndex: 'updateAt',
            valueType: 'date',
            hideInSearch: true,
            // hideInTable: true,
            sorter: (a, b) => a.updateAt > b.updateAt,
            render: ({ createAt }) => (
              <Tag color="#78cc7a">{moment(createAt).format('DD-MM-YYYY')}</Tag>
            ),
          },

          {
            title: 'Ảnh',
            dataIndex: 'avatarLink',
            hideInSearch: true,
            render: (_, { avatarLink }) =>  avatarLink && (<Image
            width={100}
            src={avatarLink}
          />)
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
                title="Cập nhật người dùng"
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
            title="Tạo người dùng"
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
            trigger={<Button icon={<PlusOutlined />} type="primary" onClick={() => setVisibleadd(true)} >Thêm người dùng</Button>}
          >
            <AccountForm />
          </ModalForm>

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
