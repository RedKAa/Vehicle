import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import {
  SelectSeller,
} from '@/components/CommonSelect/CommonSelect';
import React from 'react';

const ProviderForm = ({readonly = false}) => {
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
            label="Tên nhà cung cấp"
            name="providerName"
            width="md"
            readonly={readonly}
        />
        <ProFormText
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  return value.match(/^\d+$/)
                    ? Promise.resolve()
                    : Promise.reject(new Error('Mã số thuế không hợp lệ'));
                },
              },
            ]}
            label="Mã số thuế"
            name="taxCode"
            width="md"
            readonly={readonly}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
              rules={[
                {
                  required: true,
                  min: 6,
                  max: 100,
                  message: 'Tên từ 6 đến 100 kí tự',
                },
              ]}
              label="Địa chỉ"
              name="address"
              width="md"
              readonly={readonly}
          />
         {!readonly && (<ProFormSelect
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
        />)}
        {readonly && (<ProFormText
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          name="status"
          width="md"
          hideInSearch={true}
          readonly={readonly}
        />)}
      </ProForm.Group>
    </>
  );
};

export default ProviderForm;
