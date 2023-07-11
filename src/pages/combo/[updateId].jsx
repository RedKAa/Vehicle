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
import { SelectPlace, SelectService, SelectTag, SelectVoucher } from '@/components/CommonSelect/CommonSelect';
import ProForm from '@ant-design/pro-form';
import { getVoucherById, updateComboById, updateVoucherById } from '@/services/combo';
import moment from 'moment';
import { getComboById } from '@/services/combo';
import TextArea from 'antd/lib/input/TextArea';
const { RangePicker } = DatePicker;


const FormItem = Form.Item;

const UpdateCombo = (props) => {
  const [form] = Form.useForm();
  const {
    match: {
      params: { updateId },
    },
  } = props;

  const [updateError, setError] = useState(null);

  const history = useHistory();

  const { data, error, loading } = useRequest(() => getComboById(updateId), {
    formatResult: (res) => {
      return res;
    },
  });

  useEffect(() => {
    if (data !== undefined) {
      const tagIds = data.tags.map(data => (data.id));
      const voucherIds = data.vouchers.map(data => (data.id));
      let useDate = [];
      if(data.startDate && data.endDate) {
        useDate.push(moment(data.startDate));
        useDate.push(moment(data.endDate));
      }
      form.setFieldsValue({ ...data, tagIds: tagIds, useDate: useDate, voucherIds});
    }
  },[data])

  if (loading) return <Spin />;

    const onUpdateCombo = () => {
    form
      .validateFields()
      .then((combo) => {
        console.log(combo);
        const startDate = combo.useDate[0];
        const endDate = combo.useDate[1];
        const normalizedData = { ...combo, status: combo.status === undefined ? 'Disable' : 'Active', startDate: startDate, endDate: endDate};
        console.log(normalizedData);
        return updateComboById(updateId, normalizedData);
      })
      .then(() => {
        history.replace('/combos/');
      })
      .catch((err) => {
        setError(err);
        console.log(updateError);
      })
      // .catch((err) => {
      //   setError(err);
      // });
    }

  return (
    <PageContainer>
      {updateError && <Alert message={'Dữ liệu không hợp lệ'} type="warning" closable />}
      <Card bordered={false}>
        <Form
          layout="vertical"
          onFinish={(values) => console.log('Update Combo', values)}
          name="update-combo-form"
          form={form}
          scrollToFirstError
        >
          <Row justify="space-between">
            <Typography.Title level={3}>Thông tin Combo</Typography.Title>
            <Affix offsetTop={5}>
              <AsyncButton
                title="Cập nhật"
                onClick={onUpdateCombo}
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
                label="Giá bán"
                name="soldPrice"
                rules={[
                  {
                    required: true,
                    message: '',
                    validator: (_, value) => {
                      return (!isNaN(value) && value.match(/^\d+$/) && parseInt(value) > 0)
                        ? Promise.resolve()
                        : Promise.reject(new Error('Giá bán combo không hợp lệ (> 0)'));
                    },
                  },
                ]}
              >
                <Input placeholder="Giá bán combo" />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24}>
              <FormItem
                label="Chọn vouchers"
                name="voucherIds"
              >
                <SelectVoucher
                  placeholder="Vui lòng chọn voucher"
                  fetchOnFirst
                  style={{
                    width: '100%',
                  }}
                  disabled
                  mode="multiple"
            />
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
          </Row>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default UpdateCombo;
