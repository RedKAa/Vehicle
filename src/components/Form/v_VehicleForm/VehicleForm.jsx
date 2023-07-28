import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { formatWhitespace, normFile, normFiles, normalizeImg, normalizeImgs, validateInt, validatePhoneVN } from '@/utils/utils'; 

import React from 'react';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import { SelectVehicleOwner } from '@/components/CommonSelect/CommonSelect';
import { DatePicker } from 'antd';


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
            disable={readonly}
        />
        <ProFormSelect
          label="Mẫu mã"
          rules={[{ required: true, message: 'Vui lòng chọn mẫu mã' }]}
          name="carModel"
          width="md"
          disable={readonly}
          options={['Sedan','SUV','Truck','Micro','Van']
            .map((key) => ({
              label: key,
              value: key,
            }))}
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
            disable={readonly}
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
            disable={readonly}
        />
        <ProFormSelect
          label="Hộp số"
          rules={[{ required: true, message: 'Vui lòng chọn hộp số' }]}
          name="gearType"
          width="xs"
          disable={readonly}
          options={[{value: 'Automatic', label: 'Tự động'},{value: 'Manual', label: 'Số sàn'}]
            .map((data) => ({
              label: data.label,
              value: data.value,
            }))}
        />
        <ProFormSelect
          label="Nhiên liệu"
          rules={[{ required: true, message: 'Vui lòng chọn hộp số' }]}
          name="fuelType"
          width="xs"
          disable={readonly}
          options={[{value: 'Electric', label: 'Điện'},{value: 'Gas', label: 'Xăng'},{value: 'Hybrid', label: 'Xăng & Điện'}]
            .map((data) => ({
              label: data.label,
              value: data.value,
            }))}
        />
        <ProFormSelect
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          name="status"
          width="xs"
          disable={readonly}
          options={['Active','Disable']
            .map((key) => ({
              label: key,
              value: key,
            }))}
        />
        <ProForm.Item
          label="Mua mới"
          name="newAt"
          width="md"
          disable={readonly}
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn thời điểm mua mới',
            },
          ]}
        >
        <DatePicker
          format="YYYY-MM-DD"
        />
        </ProForm.Item>
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
            rules={[
              {
                required: true,
                message: 'Số km đã đi >= 0',
                validator: (_, value) => validateInt(value)
                    ? Promise.resolve()
                    : Promise.reject()
              },
            ]}
            label="Số km đã đi"
            name="usage"
            width="md"
            disable={readonly}
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
            disable={readonly}

        />
        <ProForm.Item
         label="Chủ sở hữu"
         name="vehicleOwnerId"
         rules={[{ required: true, message: 'Vui lòng chọn chủ sở hữu' }]}
         disable={readonly}
         width="md"
        >
          <SelectVehicleOwner
          placeholder="Tìm chủ sở hữu bằng SĐT"
          fetchOnFirst
          />
        </ProForm.Item>
      </ProForm.Group>
      <ProForm.Group>
       <ProForm.Item
          width="md"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          normalize={normalizeImg}
          name="imgs"
          label="Ảnh chính"
        >
         <ImageUploader style={{ height: '100%' }}/>
        </ProForm.Item>
        <ProForm.Item
          width="md"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          normalize={normalizeImgs}
          name="vehicleImgs"
          label="Ảnh mô tả"
          disable={readonly}
        >
          <ImageUploader style={{ height: '100%' }} multiple/>
        </ProForm.Item>
        </ProForm.Group>
    </>
  );
};

export default VehicleForm;
