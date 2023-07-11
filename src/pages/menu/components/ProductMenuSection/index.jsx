import { Typography, Row, Col, Form } from 'antd';
import ProductMenuTable from './ProductMenuTable';
import React, { useRef } from 'react';
import { addProductIntoMenu, deleteProductInMenu, updateProductInMenu } from '@/services/menu';
import ProCard from '@ant-design/pro-card';
import ProductInMenuForm from '@/components/Form/ProductInMenuForm';
import { getCurrentStore } from '@/utils/utils';

const ProductMenuSection = ({ menuId }) => {
  const ref = useRef();
  const currentStoreID = getCurrentStore();

  const handleAddNew = (prods) => {
    // call search to re-fetch Data
    return addProductIntoMenu([prods], menuId)
      .then((res) => {
        console.log('res :>> ', res);
        if (res?.status != 400) {
          ref?.current.reload();
        }
        return true;
      })
      .finally(() => true);
  };

  const handleUpdate = (prod) => {
    // call search to re-fetch Data
    // return promise
    return updateProductInMenu(prod, menuId)
      .then(ref?.current.reload)
      .then(() => true);
  };

  const handleDelete = (prods) => {
    // call search to re-fetch Data
    // return promise
    console.log('Delete', prods);
    return deleteProductInMenu(prods, menuId).then(ref?.current.reload);
  };

  return (
    <>
      <ProCard
        title="Thêm voucher vào menu"
        extra={<ProductInMenuForm btnTitle="Thêm voucher vào menu" onFinish={handleAddNew} />}
        type="inner"
      />

      <ProductMenuTable
        menuId={menuId}
        actionRef={ref}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </>
  );
};

export default ProductMenuSection;
