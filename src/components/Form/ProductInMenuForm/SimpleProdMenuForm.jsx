import { SelectMenu } from '@/components/CommonSelect/CommonSelect';
import { SelectStoreOfSupplier } from '@/components/CommonSelect/CommonSelect';
import { PRODUCT_GIFT } from '@/utils/constraints';
import ProForm, { ProFormDigit, ProFormText } from '@ant-design/pro-form';
import React from 'react';

const SimpleProdMenuForm = ({
  hideSelectMenu = false,
  currentProdSupplierId,
  currentProductType,
}) => {
  return (
    <div>
      {!hideSelectMenu && (
        <ProForm.Group>
          <ProForm.Item
            label="Menu áp dụng"
            name="menu_id"
            rules={[{ required: !hideSelectMenu, message: 'Vui lòng chọn Menu!' }]}
          >
            <SelectMenu />
          </ProForm.Item>
        </ProForm.Group>
      )}
      <ProFormText hidden name="product_id" />
      <ProForm.Group>
        <ProForm.Item
          width="xs"
          rules={[{ required: true, message: 'Vui lòng chọn cửa hàng cung cấp' }]}
          name="supplier_store_id"
          label="Cửa hàng cung cấp"
        >
          <SelectStoreOfSupplier
            placeholder="Vui lòng chọn cửa hàng cung cấp"
            disabled={currentProdSupplierId == null}
            supplierId={currentProdSupplierId}
            fetchOnFirst
            style={{
              width: 200,
            }}
          />
        </ProForm.Item>
        <ProForm.Group>
          <ProFormDigit
            rules={[{ required: true, message: 'Vui lòng nhập giá mua' }]}
            min={0}
            name="cost"
            width="s"
            label="Giá mua (VND)"
          />
          <ProFormDigit
            rules={[{ required: true, message: 'Vui lòng nhập giá bán' }]}
            min={0}
            name="price"
            width="s"
            label={currentProductType == PRODUCT_GIFT ? 'Số Bean' : 'Giá bán (VND)'}
          />
        </ProForm.Group>
      </ProForm.Group>
    </div>
  );
};

export default SimpleProdMenuForm;
