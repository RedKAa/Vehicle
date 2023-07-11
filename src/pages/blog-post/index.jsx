import ResoTable from '@/components/ResoTable/ResoTable';
import { updateBlogPostById } from '@/services/blogposts';
import { getAuthority } from '@/utils/authority';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Switch } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useRef, useState } from 'react';

const BlogPostPage = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);

  const activationBlogHandler = (blogpost) => {
    Promise.resolve(updateBlogPostById(blogpost.id, { ...blogpost })).then(() => {
      ref.current?.reload();
    });
  };
  const isStoreManager = getAuthority()?.includes(ROLE_DATA.PROVIDER);

  const columns = [
    // ...blogPostColumns,
    {
      title: 'Bài viết',
      dataIndex: 'id',


      width: 240,
      search: false,
      render: (_,  blog ) => (
          <Card
            hoverable
            cover={<img src={blog.bannerImage} style={{ height: 300 }} />}
            style={{ width: 350 }}
            actions={!isStoreManager ? [
              <EditOutlined key={`edit ${blog.id}`} onClick={() => history.push(`/blog-post/${blog.id}`)}/>,
            ] : []}
          >
            <Meta title={blog.title}/>
          </Card>
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: 'title',
      width: 240,
      hideInTable: true,
    },
    {
      title: "Nội dung",
      dataIndex: 'content',
      width: 240,
      search: false,
      render: (_, { content }) => (
          <div style={{border:'1px dotted', padding: '20px',width: '700px', height: '500px', 'overflow-y': 'scroll'}} dangerouslySetInnerHTML={{ __html: content }} />
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
      render: (_, blogpost) => {
        return (
          <Switch
            checked={blogpost.status == 'Active' ? true : false}
            onChange={(bool) => {
              blogpost.status = bool ? 'Active' : 'Disable';
              activationBlogHandler(blogpost);
            }}
          />
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ResoTable
        additionParams={{ orderBy: 'createAt-dec'}}
        tableAlertOptionRender={({ _, __, onCleanSelected }) => [
        ]}
        columns={columns}
        scroll={{
          x: 650,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => history.push('/blog-post/create')}
            icon={<PlusOutlined />}
            key={selectedRows[0]}
          >
            Thêm BlogPost
          </Button>,
        ]}
        rowKey="id"
        resource="blogs"
        actionRef={ref}
        isShowSelection={false}
      />
    </PageContainer>
  );
};

export default BlogPostPage;
