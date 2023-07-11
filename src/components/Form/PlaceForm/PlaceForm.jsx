import ImageUploader from '@/components/Uploader';
import { normalizeImg, normFile } from '@/utils/utils';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import React from 'react';

const PlaceForm = ({readonly = false, update = false,}) => {
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
                min: 3,
                max: 100,
                message: 'Tên từ 3 đến 100 kí tự',
              },
            ]}
            label="Vị trí trên bản đồ"
            name="mapLocation"
            width="md"
            readonly={readonly}
        />
          {!readonly &&<ProForm.Item
          width="md"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          normalize={normalizeImg}
          name="image"
          label="Ảnh banner"
          readonly={readonly}
        >
          <ImageUploader style={{ height: '100%' }}/>
        </ProForm.Item>}
      </ProForm.Group>
    </>
  );
};

export default PlaceForm;
