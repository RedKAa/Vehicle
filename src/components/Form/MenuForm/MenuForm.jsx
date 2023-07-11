import React from 'react';
import { Input, Form, Row, Col, DatePicker } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import SelectDay from '@/components/SelectDay';
const { RangePicker } = DatePicker;
const MenuForm = () => {
  return (
    <>
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
          label="Thời gian áp dụng"
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
    </>
  );
};

export default MenuForm;
