import ProForm, { ProFormText } from '@ant-design/pro-form';
import { normalizeImg, normFile } from '@/utils/utils';
import { FooterToolbar } from '@ant-design/pro-layout';
import React from 'react';
import ImageUploader from '@/components/ImageUploader/ImageUploader';

const SupplierForm = ({ onFinish, initialValues, readOnly, ...props }) => {
  return (
    <ProForm
      submitter={
        !readOnly
          ? {
              searchConfig: {
                submitText: 'Tạo',
              },
              render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
            }
          : false
      }
      initialValues={initialValues}
      onFinish={onFinish}
      {...props}
    >
      <ProForm.Group>
        <ProForm.Item
          width="md"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          normalize={normalizeImg}
          name="image_url"
          label="Ảnh đại điện"
        >
          <ImageUploader disabled={readOnly} style={{ height: '100%' }} />
        </ProForm.Item>
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          readonly={readOnly}
          label="Tên nhà cung cấp"
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormText readonly={readOnly} width="md" name="address" label="Địa chỉ nhà cung cấp" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          readonly={readOnly}
          name="contact_person"
          label="Tên chủ cung cấp"
        />
        <ProFormText width="md" readonly={readOnly} name="phone_number" label="SDT chủ cung cấp" />
      </ProForm.Group>
    </ProForm>
  );
};

export default SupplierForm;
