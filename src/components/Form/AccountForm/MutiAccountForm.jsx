import ProForm, { ProFormDatePicker, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { formatWhitespace, validateEmail, validatePhoneVN, getValidEmails } from '@/utils/utils';
import React from 'react';
const MutiAccountForm = ({ updateMode = false }) => {
  return (
    <>
      <ProForm.Group>
      <ProFormTextArea
            name="Emails"
            width="lg"
            label="Email(s): "
            placeholder="Danh sách email (ngăn cách bởi dấu ',')..."
            rules={[
            {
                required: true,
                validator: (_, value) => {
                  return getValidEmails(value).length > 0
                  ? Promise.resolve()
                  : Promise.reject(new Error('Không tìm thấy Email hợp lệ!'));
                },
            },
            ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          label="Quyền"
          rules={[{ required: true, message: 'Vui lòng chọn quyền' }]}
          name="role"
          width="md"
          options={
            [{label: 'Quản trị viên', value: 'Admin'},{label: 'Thẩm định viên', value: 'Assessor'},{label: 'Nhân viên bán hàng', value: 'Seller'}, {label: 'Nhân viên', value: 'Staff'}]
            .map((value) => ({
              label: value.label,
              value: value.value,
            }))}
        />
        <ProFormSelect
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn quyền' }]}
          name="status"
          width="md"
          options={['Active','Disable', 'New']
            .map((key) => ({
              label: key,
              value: key,
            }))}
        />
      </ProForm.Group>
    </>
  );
};

export default MutiAccountForm;
