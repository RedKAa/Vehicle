import React, { useState } from 'react';
import AsyncButton from '@/components/AsyncButton';
import { SelectService, SelectTag, SelectVoucher } from '@/components/CommonSelect/CommonSelect';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import ResoEditor from '@/components/ResoEditor/ResoEditor';
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
import { createCombo } from '@/services/combo';
import ComboForm from '@/components/Form/ComboForm/ComboForm';
const { RangePicker } = DatePicker;

const FormItem = Form.Item;

const CreateCombo = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { voucherIds } = props;

  const [createError, setError] = useState(null);


  if(voucherIds && voucherIds.length > 0){
    form.setFieldsValue({
      voucherIds
    })
  }

  const onCreateCombo = () => {
    return form.validateFields()
    .then((combo) => {
      const startDate = combo.useDate[0];
      const endDate = combo.useDate[1];
      const normalizedData = { ...combo,startDate: startDate, endDate: endDate, status: combo.status === undefined ? 'Disable' : 'Active', isCombo: true};
      return createCombo(normalizedData);
    })
    .then(() => {
      history.replace('/combos/');
    })
    .catch((err) => {
      // setError(err);
      // console.log(createError);
      history.replace('/combos/');
    })
  };

  return (
    <PageContainer>
      {createError && <Alert message={'Dữ liệu không hợp lệ'} type="warning" closable />}
      <Card bordered={false}>
        <Form
          layout="vertical"
          onFinish={(values) => console.log('Create Combo', values)}
          name="create-combo-form"
          form={form}
          scrollToFirstError
        >
          <Row justify="space-between">
            <Typography.Title level={3}>Thông tin combo</Typography.Title>
            <Affix offsetTop={5}>
              <AsyncButton
                title="Tạo"
                onClick={onCreateCombo}
                type="primary"
                htmlType="submit"
              />
            </Affix>
          </Row>
          {/* <Row gutter={16}>
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
                label="Tên combo"
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
                <Input placeholder="Tên combo" />
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
          </Row>
          <Row gutter={16}>
            <Col xs={24}>
              <FormItem
                label="Gắn thẻ"
                name="voucherIds"
              >
                <SelectVoucher
                  placeholder="Vui lòng chọn voucher"
                  fetchOnFirst
                  style={{
                    width: '100%',
                  }}
                  mode="multiple"
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
                    message: 'Giá bán combo không hợp lệ (> 0)',
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
          </Row>
          <Row gutter={16}>
            <Col xs={24}>
              <FormItem
                label="Số lượng"
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
                <Input placeholder="Số lượng combo"/>
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
              <FormItem label="Nội dung combo" name="content">
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
          </Row> */}
          <ComboForm />
        </Form>
      </Card>
    </PageContainer>
  );
};

export default CreateCombo;
