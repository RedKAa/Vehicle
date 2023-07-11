/* eslint-disable camelcase */
import React, { useState } from 'react';

import { Drawer, Button, Select, Typography, Space, Tag } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import ResoTable from '../ResoTable/ResoTable';

const { Option } = Select;

const ProductDrawer = ({
  onAdd,
  btnTitle,
  value: formValues,
  rowType = 'checkbox',
  onChange: onFormChange = () => null,
  ...tableProps
}) => {
  const [visible, setVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [adding, setAdding] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const addProductHadnler = () => {
    setAdding(true);
    onFormChange(selectedProducts.map(({ product_id }) => product_id));
    return Promise.resolve(onAdd(selectedProducts)).then(() => {
      setAdding(false);
      setVisible(false);
    });
  };

  const renderSelectedProducts = () => {
    return (
      <Space>
        {selectedProducts.map(({ product_name, id }) => (
          <Tag key={id}>{product_name}</Tag>
        ))}
      </Space>
    );
  };

  return (
    <>
      {formValues?.product_id || formValues ? (
        <>
          <Typography.Text>
            Đã chọn{' '}
            {(selectedProducts && renderSelectedProducts()) || formValues.product_id || formValues}
          </Typography.Text>
          <Button icon={<EditOutlined />} type="link" onClick={showDrawer} />
        </>
      ) : (
        <Button icon={<PlusOutlined />} type="primary" onClick={showDrawer}>
          {btnTitle}
        </Button>
      )}

      <Drawer
        title="Chọn voucher để thêm vào menu"
        width="85%"
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        destroyOnClose
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Hủy
            </Button>
            <Button loading={adding} onClick={addProductHadnler} type="primary">
              Thêm {selectedProducts && selectedProducts.length}
            </Button>
          </div>
        }
      >
        <ResoTable
          rowSelection={{
            type: rowType,
            onChange: (_, selectedProducts) => setSelectedProducts(selectedProducts),
          }}
          tableAlertOptionRender={false}
          {...tableProps}
        />
      </Drawer>
    </>
  );
};

ProductDrawer.defaultProps = {
  onAdd: () => null,
  btnTitle: <span>Thêm</span>,
};

export default ProductDrawer;
