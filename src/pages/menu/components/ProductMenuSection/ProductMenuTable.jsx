import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { getCurrentStore } from '@/utils/utils';
import { EditOutlined } from '@ant-design/icons';
import {
  Button,
  Tooltip,
  Typography,
} from 'antd';
import React, { useReducer, useState } from 'react';
import ProductMenuModal from './ProductMenuModal';

const initState = {
  viewDetailVisible: false,
  currentProduct: null,
  updateMode: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'view-detail':
      return {
        ...state,
        currentProduct: action.payload.currentProduct,
        updateMode: false,
        viewDetailVisible: true,
      };
    case 'update-product-menu':
      return {
        ...state,
        currentProduct: action.payload.currentProduct,
        updateMode: true,
        viewDetailVisible: true,
      };
    case 'close-modal':
      return {
        ...state,
        viewDetailVisible: false,
        currentProduct: null,
        updateMode: false,
      };
    default:
      throw new Error();
  }
}

const ProductMenuTable = ({ actionRef, onUpdate, onDelete, menuId }) => {
  const [{ viewDetailVisible, currentProduct, updateMode }, dispatch] = useReducer(
    reducer,
    initState,
  );

  const [selectedRows, setSelectedRows] = useState([]);
  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'checkbox',
  };

  const onOkHandler = (prod) => {
    if (updateMode) {
      return Promise.resolve(onUpdate(prod)).then(() => dispatch({ type: 'close-modal' }));
    }
    dispatch({
      type: 'update-product-menu',
      payload: {
        currentProduct,
      },
    });
  };

  const columns = [
    {
      title: 'Tên voucher',
      width: 250,
      ellipsis: true,
      fixed: 'left',
      dataIndex: 'product-name',
      render: (_, { product_name }) => <Typography.Text>{product_name}</Typography.Text>
    },
    {
      title: 'Giá mua',
      dataIndex: 'cost',
      search: false,
    },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      search: false,
    },
    {
      title: 'Hành động',
      width: 120,
      fixed: 'right',
      search: false,
      align: 'center',
      render: (text, prod) => (
        <>
          <Tooltip title="Cập nhật">
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                dispatch({
                  type: 'update-product-menu',
                  payload: {
                    currentProduct: prod,
                  },
                });
              }}
              type="ghost"
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <ResoTable
        scroll={{ x: 600, y: 500 }}
        actionRef={actionRef}
        resource={`menus/${menuId}/products`}
        tableAlertOptionRender={({ _, __, onCleanSelected }) => [
          <AsyncButton
            isNeedConfirm={{
              title: 'Xác nhận xóa voucher',
              content: 'Bạn có muốn xóa những voucher này ra khỏi menu không',
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            onClick={() => onDelete(selectedRows).then(() => setSelectedRows([]))}
            title={`Xóa ${selectedRows.length} voucher`}
          />,
        ]}
        toolBarRender={() => [
          <ProductMenuModal
            updateMode={updateMode}
            product={currentProduct}
            visible={viewDetailVisible}
            onOk={onOkHandler}
            onCancel={() => dispatch({ type: 'close-modal' })}
          />,
        ]}
        columns={columns}
        rowKey="product_id"
        // search={false}
        rowSelection={rowSelection}
      />
    </>
  );
};

export default ProductMenuTable;
