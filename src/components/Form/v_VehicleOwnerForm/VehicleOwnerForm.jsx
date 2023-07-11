import ImageUploader from '@/components/ImageUploader/ImageUploader';
import { normalizeImg, normFile, validateEmail, validatePhoneVN } from '@/utils/utils';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Image } from 'antd';
import React from 'react';

const VehicleOwnerForm = ({ updateMode = false, readonly = false }) => {
  return (
    <>
      <ProForm.Group>
        <ProFormText
            rules={[
              {
                required: true,
                min: 5,
                max: 32,
                message: 'Tên từ 5 đến 32 kí tự',
              },
            ]}
            label="Tên"
            name="name"
            width="md"
        />
        <ProFormText
          rules={[
            {
              required: false,
              message: 'Email không hợp lệ!',
              validator: (_, value) => {
                return (!value || validateEmail(value))
                  ? Promise.resolve()
                  : Promise.reject();
              },
            },
          ]}
          label="Email"
          name="email"
          width="md"
        />
        
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          rules={[
            {
              required: true,
              validator: (_, value) => {
                return validatePhoneVN(value)
                  ? Promise.resolve()
                  : Promise.reject();
              },
              message: 'SĐT không hợp lệ!'
            },
          ]}
          label="SĐT"
          name="phone"
          width="md"
          disabled={readonly}
        />
        <ProFormText
            rules={[
              {
                required: true,
                min: 20,
                max: 100,
                message: 'Địa chỉ từ 20 đến 100 kí tự',
              },
            ]}
            label="Địa chỉ"
            name="address"
            width="md"
            disabled={readonly}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          name="status"
          width="md"
          disabled={readonly}
          options={['Active','Disable']
            .map((key) => ({
              label: key,
              value: key,
            }))}
        />
      </ProForm.Group>
    </>
  );
};

export default VehicleOwnerForm;
