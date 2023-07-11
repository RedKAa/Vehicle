import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import React from 'react';

const SellerForm = ({readonly = false}) => {
  return (
    <>
      <ProForm.Group>
        <ProFormText
            rules={[
              {
                min: 5,
                max: 100,
                message: 'Tên từ 5 đến 100 kí tự',
              },
            ]}
            label="Tên cộng tác viên"
            name="sellerName"
            readonly={readonly}
            width="sm"
        />
        <ProFormText
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  return (!isNaN(value) && parseFloat(value) < 1 && parseFloat(value) > 0)
                    ? Promise.resolve()
                    : Promise.reject(new Error('Tỉ lệ hoa hồng không hợp lệ'));
                },
              },
            ]}
            label="Tỉ lệ hoa hồng"
            readonly={readonly}
            name="commissionRate"
            width="sm"
        />
      </ProForm.Group>
      <ProForm.Group>
      <ProFormSelect
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          name="busyLevel"
          width="sm"
          options={[{value: 'Free', label: 'Rảnh tay'},{value: 'Moderate', label: 'Đang làm việc'}, {value: 'Busy', label: 'Bận rộn'}, {value: 'Unavailable', label: 'Không hoạt động'}]
            .map((data) => ({
              label: data.label,
              value: data.value,
            }))}
            readonly={readonly}
        />
      </ProForm.Group>
    </>
  );
};

export default SellerForm;
