import ImageUploader from '@/components/ImageUploader/ImageUploader';
import { normalizeImg, normFile, validateEmail, validatePhoneVN } from '@/utils/utils';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Image } from 'antd';
import React from 'react';

const PostForm = ({ updateMode = false, providerMode = false, readonly = false }) => {
  return (
    <>
      <ProForm.Group>
        <ProFormText
          label="Tiêu đề"
          disabled={updateMode}
          readonly={readonly}
          name="title"
          width="md"
        />
        <ProFormText
            rules={[
              {
                min: 1,
                max: 500,
                message: 'Nhập nội dung',
              },
            ]}
            label="Content"
            name="content"
            width="md"
            readonly={readonly}
        />
      </ProForm.Group>
      <ProForm.Group>
        {/* <ProFormSelect
          label="Thẻ"
          rules={[{ required: true, message: 'Vui lòng chọn thẻ' }]}
          name="tags"
          width="md"
          readonly={readonly}
          options={[]
            .map((key) => ({
              label: key,
              value: key,
            }))}
        /> */}
         {!readonly &&<ProForm.Item
          width="md"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          normalize={normalizeImg}
          name="cover"
          label="Ảnh bìa"
          readonly={readonly}
        >
          <ImageUploader style={{ height: '100%' }}/>
        </ProForm.Item>}
        {readonly && <ProForm.Item
          width="md"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          normalize={normalizeImg}
          name="cover"
          label="Ảnh bìa"
          readonly={readonly}
        >
         <Image
          width={200}
          src="cover"
        />
        </ProForm.Item>}
      </ProForm.Group>
    </>
  );
};

export default PostForm;
