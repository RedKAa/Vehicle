import AsyncButton from '@/components/AsyncButton';
import ResoEditor from '@/components/ResoEditor/ResoEditor';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from '@umijs/hooks';
import { getCurrentStore, getUserInfo, normalizeImg, normFile } from '@/utils/utils';
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
  Typography,
  DatePicker
} from 'antd';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'umi';
import { SelectPlace, SelectService, SelectTag } from '@/components/CommonSelect/CommonSelect';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { getVoucherById, updateVoucherById } from '@/services/voucher';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
const { RangePicker } = DatePicker;


const FormItem = Form.Item;

const UpdateVoucher = (props) => {
  const [form] = Form.useForm();
  const {
    match: {
      params: { updateId },
    },
  } = props;

  const [updateError, setError] = useState(null);

  const history = useHistory();

  const { data, error, loading } = useRequest(() => getVoucherById(updateId), {
    formatResult: (res) => {
      console.log(res?.data[0]);
      return res?.data[0];
    },
  });

  useEffect(() => {
    if (data !== undefined) {
      const tagIds = data.tags.map(data => (data.id));
      let useDate = [];
      useDate.push(moment(data.startDate));
      useDate.push(moment(data.endDate));
      let normalizedData = {
        ...data,
        tagIds: tagIds,
        useDate: useDate
      }
      console.log(data)
      form.setFieldsValue({ ...normalizedData });
    }
  },[data])

  if (loading) return <Spin />;

    const onUpdateVoucher = () => {
    form
      .validateFields()
      .then((voucher) => {
        console.log(voucher);
        const startDate = voucher.useDate[0]._i;
        const endDate = voucher.useDate[1]._i;
        let provider = getUserInfo();
        if(provider.role !== 'Provider') {provider = null;}
        const normalizedData = { ...voucher, status: voucher.status === undefined ? 'Disable' : 'Active', startDate: startDate, endDate: endDate, providerId: (provider ? provider.id : null)};
        console.log(normalizedData);
        return updateVoucherById(updateId, normalizedData);
      })
      .then(() => {
        history.replace('/vouchers');
      })
      .catch((err) => {
        setError(err);
        console.log(updateError);
      })
    }

  return (
    <PageContainer>
      {updateError && <Alert message={'Dữ liệu không hợp lệ'} type="warning" closable />}
      <Card bordered={false}>
        <Form
          layout="vertical"
          onFinish={(values) => console.log('Create Voucher', values)}
          name="update-voucher-form"
          form={form}
          scrollToFirstError
        >
          <Row justify="space-between">
            <Typography.Title level={3}>Thông tin voucher</Typography.Title>
            <Affix offsetTop={5}>
              <AsyncButton
                title="Cập nhật"
                onClick={onUpdateVoucher}
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
            <Col xs={24} md={12}>
              <FormItem label="Kích hoạt" name="status" valuePropName="checked">
                <Switch />
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
                label="Thời gian hiệu lực"
                name="useDate"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn thời gian hiệu lực',
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
                  disabled
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
                label="Dịch vụ"
                name="serviceId"
              >
                <SelectService
                  placeholder="Vui lòng chọn dịch vụ"
                  fetchOnFirst
                  disabled
                  style={{
                    width: '100%',
                    fontWeight: 'bold'
                  }}
            />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
          <Col xs={24} md={6}>
            <ProFormText
                label="Giá bán"
                name="soldPrice"
                rules={[
                  {
                    required: true,
                    validator: (_, value) => {
                      return (!isNaN(value) && value.match(/^\d+$/) && parseInt(value) > 0)
                        ? Promise.resolve()
                        : Promise.reject(new Error('Giá bán voucher không hợp lệ (> 0)'));
                    },
                  },
                ]}
              >
                <Input placeholder="Giá bán voucher" />
              </ProFormText>
              {/* <ProFormText
                rules={[
                  {
                    required: true,
                    validator: (_, value) => {
                      return (!isNaN(value) && value.match(/^\d+$/) && parseInt(value) > 0)
                        ? Promise.resolve()
                        : Promise.reject(new Error('Giá bán voucher không hợp lệ (> 0)'));
                    },
                  },
                ]}
                label="Giá bán"
                name="soldPrice"
                width="md"
                placeholder={'Giá bán voucher'}
              /> */}
            </Col>
            <Col xs={24} md={6}>
            <FormItem
                label="Giá trị voucher"
                name="voucherValue"
                rules={[
                  {
                    required: true,
                    validator: (_, value) => {
                      return (!isNaN(value) && value.match(/^\d+$/) && parseInt(value) > 0)
                        ? Promise.resolve()
                        : Promise.reject(new Error('Giá trị voucher không hợp lệ (> 0)'));
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

export default UpdateVoucher;
