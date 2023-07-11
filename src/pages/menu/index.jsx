import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, message, Row, Space, Table } from 'antd';
import { connect, Link } from 'umi';
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import MenuCreateModal from './components/CreateMenuForm';
import AsyncButton from '@/components/AsyncButton';
import { useFormTable } from '@umijs/hooks';
import { buildParams } from '@/utils/utils';
import { getTableData } from '@/services/table';

const columns = [
  {
    title: 'Tên thực đơn',
    dataIndex: 'name',
    fixed: 'left',
    render: (text, record) => <Link to={`/menu/${record.id}`}>{text}</Link>,
  },
  {
    title: 'Cửa hàng',
    dataIndex: 'age',
  },
  {
    title: 'Các ngày áp dụng',
    dataIndex: 'address',
  },
  {
    title: 'Thời gian áp dụng',
    dataIndex: 'address',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'address',
  },
];

const MenuList = (props) => {
  const { submitting } = props;
  const [visible, setVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [form] = Form.useForm();

  const { tableProps, search, sorter } = useFormTable(
    ({ current, pageSize, sorter: s, filters }, formData) => {
      // build filters
      const options = {
        params: buildParams({ current, pageSize }, s, formData),
      };
      console.log('FETCHING MENU');
      return getTableData('menus', options);
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

  const onCreate = async (values) => {
    const { dispatch } = props;
    await dispatch({
      type: 'formAndbasicForm/submitRegularForm',
      payload: values,
    });
    setVisible(false);
  };

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <PageContainer content="Tạo menu">
      <Card bordered={false}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Row justify="space-between">
            <Col>
              <Button type="primary" onClick={() => setVisible(true)} icon={<PlusOutlined />}>
                Thêm Menu
              </Button>
            </Col>
          </Row>
          <Row justify="end">
            {hasSelected && (
              <AsyncButton
                btnProps={{ danger: true, type: 'primary' }}
                onClick={() => message.success('Delete success')}
                title={`Delete ${selectedRowKeys.length} items`}
              />
            )}
          </Row>
          <Table columns={columns} {...tableProps} />
        </Space>
      </Card>

      <MenuCreateModal
        submitting={submitting}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => setVisible(false)}
      />
    </PageContainer>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['formAndbasicForm/submitRegularForm'],
}))(MenuList);
