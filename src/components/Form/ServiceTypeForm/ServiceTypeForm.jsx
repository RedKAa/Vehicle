import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import React from 'react';

const ServiceTypeForm = ({readonly = false, update = false,}) => {
  return (
    <>
      <ProForm.Group>
        <ProFormText
            rules={[
              {
                min: 3,
                max: 100,
                message: 'Tên từ 3 đến 100 kí tự',
              },
            ]}
            label="Tên loại dịch vụ"
            name="name"
            width="md"
            readonly={readonly}
        />
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
      </ProForm.Group>
        <ProForm.Group>
          <ProFormText
          rules={[
            {
              required: false,
              validator: (_, value) => {
                return !isNaN(value) && parseFloat(value) > 0 && parseFloat(value) < 1
                  ? Promise.resolve()
                  : Promise.reject(new Error('Hoa hồng không hợp lệ'));
              },
            },
          ]}
          label="Hoa hồng mặc định (0 .. 1)"
          name="defaultCommissionRate"
          width="md"
          />
        </ProForm.Group>
    </>
  );
};

export default ServiceTypeForm;
