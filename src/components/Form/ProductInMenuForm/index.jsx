import {
  SelectProductByName,
  SelectStoreOfSupplier,
  SelectMenu,
} from '@/components/CommonSelect/CommonSelect';
import ProductDrawer from '@/components/ProductDrawer/ProductDrawer';
import ResoTable from '@/components/ResoTable/ResoTable';
import { PRODUCT_GIFT, PRODUCT_MASTER } from '@/utils/constraints';
import ProForm, { DrawerForm, ModalForm, ProFormDigit } from '@ant-design/pro-form';
import { Button, Divider, message } from 'antd';
import React, { useMemo, useState } from 'react';

const ProductInMenuForm = ({
  onFinish,
  initialValues,
  btnTitle = 'Thêm một voucher',
  hideSelectMenu = true,
  trigger,
  btnProps = {},
}) => {
  const [currentProdSupplierId, setCurrentProdSupplierId] = useState(initialValues?.supplier_id);
  const [currentProductType, setCurrentProductType] = useState(initialValues?.product_type_id);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formAddRef] = ProForm.useForm();

  const renderStoreOfSup = useMemo(() => {
    formAddRef.setFields([{ name: 'supplier_store_id', value: null }]);
    return (
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
    );
  }, [currentProdSupplierId]);

  const addProductToMenuHandler = (values) => {
    if (!selectedProduct) {
      message.error({ content: 'Vui lòng chọn 1 voucher' });
      return;
    }
    onFinish({ ...values, product_id: selectedProduct.product_id });
  };

  return (
    <DrawerForm
      form={formAddRef}
      onFinish={addProductToMenuHandler}
      name="addProductInMenuForm"
      title={`Thêm voucher ${initialValues?.product_name ?? ''} vào menu`}
      initialValues={initialValues}
      submitter={{
        searchConfig: {
          submitText: 'Thêm vào thực đơn',
        },
        resetButtonProps: {
          style: {
            // Hide the reset button
            display: 'none',
          },
        },
      }}
      trigger={trigger ?? <Button type="primary">{btnTitle}</Button>}
    >
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
      <ProForm.Group>
        {renderStoreOfSup}
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

      <Divider />

      <ResoTable
        rowSelection={{
          type: 'radio',
          onChange: (_, [product]) => {
            setCurrentProductType(product.product_type_id);
            setCurrentProdSupplierId(product?.supplier_id);
            setSelectedProduct(product);
          },
        }}
        tableAlertOptionRender={false}
        size="small"
        {...btnProps}
      />
    </DrawerForm>
  );
};

export default ProductInMenuForm;
