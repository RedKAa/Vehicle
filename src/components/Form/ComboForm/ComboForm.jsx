import {
  SelectTag,
  SelectVoucher
} from '@/components/CommonSelect/CommonSelect';
import React from 'react';
import ResoEditor from '@/components/ResoEditor/ResoEditor';
import ImageUploader from '@/components/Uploader';
import { normalizeImg, normFile } from '@/utils/utils';
import { Col, DatePicker, Input, Row, Switch } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';

const { RangePicker } = DatePicker;

const ComboForm = ({readonly = false, update = false, createPage = false, onCreateCombo, createV=false}) => {
  return (
    <>
      {/* <Row justify="space-between">
            <Typography.Title level={3}>Thông tin combo</Typography.Title>
            {createPage &&<Affix offsetTop={5}>
              <AsyncButton
                title="Tạo"
                onClick={onCreateCombo}
                type="primary"
                htmlType="submit"
              />
            </Affix>}
        </Row> */}
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
              <Col xs={24} md={12}>
              <FormItem label="Kích hoạt" name="status" valuePropName="checked">
                <Switch />
              </FormItem>
            </Col>
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
                  disabled={update}
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
          </Row>
          {!createV &&
          <Row gutter={16}>
          <Col xs={24}>
            <FormItem
              label="Chọn vouchers"
              name="voucherIds"
              rules={[{ required: true, message: 'Vui lòng chọn voucher' }]}
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
        </Row>}
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
                <Input placeholder="Giá bán combo" />
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
          </Row>
    </>
  );
};

export default ComboForm;
