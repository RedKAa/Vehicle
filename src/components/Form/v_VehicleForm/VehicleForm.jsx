import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { formatWhitespace, normFile, normalizeImg, validatePhoneVN } from '@/utils/utils'; 

import React from 'react';
import ImageUploader from '@/components/ImageUploader/ImageUploader';


const VehicleForm = ({readonly = false, update = false,}) => {
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
            label="Tên xe"
            name="name"
            width="md"
            readonly={readonly}
        />
        <ProFormText
            rules={[
              {
                required: true,
                message: 'không để trống xuất xứ',
              },
            ]}
            label="Xuất xứ"
            name="manufacture"
            width="md"
            readonly={readonly}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
            rules={[
              {
                required: true,
                message: 'không để trống màu xe',
              },
            ]}
            label="Màu sắc"
            name="color"
            width="md"
            readonly={readonly}
        />
        <ProFormSelect
          label="Mẫu mã"
          rules={[{ required: true, message: 'Vui lòng chọn mẫu mã' }]}
          name="carModel"
          width="md"
          readonly={readonly}
          options={['Sedan','SUV','Truck','Micro','Van']
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
                message: 'số km đã đi >= 0',
                validator: (_, value) => {
                  return value.match(/^\d+$/)
                    ? Promise.resolve()
                    : Promise.reject();
                },
              },
            ]}
            label="Số km đã đi"
            name="usage"
            width="md"
            readonly={readonly}
        />
        <ProFormText
            rules={[
              {
                required: false,
              },
            ]}
            label="Mô tả"
            name="description"
            width="md"
            disabled={update}
        />
      </ProForm.Group>
      <ProForm.Group>
      <ProFormText
            rules={[
              {
                required: true,
                message: 'Không để trống chủ xe',
              },
            ]}
            label="ID Chủ xe"
            name="vehicleOwnerId"
            width="md"
            disabled={update}
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
      {!readonly &&<ProForm.Item
          width="md"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          normalize={normalizeImg}
          name="imgs"
          label="Ảnh"
          readonly={readonly}
        >
          <ImageUploader style={{ height: '100%' }}/>
        </ProForm.Item>}
        {readonly && <ProForm.Item
          width="md"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          normalize={normalizeImg}
          name="imgs"
          label="Ảnh"
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

export default VehicleForm;
