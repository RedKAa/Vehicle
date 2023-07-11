import ResoTable from '@/components/ResoTable/ResoTable';
import { createService, deleteService } from '@/services/service';
import { activationById, updateListVouchersStatus } from '@/services/voucher';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Image, Switch } from 'antd';
import { Card, Form, message, Tag, Upload } from 'antd/lib';
import Meta from 'antd/lib/card/Meta';
import { filter } from 'lodash';
import {
  convertDateToStr,
  getAppToken,
  getCurrentProviderId
} from '@/utils/utils';
import React, { useRef, useState } from 'react';
import { comboColumn } from './config';
import axios from 'axios';
import moment from 'moment';
import AsyncButton from '@/components/AsyncButton';
import { ModalForm } from '@ant-design/pro-form';
import ComboForm from '@/components/Form/ServiceForm/ServiceForm';
import { createCombo } from '@/services/combo';
import { getTimeDistance } from '../DashboardAnalysis/utils/utils';



const CombosPage = ({ history }) => {
  const ref = useRef();
  const [form] = Form.useForm();
  // const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const providerId = getCurrentProviderId();
  const jwtToken = getAppToken();
  if(providerId) {additionalParam.providerId = providerId};

  const dayFilter = getTimeDistance('month');

  let kpiStartDate = convertDateToStr(dayFilter[0], 'MM/DD/YYYY HH:mm');
  let kpiEndDate = convertDateToStr(dayFilter[1], 'MM/DD/YYYY HH:mm');
  let additionalParam = { orderBy: 'createAt-dec', kpiStartDate, kpiEndDate};

  const deleteServiceHandler = () => {
    return deleteService(selectedRows[0]).then(() => ref.current?.reload());
  };

  const activationHandler = (data) => {
    Promise.resolve(activationById(data.id, { ...data })).then(() => {
      ref.current?.reload();
    });
  };
  const enableListVouchers = (voucherids) => {
    console.log(voucherids);
    return updateListVouchersStatus(voucherids, 'Active');
  }
  const disableListVouchers = (voucherids) => {
    console.log(voucherids);
    return updateListVouchersStatus(voucherids, 'Disable');
  }

  // const rowSelection = {
  //   selectedRowKeys: selectedRows,
  //   onChange: setSelectesetSelectedRowKeysdRows,
  //   type: 'checkbox',
  // };

  const rowSelection = {
    onChange: setSelectedRowKeys,
    type: 'checkbox',
  };


  const defaultPropsUploadQRCODE = {
    onChange: (info) => {
      if (info.file.status === 'uploading') {
        return;
      }
      if (info.file.status === 'done') {
        ref.current?.reload();
        message.success('Upload thành công');
        return;
      }
      if (info.file.status === 'error') {
        message.error('Lỗi khi upload file');
      }
    },
  };

  const columns = [
    {
      title: 'Xem Doanh Số Trong Khoảng (mặc định tháng này):',
      sorter: true,
      dataIndex: 'revenueInRange',
      hideInTable: true,
      hideInForm: true,
      valueType: 'dateTimeRange',
      search: {
        transform: (value) => ({ kpiStartDate: value[0] , kpiEndDate: value[1] }),
      },
    },
    ...comboColumn,
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 150,
      valueType: 'select',
      valueEnum: {
        true: { text: 'Đang hiển thị', status: 'Processing' },
        false: { text: 'không hiển thị', status: 'Error' },
      },
      search: false,
      align: 'center',
      render: (_, voucher) => {
        return (
          <Switch
            checked={voucher.status == 'Active' ? true : false}
            onChange={(bool) => {
              let status = bool ? 'Active' : 'Disable';
              let id = voucher.id;
              activationHandler({id, status});
            }}
          />
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      hideInTable: true,
      sorter: (a, b) => a.status > b.status,
      valueEnum: {
        "Active": {
          text: 'Active',
        },
        "Disable": {
          text: 'Disable',
        }
      },
      render: (_, { status }) => <Tag>{status}</Tag>,
    },
    {
      title: 'Tạo:',
      sorter: true,
      dataIndex: 'createdInRange',
      hideInTable: true,
      hideInForm: true,
      valueType: 'dateTimeRange',
      search: {
        transform: (value) => ({ createAt_startTime: value[0], createAt_endTime: value[1] }),
      },
    },
    {
      title: 'Cập nhật:',
      sorter: true,
      dataIndex: 'updatedInRange',
      hideInTable: true,
      hideInForm: true,
      valueType: 'dateTimeRange',
      search: {
        transform: (value) => ({ updateAt_startTime: value[0], updateAt_endTime: value[1] }),
      },
    },
    {
      title: 'Chỉnh sửa',
      search: false,
      render: (_, voucher) =>
        (<EditOutlined key={`edit ${voucher.id}`} onClick={() => history.push(`/combos/${voucher.id}`)}/>),
    }
  ];

  return (
    <PageContainer>
      <ResoTable
        additionParams={additionalParam}
        columns={columns}
        scroll={{
          x: 650,
        }}
        rowSelection={rowSelection}
        toolBarRender={() => [
            <Button
            type="primary"
            onClick={() => {
              history.push('/combos/create');
            }}
            icon={<PlusOutlined />}
            key={selectedRowKeys[0]}
          >
            Thêm Combo
          </Button>
        ]}
        tableAlertOptionRender={({ _, __, onCleanSelected }) => [
            <AsyncButton
            isNeedConfirm={{
              title: 'Xác nhận tắt combo',
              content: `Bạn có muốn chuyển ${selectedRowKeys.length} combo sang trạng thái không sẵn sàng không`,
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            onClick={() => disableListVouchers(selectedRowKeys).then(onCleanSelected).then(ref.current?.reload())}
            title={`Tắt ${selectedRowKeys.length} combos`}
            key={2}
            style={{marginRight: '20px'}}

          />,
          <AsyncButton
            isNeedConfirm={{
              title: 'Xác nhận bật combo',
              content: `Bạn có muốn chuyển ${selectedRowKeys.length} combos sang trạng thái sẵn sàng không`,
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ type: 'link' }}
            onClick={() => enableListVouchers(selectedRowKeys).then(onCleanSelected).then(ref.current?.reload())}
            title={`Bật ${selectedRowKeys.length} combos`}
            key={1}
            style={{marginRight: '20px'}}

          />,
        ]}
        rowKey="id"
        resource="combos/admin"
        actionRef={ref}
        isShowSelection={true}
      />
    </PageContainer>
  );
};

export default CombosPage;
