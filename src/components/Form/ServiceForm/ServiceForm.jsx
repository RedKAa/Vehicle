import ProForm, { ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import {
  SelectPlace,
  SelectProvider,
  SelectServiceType,
} from '@/components/CommonSelect/CommonSelect';
import {formatWhitespace} from '@/utils/utils';
import React from 'react';

const ServiceForm = ({readonly = false, update = false, admin = true}) => {
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
            label="Tên dịch vụ"
            name="name"
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
      </ProForm.Group>

      {!readonly && (
          <ProForm.Group>
            <ProForm.Item
              width="lg"
              rules={[{ required: true, message: 'Vui lòng chọn địa điểm' }]}
              name="serviceLocationId"
              label="Chọn địa điểm"
              readonly={readonly}
            >
              <SelectPlace
                placeholder="Vui lòng chọn địa điểm"
                fetchOnFirst
                width="600"
              />
          </ProForm.Item>
          </ProForm.Group>
        )}

      {!readonly && (
          <ProForm.Group>
            <ProForm.Item
              width="lg"
              rules={[{ required: true, message: 'Vui lòng chọn loại dịch vụ' }]}
              name="serviceTypeId"
              label="Chọn loại dịch vụ"
              readonly={readonly}
            >
              <SelectServiceType
                placeholder="Vui lòng chọn loại dịch vụ"
                fetchOnFirst
                width="600"
                disabled={update}
              />
          </ProForm.Item>
          </ProForm.Group>
        )}

      {!readonly && !update && admin && (
          <ProForm.Group>
            <ProForm.Item
              width="lg"
              rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp' }]}
              name="providerId"
              label="Chọn nhà cung cấp"
              readonly={readonly}
            >
              <SelectProvider
                placeholder="Vui lòng chọn nhà cung cấp"
                fetchOnFirst
                width="600"
              />
          </ProForm.Item>
          </ProForm.Group>
        )}

      <ProForm.Group>
        <ProFormTextArea
              name="description"
              width="lg"
              label="Mô tả:"
              placeholder="Nhập mô tả..."
              hideInSearch={true}
              rules={[
              {
                  required: true,
                  validator: (_, value) => {
                    return formatWhitespace(value).length > 0
                    ? Promise.resolve()
                    : Promise.reject(new Error('Nhập mô tả!'));
                  },
              },
              ]}
          />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
              name="usePlace"
              width="lg"
              label="Địa chỉ sử dụng:"
              placeholder="Nhập địa chỉ sử dụng dịch vụ..."
              hideInSearch={true}
              rules={[
              {
                  required: true,
                  validator: (_, value) => {
                    return formatWhitespace(value).length > 0
                    ? Promise.resolve()
                    : Promise.reject(new Error('Nhập mô tả!'));
                  },
              },
              ]}
          />
      </ProForm.Group>
    </>
  );
};

export default ServiceForm;
