import ImageUploader from '@/components/ImageUploader/ImageUploader';
import { normalizeImg, normFile, validateEmail, validatePhoneVN } from '@/utils/utils';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Image } from 'antd';
import React from 'react';

const AccountForm = ({ updateMode = false, providerMode = false, readonly = false }) => {
  return (
    <>
      <ProForm.Group>
        <ProFormText
          rules={[
            {
              required: true,
              validator: (_, value) => {
                return validateEmail(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error('Email không hợp lệ!'));
              },
            },
          ]}
          label="Email"
          disabled={updateMode}
          readonly={readonly}
          name="email"
          width="md"
        />
        {!updateMode && !readonly && (
          <ProFormText.Password
            rules={[
              {
                required: true,
                min: 6,
                max: 10,
                message: 'Mật khẩu từ 6 đến 10 kí tự',
              },
            ]}
            label="Mật khẩu"
            name="password"
            width="md"
            hidden={updateMode}
          />
        )}
        <ProFormText
            rules={[
              {
                min: 5,
                max: 32,
                required: true,
                message: 'Tên từ 5 đến 32 kí tự',
              },
            ]}
            label="Tên người dùng"
            name="userName"
            width="md"
            readonly={readonly}
        />
      </ProForm.Group>
      <ProForm.Group>
      <ProFormSelect
          label="Vai Trò"
          rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
          name="role"
          width="md"
          options={
            [ {label: 'Quản trị viên', value: 'Admin'},{label: 'Giảng viên', value: 'Teacher'},{label: 'Sinh viên', value: 'Student'}]
            .map((value) => ({
              label: value.label,
              value: value.value,
            }))}
            // disabled={updateMode}
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
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          name="status"
          width="md"
          readonly={readonly}
          options={['Active','Disable']
            .map((key) => ({
              label: key,
              value: key,
            }))}
        />
         {!readonly &&<ProForm.Item
          width="md"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          normalize={normalizeImg}
          name="avatarLink"
          label="Ảnh đại điện"
          readonly={readonly}
        >
          <ImageUploader style={{ height: '100%' }}/>
        </ProForm.Item>}
        {readonly && <ProForm.Item
          width="md"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          normalize={normalizeImg}
          name="avatarLink"
          label="Ảnh đại điện"
          readonly={readonly}
        >
         <Image
          width={200}
          src="avatarLink"
        />
        </ProForm.Item>}
      </ProForm.Group>
    </>
  );
};

export default AccountForm;
