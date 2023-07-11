import ProForm from '@ant-design/pro-form';
import { Col, Empty, Form, Input, InputNumber, Modal, Radio, Row, Switch, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const ProductMenuModal = ({ product, visible, onOk, onCancel, updateMode, ...props }) => {
  const [form] = Form.useForm();

  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (product != null) {
      form.setFieldsValue(product);
    }
  }, [product]);

  const getMenuPriceFormItem = () => {
    const formPriceItems = [];

    formPriceItems.push(
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item name="cost" label={`Giá mua`}>
            <InputNumber disabled={!updateMode} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="price" label={`Giá bán`}>
            <InputNumber disabled={!updateMode} type="number" />
          </Form.Item>
        </Col>
      </Row>,
    );

    return formPriceItems;
  };

  const handleOk = () => {
    setConfirmLoading(true);
    return form
      .validateFields()
      .then((values) => {
        setConfirmLoading(false);
        return onOk(values);
      })
      .then(() => {
        setConfirmLoading(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  return (
    <Modal
      confirmLoading={confirmLoading}
      title="Chi tiết menu"
      okButtonProps={{ title: updateMode ? 'Cập nhật' : 'Cập nhật voucher này' }}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      {...props}
    >
      <Form initialValues={product} form={form} layout="horizontal" name="product_in_menu_modal">
        <Form.Item name="product_in_menu_id" hidden />
        <Form.Item name="product_id" hidden />
        <Form.Item name="product_name" label="Tên voucher">
          <Typography.Text>{product?.product_name}</Typography.Text>
        </Form.Item>
        {/* <ProForm.Item
          width="xs"
          // rules={[{ required: true }]}
          name="supplier_store_id"
          label="Cửa hàng cung cấp"
        >
          <SelectStoreOfSupplier
            // disabled={currentProdSupplierId == null}
            supplierId={product.supplier_store_id}
            fetchOnFirst
          />
        </ProForm.Item> */}
        {getMenuPriceFormItem()}
      </Form>
    </Modal>
  );
};

ProductMenuModal.defaultProps = {
  product: {},
  updateMode: false,
};

export default ProductMenuModal;
