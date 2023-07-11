import ImageUploader from '@/components/Uploader';
import { normalizeImg, normFile } from '@/utils/utils';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import React from 'react';

const RankForm = ({readonly = false, update = false,}) => {
  return (
    <>
      <ProForm.Group>
        <ProFormText
            rules={[
              {
                min: 3,
                max: 10,
                message: 'Xếp hạng từ 3 đến 10 kí tự',
              },
            ]}
            label="Xếp hạng"
            name="rank"
            width="md"
            readonly={readonly}
        />
        <ProForm.Item
          width="md"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          normalize={normalizeImg}
          name="logo"
          label="Ảnh xếp hạng"
          readonly={readonly}
        >
          <ImageUploader style={{ height: '100%' }}/>
        </ProForm.Item>
       {/* <ProFormSelect
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
        /> */}
      </ProForm.Group>
        <ProForm.Group>
          <ProFormText
          rules={[
            {
              required: false,
              validator: (_, value) => {
                return !isNaN(value) && parseFloat(value) > 0 && parseFloat(value) < 1
                  ? Promise.resolve()
                  : Promise.reject(new Error('Hoa hồng không hợp lệ'));
              },
            },
          ]}
          label="Hoa hồng (0 .. 1)"
          name="commissionRatePercent"
          width="md"
          />
          <ProFormText
          rules={[
            {
              required: false,
              validator: (_, value) => {
                return !isNaN(value) && parseInt(value) > 0
                  ? Promise.resolve()
                  : Promise.reject(new Error('Kinh nghiệm yêu cầu không hợp lệ'));
              },
            },
          ]}
          label="Kinh nghiệm yêu cầu"
          name="epxRequired"
          width="md"
          />
        </ProForm.Group>
    </>
  );
};

export default RankForm;
