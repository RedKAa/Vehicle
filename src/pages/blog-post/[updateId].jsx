import AsyncButton from '@/components/AsyncButton';
import ResoEditor from '@/components/ResoEditor/ResoEditor';
import { getBlogPostById, updateBlogPostById } from '@/services/blogposts';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from '@umijs/hooks';
import { getCurrentStore, normalizeImg, normFile } from '@/utils/utils';
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
import { SelectPlace, SelectTag } from '@/components/CommonSelect/CommonSelect';
import ProForm from '@ant-design/pro-form';



const FormItem = Form.Item;

const UpdateArticle = (props) => {
  const [form] = Form.useForm();
  const {
    match: {
      params: { updateId },
    },
  } = props;

  const [updateError, setError] = useState(null);

  const history = useHistory();

  const { data, error, loading } = useRequest(() => getBlogPostById(updateId), {
    formatResult: (res) => {
      return res?.data[0];
    },
  });

  useEffect(() => {
    if (data !== undefined) {
      console.log(data);
      let tagids = data.tags.map(data => (data.id));
      let placeids = data.places.map(data => (data.id));
      form.setFieldsValue({ ...data, tagIds: tagids, placeIds: placeids });
    }
  },[data])

  if (loading) return <Spin />;

  const onUpdateArticle = () =>
    form
      .validateFields()
      .then((blogpost) => {
        console.log(blogpost);
        const normalizedData = { ...blogpost, status: blogpost.status ? 'Active' : 'Disable' };
        console.log(normalizedData);
        return updateBlogPostById(updateId, normalizedData);
      })
      .then(() => {
        history.replace('/blog-post/index');
      })
      .catch((err) => {
        setError(err);
      });

  return (
    <PageContainer>
      {updateError && <Alert message={updateError} type="warning" closable />}
      <Card bordered={false}>
        <Form
          layout="vertical"
          onFinish={(values) => console.log('Create Product', values)}
          name="create-article-form"
          form={form}
          initialValues={{ storeID: getCurrentStore() }}
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
                onClick={onUpdateArticle}
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
                label="Tên bài viết"
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên',
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
              </ProForm.Item>
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
              <FormItem label="Nội dung bài viết" name="content">
                <ResoEditor />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label="Tổng kết" name="summary">
                <ResoEditor />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default UpdateArticle;
