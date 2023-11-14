import React, { useRef, useState } from 'react';
import { Space } from 'antd';
import ProTable from '@ant-design/pro-table';
import { getTableData2 } from '@/services/table';
import { buildParamsWithPro } from '@/utils/utils';
import { useIntl } from 'umi';
import { useDebounceFn, useRequest } from '@umijs/hooks';
import AsyncButton from '../AsyncButton';
// import productColumns from '@/pages/product/config';

const ResoTable = ({
  resource,
  additionParams = {},
  isShowSelection = true,
  tableAlertOptionRender,
  tableAlertRender,
  toolBarRender,
  actionRef,
  columns,
  request,
  formRefInstance,
  pagination,
  additionOptions,
  confirmProps,
  onDeleteSelection,
  dataSource,
  onChangeFormItem,
  rowSelection,
  polling = false,
  ...others
}) => {
  const { formatMessage } = useIntl();
  const ref = useRef();
  const { run: changeSearch } = useDebounceFn(
    () => {
      ref?.current?.submit();
    },
    [ref],
    700,
  );

  const { loading, data } = useRequest(() => ref?.current?.submit(), {
    pollingInterval: polling ?? 0,
    cacheKey: 'supplier_data',
    manual: !polling,
  });

  const [selectedRows, setSelectedRows] = useState(rowSelection?.initSelectedRows ?? []);

  const rowSelectionProps = rowSelection ?? {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
    ...rowSelection,
  };

  const orderBy = orderBy ? orderBy : 'status-asc';

  const defaultTableAlertOption = ({ _, __, onCleanSelected }) => {
    return [
      <AsyncButton
        key="confirm-button"
        isNeedConfirm={confirmProps}
        btnProps={{ danger: true, type: 'link' }}
        onClick={() => onDeleteSelection && onDeleteSelection(selectedRows).then(onCleanSelected)}
        title={`Xóa ${selectedRows.length}`}
      />,
    ];
  };

  const tableAlertOptionRenderProps =
    tableAlertOptionRender === false
      ? null
      : tableAlertOptionRender != null
      ? tableAlertOptionRender
      : defaultTableAlertOption;
  const [columnsStateMap, setColumnsStateMap] = useState(() => {
    const defaultState = {};
    columns?.forEach((col, index) => {
      if (col.hasOwnProperty('show') && !col.show) {
        defaultState[index] = { show: col.show };
      }
      // defaultState[index] = false;
    });
    return defaultState;
  });

  const handleConvertColumn = () => {
    let convertColumn = [];
    if (columns.length > 0) {
      columns.map((item) => {
        convertColumn.push({
          ...item,
          title: item.title,
        });
      });
    }
    return convertColumn;
  };
  const setRef = (cb) => {
    ref.current = cb;
    if (formRefInstance) formRefInstance.current = cb;
  };

  return (
    <ProTable
      pagination={pagination}
      columns={[...handleConvertColumn()]}
      beforeSearchSubmit={(params) => {
        const formattedParams = {};
        Object.keys(params).forEach((key) => {
          const formatedKey = key.replace('_', '-');
          formattedParams[formatedKey] = params[key];
        });
        return params;
      }}
      onColumnsStateChange={(currentCol) => setColumnsStateMap(currentCol)}
      form={{
        onValuesChange: (values) => {
          changeSearch();
        },
        initialValues: additionParams,
      }}
      tableAlertRender={tableAlertRender}
      tableAlertOptionRender={tableAlertOptionRenderProps}
      rowSelection={
        isShowSelection
          ? {
              ...rowSelectionProps,
              onChange: (selectedKey, selectedRowsSelection) => {
                setSelectedRows(selectedKey);
                if (rowSelectionProps?.onChange) {
                  rowSelectionProps?.onChange(selectedKey, selectedRowsSelection);
                }
                // for form item
                onChangeFormItem(selectedRowsSelection);
              },
            }
          : false
      }
      request={(params, sort, filters) => {
        if (dataSource)
          return Promise.resolve({
            data: dataSource,
            success: true,
          });
        return request(params, sort, filters, additionParams, resource, additionOptions);
      }}
      scroll={{
        x: 500,
        y: 700,
      }}
      search={{
        layout: 'vertical',
        defaultCollapsed: false,
        resetText: 'Tải lại',
      }}
      rowKey="product_id"
      toolBarRender={toolBarRender}
      columnsStateMap={columnsStateMap}
      actionRef={actionRef}
      formRef={setRef}
      dataSource={dataSource}
      {...others}
    />
  );
};

ResoTable.defaultProps = {
  pagination: {
    defaultPageSize: 10,
  },
  confirmProps: {
    title: 'Xác nhận xóa',
    content: 'Bạn có muốn xóa không',
    okText: 'Xác nhận',
    cancelText: 'Không',
  },
  onChangeFormItem: () => null,
  tableAlertRender: ({ selectedRowKeys, selectedRows, onCleanSelected }) => (
    <Space size={24}>
      <span>
        Đã chọn {selectedRowKeys.length}
        <a
          style={{
            marginLeft: 8,
          }}
          onClick={onCleanSelected}
        >
          Hủy chọn
        </a>
      </span>
    </Space>
  ),
  // tableAlertOptionRender: null,
  // additionParams: { fields: ['combos', 'extra_group', 'collections'] },
  // columns: productColumns,
  resource: 'areas/products',
  request: (params, sort, filters, additionParams, resource, additionOptions = {}) => {
    // build filters
    const options = {
      params: {
        ...additionParams,
        ...buildParamsWithPro(params, sort, filters),
      },
      ...additionOptions,
    };

    return getTableData2(resource, options);
  },
};

export default ResoTable;
