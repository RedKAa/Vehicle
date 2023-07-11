import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import React from 'react';

const DestinationForm = () => {
  return (
    <>
      <ProForm.Group>
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên hiển thị'
            },
          ]}
          width="md"
          name="name"
          label="Tên hiển thị"
        />
        <ProFormText name="destination_id" hidden />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea width="md" name="description" label="Miêu tả" />
      </ProForm.Group>
    </>
  );
};

export default DestinationForm;
