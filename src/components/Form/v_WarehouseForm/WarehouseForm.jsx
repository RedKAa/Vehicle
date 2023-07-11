import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { formatWhitespace, validatePhoneVN } from '@/utils/utils'; 

import React from 'react';


const WarehouseForm = ({readonly = false, update = false,}) => {
  return (
    <>
      <ProForm.Group>
        <ProFormText
            rules={[
              {
                required: true,
                min: 3,
                max: 100,
                message: 'Tên từ 3 đến 100 kí tự',
              },
            ]}
            label="Tên kho"
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
                required: true,
                min: 20,
                max: 100,
                message: 'Địa chỉ từ 20 đến 100 kí tự',
              },
            ]}
            label="Địa chỉ kho"
            name="address"
            width="md"
            readonly={readonly}
        />
        <ProFormText
          rules={[
            {
              required: false,
              validator: (_, value) => {
                return (!value || validatePhoneVN(value))
                  ? Promise.resolve()
                  : Promise.reject();
              },
              message: 'SĐT không hợp lệ!',
            },
          ]}
          label="SĐT"
          name="phone"
          width="md"
          readonly={readonly}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
            rules={[
              {
                validator: (_, value) => {
                return (update || (!isNaN(value) && value.match(/^\d+$/) && parseInt(value) >= 20))
                  ? Promise.resolve()
                  : Promise.reject();
                },
                message: 'sức chứa tối thiểu là 20',
              },
            ]}
            label="Sức chứa tối đa"
            name="maxCapacity"
            width="md"
            disabled={update}
        />
        {update &&
        <ProFormText
            rules={[
              {
                validator: (_, value) => {
                return (!value || formatWhitespace(value) === '' || (!isNaN(value) && value.match(/^\d+$/)))
                  ? Promise.resolve()
                  : Promise.reject();
                },
                message: 'nhập số nguyên',
              },
            ]}
            label="Tăng/Giảm sức chứa tối đa"
            name="adjustMaxCap"
            width="md"
        />
      }
      </ProForm.Group>
     
    </>
  );
};

export default WarehouseForm;
