import AsyncButton from '@/components/AsyncButton';
import ResoEditor from '@/components/ResoEditor/ResoEditor';
import { getPostById, updatePostById } from '@/services/b_post';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from '@umijs/hooks';
import { normalizeImg, normFile, validFormData } from '@/utils/utils';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import {
  Affix,
  Alert, Card,
  Col,
  Form,
  Input,
  Row,
  Spin,
  Switch,
  Typography
} from 'antd';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'umi';
import { SelectTag } from '@/components/CommonSelect/CommonSelect';
import ProForm, { ProFormSelect } from '@ant-design/pro-form';



const FormItem = Form.Item;

const UpdatePost = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();
  let isok = false;
  const {
    match: {
      params: { updateId },
    },
  } = props;

  const [updateError, setError] = useState(null);

  const { data, error, loading } = useRequest(() => getPostById(updateId), {
    formatResult: (res) => {
      return res?.data[0];
    },
  });

  useEffect(() => {
    if (data !== undefined) {
      console.log(data);
      let tagids = data.tags.map(data => (data.id));
      form.setFieldsValue({ ...data, tags: tagids, status: data.status == 'Active' });
    }
  },[data, form])

  if (loading) return <Spin />;

  const onUpdatePost = () => {
    return form
      .validateFields()
      .then((post) => {
        const normalizedData = { ...post, status: post.status ? 'Active' : 'Disable' };
        console.log(normalizedData);
        isok = validFormData(normalizedData);
        console.log( 'Check: ', normalizedData);
        if (isok) {
          updatePostById(updateId, normalizedData);
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
      {updateError && <Alert message={updateError} type="warning" closable />}
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
                title="Cập nhật"
                btnProps={{
                  type: 'primary',
                }}
                onClick={onUpdatePost}
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
                label="Tiêu đề"
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tiêu đề',
                  },
                ]}
              >
                <Input placeholder="Tiêu đề bài viết" />
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
              <ProForm.Item
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
              </ProForm.Item>
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
                <ResoEditor />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default UpdatePost;
