import { EditOutlined, EllipsisOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Tag, Image, Input, Switch, Card, Avatar } from 'antd';
import { ModalForm } from '@ant-design/pro-form';
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ResoTable from '@/components/ResoTable/ResoTable';
import PostForm from '@/components/Form/b_PostForm/PostForm';
import { activationById, createPost, deletePost, updatePost, updatePostById } from '@/services/b_post';
import AsyncButton from '@/components/AsyncButton';
import moment from 'moment';
import { useHistory } from 'umi';
// import Meta from 'antd/lib/card/Meta';

const PostListPage = () => {
  const { Meta } = Card;
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
    // Promise.resolve(activationById(data.id, { ...data })).then(() => {
    //   ref.current?.reload();
    // });
    Promise.resolve(updatePostById(post.id, { ...post })).then(() => {
      ref.current?.reload();
    });
  };
  const history = useHistory();
  return (
    <PageContainer title="Danh sách bài viết">
      <ResoTable
        search={true}
        actionRef={ref}
        scroll={{
          x: 650,
        }}
        columns={[
          {
            title: 'Tiêu đề',
            dataIndex: 'title',
            hideInTable: true,
            // sorter: (a, b) => a.userName > b.userName,
          },
          {
            title: 'Bài viết',
            dataIndex: 'id',

            width: 240,
            search: false,
            render: (_, post) => (
              <Card
                hoverable
                cover={<img src={post.cover} />}
                style={{ width: 350 }}

                actions={[
                  // <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" onClick={() => history.push(`/posts/${post.id}`)}/>,
                  // <EllipsisOutlined key="ellipsis" />,
                ]}
              >

                <Meta
                  avatar={<Avatar src={post.author.avatarLink} />}
                  title={post.title}
                  description={post.author.userName}
                // description={post.content}
                />
              </Card>
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
            trigger={<Button icon={<PlusOutlined />} type="primary" onClick={() => history.push(`/posts/create`)} >Tạo bài viết</Button>}
          >
            <PostForm />
          </ModalForm>,
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
