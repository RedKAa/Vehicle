import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import React from 'react';

const TagForm = ({readonly = false, update = false,}) => {
  return (
    <>
      <ProForm.Group>
        <ProFormText
            rules={[
              {
                min: 3,
                max: 100,
                required: true,
                message: 'Tên từ 3 đến 100 kí tự',
              },
            ]}
            label="Tên loại thẻ"
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
    </>
  );
};

export default TagForm;
