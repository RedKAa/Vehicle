import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Switch } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { useRef, useState } from 'react';
import { updatePost, activationById, createPost, deletePost } from '@/services/b_post';
import moment from 'moment';
import Meta from 'antd/lib/card/Meta';
import ResoTable from '@/components/ResoTable/ResoTable';

const PostListPage = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);

  const activationHandler = (data) => {
    Promise.resolve(activationById(data.id, { ...data })).then(() => {
      ref.current?.reload();
    });
  };

  const createHandler = async (values) => {
    console.log(`values`, values);
    let data = { ...values };
    const res = await createPost(data);
    ref.current?.reload();
    return true;
  };

  const delectePostHandler = () => {
    return deletePost(selectedRows[0]).then(() => ref.current?.reload());
  };

  const renderPostCard = (post) => (
    <Card
      title={post.title}
      extra={
        <div>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => history.push(`/posts/${post.id}`)}
          >
            Edit
          </Button>
        </div>
      }
      style={{ marginBottom: '16px' }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        style={{ maxHeight: '500px', overflowY: 'auto' }}
      />
      <div style={{ marginTop: '16px' }}>
        <Switch
          checked={post.status === 'Active'}
          onChange={(bool) => {
            post.status = bool ? 'Active' : 'Disable';
            activationHandler(post);
          }}
        />
        {post.status === 'Active' ? 'Đang hiển thị' : 'Không hiển thị'}
      </div>
    </Card>
  );

  const columns = [
    // {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   width: 80,
    //   align: 'center',
    //   render: (text) => <span>{text}</span>,
    // },
    // {
    //   title: 'Tiêu đề',
    //   dataIndex: 'title',
    //   width: 200,
    //   ellipsis: true,
    //   render: (text) => <span>{text}</span>,
    // },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      width: 300,
      ellipsis: true,
      render: (_, post) => renderPostCard(post),
    },
    // {
    //   title: 'Trạng thái',
    //   dataIndex: 'status',
    //   width: 100,
    //   align: 'center',
    //   render: (text) => {
    //     return (
    //       <span>
    //         {text === 'Active' ? 'Đang hiển thị' : 'Không hiển thị'}
    //       </span>
    //     );
    //   },
    // },
  ];


  return (
    <PageContainer>
      <ResoTable
        // additionParams={{ orderBy: 'createAt-dec'}}
        // tableAlertOptionRender={({ _, __, onCleanSelected }) => [
        // ]}
        columns={columns}
        // scroll={{
        //   x: 650,
        // }}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => history.push('/posts/create')}
            icon={<PlusOutlined />}
            key={selectedRows[0]}
          >
            Tạo Bài Đăng
          </Button>,
        ]}
        rowKey="id"
        resource="posts"
        actionRef={ref}
        isShowSelection={false}
      />
    </PageContainer>
  );
};

export default PostListPage;
