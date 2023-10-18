import React from 'react';
import { SelectSubject } from '@/components/CommonSelect/CommonSelect';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';

const TagForm = ({ readonly = false, update = false, }) => {
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
          label="Tên thẻ"
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
          options={['Active', 'Disable']
            .map((key) => ({
              label: key,
              value: key,
            }))}
        />

        <ProForm.Item
          label="Môn học"
          name="subjectId"
          rules={[{ required: true, message: 'Vui lòng chọn môn học' }]}
          disable={readonly}
          width="md"
        >
          <SelectSubject
            placeholder="Tìm môn học"
            fetchOnFirst
          />
        </ProForm.Item>
      </ProForm.Group>
    </>
  );
};

export default TagForm;
