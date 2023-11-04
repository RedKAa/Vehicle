import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag, Image, Input, Switch } from 'antd';
import { ModalForm } from '@ant-design/pro-form';
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ResoTable from '@/components/ResoTable/ResoTable';
import PostForm from '@/components/Form/b_PostForm/PostForm';
import { activationById, createPost, deletePost, updatePost } from '@/services/b_post';
import AsyncButton from '@/components/AsyncButton';
import moment from 'moment';

const PostListPage = () => {
  const ref = React.useRef();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [visibleadd, setVisibleadd] = React.useState(false);
  const [visibleadds, setVisibleadds] = React.useState(false);


  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
  };

  const delectePostHandler = () => {
    return deletePost(selectedRows[0]).then(() => ref.current?.reload());
  };

  const createHandler = async (values) => {
    console.log(`values`, values);
    let data = { ...values };
    const res = await createPost(data);
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
    <PageContainer title="Danh sách bài viết">
      <ResoTable
        search={true}
        actionRef={ref}
        // rowSelection={rowSelection}
        tableAlertOptionRender={({ _, __, onCleanSelected }) => [
          <AsyncButton
            isNeedConfirm={{
              title: 'Xác nhận xóa bài viết',
              content: 'Bạn có muốn xóa bài viết này không',
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            onClick={() => delectePostHandler().then(onCleanSelected)}
            title={`Xóa ${selectedRows.length} bài viết`}
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
            title: 'Tiêu đề',
            dataIndex: 'title',
            // sorter: (a, b) => a.userName > b.userName,
          },

          {
            title: 'Nội dung',
            dataIndex: 'content',
            render: (_, { content }) => (
              <div style={{ border: '1px dotted', padding: '20px', height: '500px', 'overflow-y': 'scroll' }} dangerouslySetInnerHTML={{ __html: content }} />
            ),
            // sorter: (a, b) => a.userName > b.userName,
          },

          // {
          //   title: 'Vai Trò',
          //   dataIndex: 'role',
          //   valueEnum: {
          //     Admin: {
          //       text: 'Quản trị viên',
          //     },
          //     Teacher: {
          //       text: 'Giảng viên',
          //     },
          //     Student: {
          //       text: 'Sinh viên',
          //     },
          //   },
          //   render: (text, record) => {
          //     if (record.role === 'Student') {
          //       return <Tag>Sinh viên</Tag>;
          //     } else if (record.role === 'Teacher') {
          //       return <Tag>Giảng viên</Tag>;
          //     } else if (record.role === 'Admin') {
          //       return <Tag>Quản trị viên</Tag>;
          //     }
          //     return <Tag>{record.role}</Tag>;
          //   },
          // },

          // {
          //   title: 'Email',
          //   dataIndex: 'email',
          //   copyable: true,
          //   hideInSearch: false,
          // },
          // {
          //   title: 'SĐT',
          //   dataIndex: 'phone',
          //   copyable: true,
          // },

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
          // {
          //   title: 'Ngày Cập Nhật',
          //   dataIndex: 'updateAt',
          //   valueType: 'date',
          //   hideInSearch: true,
          //   // hideInTable: true,
          //   sorter: (a, b) => a.updateAt > b.updateAt,
          //   render: ({ createAt }) => (
          //     <Tag color="#78cc7a">{moment(createAt).format('DD-MM-YYYY')}</Tag>
          //   ),
          // },

          {
            title: 'Ảnh Bìa',
            dataIndex: 'avatarLink',
            hideInSearch: true,
            render: (_, { avatarLink }) => avatarLink && (<Image
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
            render: (_, post) => {
              return (
                <Switch
                  checked={post.status == 'Active' ? true : false}
                  onChange={(bool) => {
                    let status = bool ? 'Active' : 'Disable';
                    let id = post.id;
                    activationHandler({ id, status });
                  }}
                />
              );
            },
          },
          {
            title: 'Hành động',
            search: false,
            render: (_, post) => (
              <ModalForm
                title="Cập nhật bài viết"
                modalProps={{
                  destroyOnClose: true,
                }}
                name="upadte-post"
                key={`upadte-post_${post.id}`}
                initialValues={post}
                onFinish={(values) =>
                  updatePost(post.id, values)
                    .then(ref.current?.reload)
                    .then(() => true)
                }
                trigger={<Button type="link">Cập nhật</Button>}
              >
                <PostForm updateMode />
              </ModalForm>
            ),
          },
        ]}
        toolBarRender={() => [
          <ModalForm
            title="Tạo bài viết"
            modalProps={{
              destroyOnClose: true,
            }}
            visible={visibleadd}
            onValuesChange={console.log}
            onFinishFailed={console.log}
            name="create-post"
            key="create-post"
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
            trigger={<Button icon={<PlusOutlined />} type="primary" onClick={() => setVisibleadd(true)} >Thêm bài viết</Button>}
          >
            <PostForm />
          </ModalForm>

        ]}
        rowKey="id"
        resource="posts"
        additionParams={{ orderBy: 'createAt-dec' }}
        isShowSelection={false}
      />

    </PageContainer>
  );
};

export default PostListPage;
