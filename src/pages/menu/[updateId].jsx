import React, { useEffect, useMemo, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Typography, Input, DatePicker, Row, Col, Button, Empty } from 'antd';
import SelectDay from '@/components/SelectDay';
import AsyncButton from '@/components/AsyncButton';
import { getStore } from '@/services/store';
import ProductMenuSection from './components/ProductMenuSection';
import { SelectStore } from '@/components/CommonSelect/CommonSelect';
import { addProductIntoMenu, updateMenuInfo } from '@/services/menu';
import { convertDateToStr, convertStrToDate, getCurrentStore } from '@/utils/utils';
import { Prompt } from 'umi';
import ProCard from '@ant-design/pro-card';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

const UpdateMenu = (props) => {
  const {
    match: {
      params: { updateId },
    },
    location: {
      state: { menu_info },
    },
    history,
  } = props;
  const [form] = Form.useForm();

  const handlUpdateMenuInfo = () => {
    return form
      .validateFields()
      .then((updateMenu) => {
        // onCreate(values);

        updateMenu.time_from_to = [
          convertDateToStr(updateMenu.time_from_to[0], 'HH:mm'),
          convertDateToStr(updateMenu.time_from_to[1], 'HH:mm'),
        ];

        return updateMenuInfo(updateId, updateMenu).then(() => history.goBack());
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const formInitValues = useMemo(() => {
    const { time_from_to } = menu_info || {};
    const [from, to] = time_from_to || [];
    const formInitValue = { ...menu_info, store: getCurrentStore() };

    formInitValue.time_from_to = time_from_to && [
      convertStrToDate(from, 'hh:mm'),
      convertStrToDate(to, 'hh:mm'),
    ];
    return formInitValue;
  }, [menu_info]);

  if (menu_info === null) {
    return <Empty description="Không tìm thấy menu này" />;
  }

  return (
    <PageContainer>
      <Form
        style={{
          marginTop: 8,
        }}
        form={form}
        initialValues={formInitValues}
        layout="vertical"
        name="menuInfo"
      >
        <ProCard
          bordered
          headerBordered
          title={<Typography.Title level={4}>Thông tin chính</Typography.Title>}
          extra={[
            <Button onClick={() => history.replace('/menu')} style={{ marginRight: '8px' }}>
              Hủy
            </Button>,
            <AsyncButton
              btnProps={{
                type: 'primary',
              }}
              onClick={handlUpdateMenuInfo}
              title="Cập nhật thông tin"
            />,
          ]}
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
                <Input placeholder="VD: Menu sáng, menu trưa, menu chiều" />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col xs={24} md={12}>
              <FormItem
                label="Các ngày áp dụng"
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
                    width: '100%',
                  }}
                />
              </FormItem>
            </Col>
            <Col xs={24} md={12}>
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
                  style={{
                    width: '100%',
                  }}
                  showTime
                  format="hh:mm a"
                  minuteStep={10}
                  placeholder={['Từ', 'Đến']}
                />
              </FormItem>
            </Col>
          </Row>

          {/* PREPARE TO ADD */}
        </ProCard>

        <ProCard
          direction="column"
          title={<Typography.Title level={4}>voucher trong Menu</Typography.Title>}
          style={{ marginTop: 16 }}
          bordered
          headerBordered
        >
          <ProductMenuSection menuId={updateId} />
        </ProCard>
      </Form>
    </PageContainer>
  );
};

export default UpdateMenu;
