import { Input, Form, Select, Modal, DatePicker, Row, Col, Typography, Button } from 'antd';
import { formatMessage } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import SelectDay from '@/components/SelectDay';
import request from '@/utils/requestServer';
import { SelectStore } from '@/components/CommonSelect/CommonSelect';
import { getCurrentStore } from '@/utils/utils';
import { getStore } from '@/services/store';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const onSearchStore = (searchValue) => {
  return request.get(`/stores`, { useCache: true });
};

const normalizeRes = (res) => {
  return res.data;
};

const CreateMenuModal = ({ onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onCancelModel = () => {
    form.resetFields();
    onCancel();
    setVisible(false);
  };

  const onOkModal = () => {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);
        return onCreate(values);
      })
      .then(() => {
        form.resetFields();
        setConfirmLoading(false);
        setVisible(false);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      })
      .finally();
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)} icon={<PlusOutlined />}>
        Thêm Menu
      </Button>
      <Modal
        visible={visible}
        title="Tạo menu"
        okText="Thêm"
        cancelText="Hủy"
        onCancel={onCancelModel}
        onOk={onOkModal}
        confirmLoading={confirmLoading}
      >
        <Form
          style={{
            marginTop: 8,
          }}
          form={form}
          initialValues={{ store: getCurrentStore() }}
          name="create-menu-form"
          layout="vertical"
        >
          <Row gutter={8}>
            <Col xs={24} md={12}>
              <FormItem
                label="Tên thực đơn"
                name="menu_name"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên',
                  },
                ]}
              >
                <Input placeholder="Tên thực đơn của cửa hàng" />
              </FormItem>
            </Col>
            {/* <Col xs={24} md={12}>
              <FormItem
                label="Cửa hàng áp dụng"
                name="store"
                rules={[
                  {
                    // required: true,
                    message: 'Vui lòng chọn cửa hàng',
                  },
                ]}
              >
                <SelectStore disabled />
              </FormItem>
            </Col> */}
          </Row>
          <Row gutter={8}>
            <Col xs={24} md={24}>
              <Form.Item label="Các ngày áp dụng">
                <FormItem
                  label="Các ngày áp dụng"
                  noStyle
                  name="day_filter"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn ngày',
                    },
                  ]}
                >
                  <SelectDay
                    style={{
                      width: '40%',
                    }}
                  />
                </FormItem>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <FormItem
              label="Thời gian hiệu lực"
              name="time_from_to"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập phần này',
                },
              ]}
            >
              <RangePicker
                picker="time"
                noStyle
                showTime
                format="HH:mm"
                minuteStep={30}
                style={{
                  width: '100%',
                }}
                placeholder={['Từ', 'Đến']}
              />
            </FormItem>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
CreateMenuModal.defaultProps = {
  onCreate: () => null,
  onCancel: () => null,
};
export default CreateMenuModal;
