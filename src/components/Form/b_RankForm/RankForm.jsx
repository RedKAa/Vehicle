import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import React from 'react';
import { normalizeImg, normFile } from '@/utils/utils';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import { Image } from 'antd';

const RankForm = ({ readonly = false, update = false, }) => {
  return (
    <>
      <ProForm.Group>
        <ProFormText
          rules={[
            {
              required: true,
              min: 3,
              max: 100,
              message: 'Điền tên xếp hạng từ 3 đến 15 kí tự',
            },
          ]}
          label="Tên xếp hạng"
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
        {!readonly && <ProForm.Item
          width="md"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          normalize={normalizeImg}
          name="avatarLink"
          label="Hình xếp hạng"
          readonly={readonly}
        >
          <ImageUploader style={{ height: '100%' }} />
        </ProForm.Item>}
        {readonly && <ProForm.Item
          width="md"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          normalize={normalizeImg}
          name="avatarLink"
          label="Hình xếp hạng"
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

export default RankForm;
