import AsyncButton from '@/components/AsyncButton';
import { SelectPlace, SelectTag } from '@/components/CommonSelect/CommonSelect';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import ResoEditor from '@/components/ResoEditor/ResoEditor';
import { createBlogPostById } from '@/services/blogposts';
import { formatWhitespace, getCurrentStore, normalizeImg, normFile } from '@/utils/utils';
import { ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Affix,
  Card,
  Col,
  Form,
  Input,
  Row,
  Switch,
  Typography
} from 'antd';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import { useHistory } from 'umi';


const FormItem = Form.Item;

const CreateBlogPost = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const onCreateBlogPost = () => {
    return form.validateFields()
    .then((blogpost) => {
      console.log('status: ' + blogpost.status);
      const normalizedData = { ...blogpost, status: blogpost.status === undefined ? 'Disable' : 'Active'};
      createBlogPostById(normalizedData);
    })
    .then(() => {
      history.replace('/blog-post/index');
    });
  };

  return (
    <PageContainer>
      <Card bordered={false}>
        <Form
          layout="vertical"
          onFinish={(values) => console.log('Create Blog', values)}
          name="create-article-form"
          form={form}
          scrollToFirstError
        >
          <Row justify="space-between">
            <Typography.Title level={3}>Thông tin bài viết</Typography.Title>
            <Affix offsetTop={5}>
              <AsyncButton
                title="Tạo"
                onClick={onCreateBlogPost}
                type="primary"
                htmlType="submit"
              />
            </Affix>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem
                valuePropName="fileList"
                getValueFromEvent={normFile}
                normalize={normalizeImg}
                name="bannerImage"
                label="Ảnh"
              >
                <ImageUploader style={{ height: '100%' }} />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <FormItem
                label="Tiêu đề bài viết"
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên',
                  },
                ]}
              >
                <Input placeholder="Tên bài viết" />
              </FormItem>
            </Col>
            <Col xs={24} md={12}>
              <FormItem label="Kích hoạt" name="status" valuePropName="checked">
                <Switch />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <FormItem
                label="Gắn thẻ"
                name="tagIds"
              >
                <SelectTag
                  placeholder="Vui lòng chọn thẻ"
                  fetchOnFirst
                  style={{
                    width: 200,
                  }}
                  mode="multiple"
            />
              </FormItem>
            </Col>
            <Col xs={24} md={12}>
            <Col xs={24} md={12}>
              <FormItem
                label="Vị trí"
                name="placeIds"
              >
                <SelectPlace
                  placeholder="Vui lòng chọn địa điểm"
                  fetchOnFirst
                  style={{
                    width: 200,
                  }}
                  mode="multiple"
            />
              </FormItem>
            </Col>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <ProFormTextArea
              name="summary"
              width="lg"
              label="Mô tả:"
              placeholder="Nhập mô tả..."
              hideInSearch={true}
              rules={[
              {
                  required: true,
                  validator: (_, value) => {
                    return formatWhitespace(value).length > 0
                    ? Promise.resolve()
                    : Promise.reject(new Error('Nhập mô tả!'));
                  },
              },
              ]}
             />
            </Col>
          </Row>
            <Row>
            <Col span={24}>
              <FormItem label="Nội dung bài viết" name="content">
                <ResoEditor />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default CreateBlogPost;
