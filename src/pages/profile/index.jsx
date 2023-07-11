import React, { useState, useEffect } from 'react';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import { getProvidersById } from '@/services/provider';
import { getCurrentId, getCurrentProviderId, normalizeImg, normFile, validateEmail, validatePhoneVN } from '@/utils/utils';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from '@umijs/hooks';
import {
  Affix,
  Alert, Card,
  Col, DatePicker, Form, Row,
  Spin,
  Typography
} from 'antd';
import { useHistory } from 'umi';
import AsyncButton from '@/components/AsyncButton';
import { getUserById } from '../user/login/service';
import { updateAccount } from '@/services/account';

const UpdateProfile = () => {
  const [form] = Form.useForm();
  const [updateError, setError] = useState(null);

  const history = useHistory();

  const providerId = getCurrentProviderId();
  const accountId = getCurrentId();

  const { data, error, loading } = useRequest(() => providerId ? getProvidersById(providerId) : getUserById(accountId), {
    formatResult: (res) => {
      console.log(res?.data[0]);
      return res?.data[0];
    },
  });

  useEffect(() => {
    if (data !== undefined) {
      let normalizedData;
      if (providerId) {
        normalizedData = {
          ...data.userInfo,
          providerName: data.providerName,
          address: data.address,
          taxCode: data.taxCode,
        }
      } else {
        normalizedData = data;
      }
      form.setFieldsValue({ ...normalizedData});
    }
  },[data])

  if (loading) return <Spin />;

    const onUpdateProfile = () => {
    form
      .validateFields()
      .then((params) => {
        const normalizedData = {...params};
        console.log(normalizedData);
        return updateAccount(accountId, normalizedData);
      })
      .then(() => {
        history.replace('/profile');
      })
      // .catch((err) => {
      //   setError(err);
      // });
    }

  return (
    <PageContainer>
      {updateError && <Alert message={updateError} type="warning" closable />}
      <Card bordered={false}>
        <Form
          layout="vertical"
          name="update-profile-form"
          form={form}
          scrollToFirstError
        >
          <Row justify="space-between">
            <Typography.Title level={3}>Thông tin tài khoản</Typography.Title>
            <Affix offsetTop={5}>
              <AsyncButton
                title="Cập nhật"
                btnProps={{
                  type: 'primary',
                }}
                onClick={onUpdateProfile}
                htmlType="submit"
              />
            </Affix>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
            <ProFormText
              rules={[
                {
                  required: true,
                  validator: (_, value) => {
                    return validateEmail(value)
                      ? Promise.resolve()
                      : Promise.reject(new Error('Email không hợp lệ!'));
                  },
                },
              ]}
              label="Email"
              name="email"
              width="md"
            />
            </Col>
            <Col span={12}>
              <ProFormText
              rules={[
                {
                  min: 5,
                  max: 32,
                  message: 'Tên từ 5 đến 32 kí tự',
                },
              ]}
              label="Tên tài khoản"
              name="userName"
              width="md"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                rules={[
                  {
                    required: false,
                    validator: (_, value) => {
                      return validatePhoneVN(value)
                        ? Promise.resolve()
                        : Promise.reject(new Error('SĐT không hợp lệ'));
                    },
                  },
                ]}
                label="SĐT"
                name="phone"
                width="md"
              />
            </Col>
            <Col span={12}>
            <ProForm.Item
              width="md"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              normalize={normalizeImg}
              name="avatarLink"
              label="Ảnh đại điện"
            >
              <ImageUploader style={{ height: '100%' }}/>
            </ProForm.Item>
            </Col>
          </Row>
            <Row gutter={16}>
            <Col span={12}>
              {providerId && (
                <ProFormText
                label="Tên nhà cung cấp"
                rules={[
                  {
                    min: 5,
                    max: 100,
                    message: 'Tên từ 5 đến 100 kí tự',
                  },
                ]}
                name="providerName"
                width="md"
                />)}
            </Col>
            <Col span={12}>
            {providerId && ( <ProFormText
                rules={[
                  {
                    required: true,
                    validator: (_, value) => {
                      return value.match(/^\d+$/)
                        ? Promise.resolve()
                        : Promise.reject(new Error('Mã số thuế không hợp lệ'));
                    },
                  },
                ]}
                label="Mã số thuế"
                placeholder={"Nhập mã số thuế"}
                name="taxCode"
                width="md"
              />)}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
            {providerId && (<ProFormText
                label="Địa chỉ"
                placeholder={"Nhập địa chỉ"}
                rules={[
                  {
                    required: true,
                    min: 6,
                    max: 100,
                    message: 'Tên từ 6 đến 100 kí tự',
                  },
                ]}
                name="address"
                width="md"
              />)}
            </Col>
          </Row>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default UpdateProfile;
