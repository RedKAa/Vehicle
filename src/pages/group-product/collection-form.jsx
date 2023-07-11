import ImageUploader from '@/components/ImageUploader/ImageUploader';
import { normalizeImg, normFile } from '@/utils/utils';
import ProForm, { ProFormSwitch, ProFormText } from '@ant-design/pro-form';
import { Slider } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';

const CollectionForm = () => {

  const marks = {
    0: {
      style: {
        color: '#87d068',
      },
      label: <strong>Cao nhất</strong>,
    },
    500: 'Trung bình',
    1000: {
      style: {
        color: '#f50',
      },
      label: <strong>Thấp nhất</strong>,
    },
  };

  return (
    <>
      <ProFormText name="id" hidden />
      <ProForm.Item
        valuePropName="fileList"
        getValueFromEvent={normFile}
        normalize={normalizeImg}
        name="banner_url"
        label="Ảnh mô tả"
      >
        <ImageUploader />
      </ProForm.Item>
      <ProForm.Group>
        <ProFormText
          rules={[
            {
              required: true,
              min: 6,
              max: 30,
              message: 'Tên NSP từ 6 đến 30 kí tự',
            },
          ]}
          label="Tên NSP"
          placeholder="Nhập tên NSP"
          name="name"
          width="sm"
        />
        <ProFormSwitch name="show_on_home" label="Hiển thị trang chủ" />
      </ProForm.Group>
      <ProForm.Item
        rules={[
          {
            required: true,
          },
        ]}
        name="position"
        tooltip="Thứ tự các NSP"
        label="Thứ tự NSP"
      >
        <Slider
          style={{ pading: '3rem 5rem' }}
          marks={marks}
          min={0}
          max={1000}
          initialValues={0}
        />
      </ProForm.Item>
      <ProForm.Item
        name="description"
        label="Mô tả NSP"
      >
        <TextArea placeholder="Mô tả" autoSize={{ minRows: 3, maxRows: 5 }} />
      </ProForm.Item>
    </>
  );
};
export default CollectionForm;
