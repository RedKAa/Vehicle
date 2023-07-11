import { getTableData2 } from '@/services/table';
import { buildParams } from '@/utils/utils';
import { useDebounceFn, useFormTable } from '@umijs/hooks';
import { Button, Form, Row, Space, Table, Col, Input } from 'antd';
import React, { useState } from 'react';

// TODO: 1. Them Filter theo Collection
// TODO: 2. Them Filter theo Category
// TODO: 3. Them Filter theo ProductType

const columns = [
  {
    title: 'ID',
    dataIndex: 'product_id',
  },
  {
    title: 'Tên voucher',
    dataIndex: 'product_name',
  },
  {
    title: 'Giá cơ bản',
    dataIndex: 'base_price',
  },
];

const ProductTable = ({ onRowSelection, rowType = 'radio', additionOptions }) => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowkeys] = useState([]);

  const { tableProps, search, sorter } = useFormTable(
    ({ current, pageSize, sorter: s, filters }, formData) => {
      // build filters
      const options = {
        params: buildParams({ current, pageSize }, s, formData),
      };
      return getTableData2('products/all', { ...options, ...additionOptions });
    },
    {
      defaultPageSize: 100,
      defaultParams: [
        {
          current: 1,
          pageSize: 100,
        },
      ],
      form,
      paginated: true,
    },
  );

  const rowSelection = {
    type: rowType,
    selectedRowKeys,
    onChange: (selectedkeys, selectedRows) => {
      onRowSelection(selectedkeys, selectedRows);
      setSelectedRowkeys(selectedkeys);
    },
  };

  const { submit } = search;
  const { run: changeFilter } = useDebounceFn(submit, 500);

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Form form={form} onFieldsChange={changeFilter} layout="vertical">
      <Row justify="space-between">
        <Col span={16}>
          <Row gutter={8}>
            <Col xs={24}>
              <Form.Item name="product-name" label="Tên voucher">
                <Input allowClear placeholder="Nhập tên voucher" />
              </Form.Item>
            </Col>
            {/* <Col xs={24} md={12}>
                    <Form.Item name="product-type-id" label="Nhóm voucher">
                      <SelectCategory />
                    </Form.Item>
                  </Col> */}
          </Row>
        </Col>
        <Col>
          {/* <Button
            type="primary"
            onClick={() => history.push('/product/create')}
            icon={<PlusOutlined />}
          >
            Thêm voucher
          </Button> */}
        </Col>
      </Row>
      <Table
        style={{ width: '100%' }}
        rowKey="product_id"
        rowSelection={rowSelection}
        columns={columns}
        {...tableProps}
      />
    </Form>
  );
};

ProductTable.defaultProps = {
  onRowSelection: (selected) => selected,
};

export default ProductTable;
