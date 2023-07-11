import React from 'react';
import ProductDrawer from '@/components/ProductDrawer/ProductDrawer';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { useParams } from 'umi';

const CollectionForm = () => {
  const { supplierId } = useParams();

  return (
    <>
      <ProForm.Group>
        <ProFormText
          placeholder="Trà sữa tươi mát, Cơm gà nóng hổi,..."
          width="md"
          name="name"
          label="Tên nhóm"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên nhóm',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea width="md" name="description" label="Miêu tả" />
      </ProForm.Group>
      <ProForm.Item
        label="Thêm các voucher"
        name="products"
        rules={[
          {
            required: false,
            message: 'Vui lòng chọn ít nhất 1 voucher',
          },
        ]}
      >
        <ProductDrawer
          additionParams={{
            'is-available': true,
            'supplier-id': +supplierId,
          }}
          rowType="checkbox"
          btnTitle="Chọn voucher"
        />
      </ProForm.Item>
    </>
  );
};

export default CollectionForm;
