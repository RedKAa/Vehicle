import AsyncButton from '@/components/AsyncButton';
import { SelectPostType, SelectPlace, SelectTag } from '@/components/CommonSelect/CommonSelect';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import ResoEditor from '@/components/ResoEditor/ResoEditor';
import { createPost } from '@/services/b_post';
import { formatWhitespace, getCurrentStore, getUserInfo, normalizeImg, normFile, validFormData } from '@/utils/utils';
import { ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
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

const CreatePost = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  let isok = false;

  // let admin = getUserInfo();
  const admin = JSON.parse(getUserInfo());
  console.log('Data: ', admin.id)
  const onCreatePost = () => {
    return form
      .validateFields()
      .then((post) => {
        const normalizedData = { ...post, status: 'Active', authorId: admin.id, postStatus: 'Publish' };
        console.log(normalizedData);
        // console.log('Error:' ,err)
        isok = validFormData(normalizedData);
        if (isok) {
          createPost(normalizedData);
        };
      })
      .then(() => {
        if (isok) {
          history.replace('/posts/index');
        }
      });
  };

  let initdata = { content: '' };

  return (
    <PageContainer>
      <Card bordered={false}>
        <Form
          layout="vertical"
          onFinish={(values) => console.log('Create Post', values)}
          name="create-post"
          form={form}
          initialValues={initdata}
          scrollToFirstError
        >
          <Row justify="space-between">
            <Typography.Title level={3}>Thông tin bài viết</Typography.Title>
            <Affix offsetTop={5}>
              <AsyncButton
                title="Tạo"
                onClick={onCreatePost}
                btnProps={{
                  type: 'primary',
                }}
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
                name="cover"
                label="Ảnh Bìa"
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
                    message: 'Vui lòng nhập tiêu đề',
                  },
                ]}
              >
                <Input placeholder="Tên bài viết" />
              </FormItem>
            </Col>
            {/* <Col xs={24} md={12}>
              <FormItem label="Kích hoạt" name="status" valuePropName="checked">
                <Switch />
              </FormItem>
            </Col> */}
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <FormItem
                label="Gắn thẻ"
                name="tags"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn thẻ',
                  },
                ]}
              >
                <SelectTag
                  placeholder="Chọn thẻ"
                  fetchOnFirst
                  style={{
                    width: 200,
                  }}
                  mode="multiple"
                />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <ProFormSelect
                label="Loại Bài Viết"
                rules={[{ required: true, message: 'Vui lòng chọn loại bài viết!' }]}
                name="postType"
                width="md"
                options={
                  [{ label: 'Video', value: 'Video' }, { label: 'Blog', value: 'Blog' }]
                    .map((value) => ({
                      label: value.label,
                      value: value.value,
                    }))}
              // disabled={updateMode}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label="Nội dung bài viết" name="content"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập nội dung',
                    min: 5
                  },
                ]}>
                <ResoEditor style={{ height: '200px' }} />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default CreatePost;
