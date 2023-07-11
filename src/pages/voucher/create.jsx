import React, { useState } from 'react';
import AsyncButton from '@/components/AsyncButton';
import { SelectService, SelectTag } from '@/components/CommonSelect/CommonSelect';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import ResoEditor from '@/components/ResoEditor/ResoEditor';
import { createVoucher } from '@/services/voucher';
import { getUserInfo, normalizeImg, normFile } from '@/utils/utils';
import { ConsoleSqlOutlined, UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Affix,
  Alert,
  Button,
  Card,
  Col, DatePicker, Form,
  Input,
  Row,
  Switch,
  Typography,
  Upload
} from 'antd';
import 'react-quill/dist/quill.snow.css';
import { useHistory } from 'umi';
import TextArea from 'antd/lib/input/TextArea';
import { getServiceById } from '@/services/service';
import { useEffect } from 'react';
const { RangePicker } = DatePicker;

const FormItem = Form.Item;

const CreateVoucher = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [createError, setError] = useState("");

  const onCreateVoucher = () => {
    return form.validateFields()
    .then((voucher) => {
      const startDate = voucher.useDate[0];
      const endDate = voucher.useDate[1];
      let provider = getUserInfo();
      if(provider.role !== 'Provider') {provider = null;}
      const normalizedData = { ...voucher, status: 'New', startDate: startDate, endDate: endDate, providerId: (provider ? provider.id : null)};
      return createVoucher(normalizedData);
    })
    .then(() => {
      history.replace('/vouchers');
    })
    .catch((err) => {
      // setError(err);
      // console.log(createError);
      history.replace('/vouchers');

    })
  };

  return (
    <PageContainer>
      {createError && <Alert message={'Dữ liệu không hợp lệ'} type="warning" closable />}
      <Card bordered={false}>
        <Form
          layout="vertical"
          onFinish={(values) => console.log('Create Voucher', values)}
          name="create-voucher-form"
          form={form}
          scrollToFirstError
        >
          <Row justify="space-between">
            <Typography.Title level={3}>Thông tin voucher</Typography.Title>
            <Affix offsetTop={5}>
              <AsyncButton
                title="Tạo"
                onClick={onCreateVoucher}
                type="primary"
                htmlType="submit"
              />
            </Affix>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                name="bannerImg"
                label="Ảnh"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                normalize={normalizeImg}
              >
                <ImageUploader style={{ height: '100%' }} />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <FormItem
                label="Tên voucher"
                name="voucherName"
                rules={[
                  {
                    required: true,
                    min: 5,
                    max: 100,
                    message: 'Tên từ 5 đến 100 kí tự',
                  },
                ]}
              >
                <Input placeholder="Tên voucher" />
              </FormItem>
            </Col>
            <Col xs={24} md={12}>
              <FormItem
                label="Thời hạn có hiệu lực"
                name="useDate"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn thời hạn có hiệu lực',
                  },
                ]}
              >
                <RangePicker
                  showTime={{
                    format: 'HH:mm',
                  }}
                  format="YYYY-MM-DD HH:mm"
                  style={{
                    width: '100%',
                  }}
                />
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
                    width: '100%',
                  }}
                  mode="multiple"
            />
              </FormItem>
            </Col>
            <Col xs={24} md={12}>
            <FormItem
                label="Dịch vụ (*Mỗi dịch vụ có một tỉ lệ hoa hồng mặc định)"
                name="serviceId"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <SelectService
                  placeholder="Vui lòng chọn dịch vụ"
                  fetchOnFirst
                  style={{
                    width: '100%',
                  }}
            />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
          <Col xs={24} md={6}>
            <FormItem
                label="Giá bán"
                name="soldPrice"
                rules={[
                  {
                    required: true,
                    message: 'Giá bán voucher không hợp lệ (> 0)',
                    validator: (_, value) => {
                      return (!isNaN(value) && value.match(/^\d+$/) && parseInt(value) > 0)
                        ? Promise.resolve()
                        : Promise.reject();
                    },
                  },
                ]}
              >
                <Input placeholder="Giá bán voucher" />
              </FormItem>
            </Col>
            <Col xs={24} md={6}>
            <FormItem
                label="Giá trị voucher"
                name="voucherValue"
                rules={[
                  {
                    required: true,
                    message: 'Giá trị voucher không hợp lệ (> 0)',
                    validator: (_, value) => {
                      return (!isNaN(value) && value.match(/^\d+$/) && parseInt(value) > 0)
                        ? Promise.resolve()
                        : Promise.reject();
                    },
                  },
                ]}
              >
                <Input placeholder="Giá trị quy đổi của voucher" />
              </FormItem>
            </Col>
            <Col xs={24} md={12}>
            <FormItem
                label="Tỉ lệ hoa hồng (*Tỉ lệ hoa hồng có thể bằng hoặc lớn hơn tỉ lệ hoa hồng mặc định)"
                name="commissionRate"
                rules={[
                  {
                    required: true,
                    message: 'hoa hồng không hợp lệ',
                    validator: (_, value) => {
                      return (!isNaN(value) && parseFloat(value) > 0 && parseFloat(value) < 1)
                        ? Promise.resolve()
                        : Promise.reject();
                    },
                  },
                ]}
              >
                <Input placeholder="Tỉ lệ hoa hồng (0..1)"/>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24}>
              <FormItem
                label="Số lượng (mã QR sẽ do hệ thống phát sinh hoặc nhà cung cấp có thể tự tải lên sau khi tạo thành công voucher)"
                name="inventory"
                rules={[
                  {
                    required: true,
                    message: 'Số lượng không hợp lệ',
                    validator: (_, value) => {
                      return (!isNaN(value) && value.match(/^\d+$/) && parseInt(value) > 0)
                        ? Promise.resolve()
                        : Promise.reject();
                    },
                  },
                ]}
              >
                <Input placeholder="Số lượng voucher"/>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16} style={{ 'margin-bottom': '50px'}}>
            <Col span={12}>
              <FormItem label="Tổng quan" name="summary">
                <ResoEditor style={{ height: '150px'}}/>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Chi tiết" name="description">
                <ResoEditor style={{ height: '150px'}}/>
              </FormItem>
            </Col>
          </Row>
          <Row style={{ 'margin-bottom': '50px'}}>
            <Col span={24}>
              <FormItem label="Nội dung voucher" name="content">
                <ResoEditor style={{ height: '300px'}}/>
              </FormItem>
            </Col>
          </Row>
          <Row style={{ 'margin-bottom': '50px'}}>
            <Col span={24}>
              <FormItem label="Mẫu bài đăng" name="socialPost">
                <TextArea style={{ height: '300px'}}/>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default CreateVoucher;
