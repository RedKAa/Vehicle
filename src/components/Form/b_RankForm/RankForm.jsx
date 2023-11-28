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
        <ProFormText
          rules={[
            {
              required: false,
              min: 3,
              max: 100,
              message: 'Điền mô tả xếp hạng',
            },
          ]}
          label="Mô tả xếp hạng"
          name="description"
          width="md"
          readonly={readonly}
        />
        <ProFormText
          rules={[
            {
              required: true,
              min: 1,
              max: 4,
              message: 'Nhập điểm xếp hạng',
            },
          ]}
          label="Điểm xếp hạng"
          name="expRequired"
          width="md"
          readonly={readonly}
        />

        {/* <ProFormSelect
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
        /> */}
        {!readonly && <ProForm.Item
          width="md"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          normalize={normalizeImg}
          name="imgLink"
          label="Hình xếp hạng"
          rules={[{ required: true, message: 'Vui lòng chọn hình ảnh' }]}
          readonly={readonly}
        >
          <ImageUploader style={{ height: '100%' }} />
        </ProForm.Item>}
        {/* {readonly && <ProForm.Item
          width="md"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          normalize={normalizeImg}
          name="imgLink"
          label="Hình xếp hạng"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          readonly={readonly}
        >
          <Image
            width={200}
            src="imgLink"
          />
        </ProForm.Item>} */}
      </ProForm.Group>
      <div style={{ fontWeight: 'bold', fontStyle: 'italic'}}>
          Điểm xếp hạng = số cmt * 20 + số tim * 10
        </div>
    </>
  );
};

export default RankForm;
