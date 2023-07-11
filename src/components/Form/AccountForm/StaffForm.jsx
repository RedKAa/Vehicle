import ImageUploader from '@/components/ImageUploader/ImageUploader';
import { normalizeImg, normFile, validateEmail, validatePhoneVN } from '@/utils/utils';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Image } from 'antd';
import React from 'react';

const StaffForm = ({ updateMode = false, readonly = false }) => {
  return (
    <>
        <ProFormText
            rules={[
              {
                min: 5,
                max: 32,
                message: 'Tên từ 5 đến 32 kí tự',
              },
            ]}
            label="Tên"
            name="name"
            width="md"
            readonly={readonly}
        />
        <ProFormText
          rules={[
            {
              required: false,
              validator: (_, value) => {
                return validatePhoneVN(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error('SĐT không hợp lệ!'));
              },
              message: 'SĐT không hợp lệ!'
            },
          ]}
          label="SĐT"
          name="phone"
          width="md"
          readonly={readonly}
        />
        <ProFormText
          rules={[
            {
              required: false,
              message: 'không để trống địa chỉ!'
            },
          ]}
          label="Địa chỉ"
          width="md"
          name="address"
          readonly={readonly}
        />
    </>
  );
};

export default StaffForm;
