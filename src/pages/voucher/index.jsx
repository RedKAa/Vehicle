import ResoTable from '@/components/ResoTable/ResoTable';
import { createService, deleteService } from '@/services/service';
import { activationById, generateQRCodeListVouchers, updateListVouchersStatus } from '@/services/voucher';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Col, Image, Input, Row, Switch } from 'antd';
import { Card, Form, message, Tag, Upload } from 'antd/lib';
import Meta from 'antd/lib/card/Meta';
import { filter } from 'lodash';
import {
  convertDateToStr,
  formatCurrency,
  getAppToken,
  getCurrentProviderId
} from '@/utils/utils';
import React, { useRef, useState } from 'react';
import { voucherColumn } from './config';
import axios from 'axios';
import moment from 'moment';
import AsyncButton from '@/components/AsyncButton';
import { ModalForm } from '@ant-design/pro-form';
import ComboForm from '@/components/Form/ComboForm/ComboForm';
import { createCombo } from '@/services/combo';
import ProviderForm from '@/components/Form/ProviderForm/ProviderForm';
import FormItem from 'antd/lib/form/FormItem';
import { getTimeDistance } from '../DashboardAnalysis/utils/utils';



const VouchersPage = ({ history }) => {
  const ref = useRef();
  const [form] = Form.useForm();
  // const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [comboVisible, setComboVisible] = useState(false);

  const providerId = getCurrentProviderId();

  const dayFilter = getTimeDistance('month');

  let kpiStartDate = convertDateToStr(dayFilter[0], 'MM/DD/YYYY HH:mm');
  let kpiEndDate = convertDateToStr(dayFilter[1], 'MM/DD/YYYY HH:mm');
  let additionalParam = { orderBy: 'createAt-dec',isCombo: false, kpiStartDate, kpiEndDate};
  const jwtToken = getAppToken();
  if(providerId) {additionalParam.providerId = providerId};

  const deleteServiceHandler = () => {
    return deleteService(selectedRows[0]).then(() => ref.current?.reload());
  };

  const activationHandler = (data) => {
    Promise.resolve(activationById(data.id, { ...data })).then(() => {
      ref.current?.reload();
    });
  };

  const createComboHandler = (data, props, onCleanSelected) => {
    const startDate = data.useDate[0];
      const endDate = data.useDate[1];
      return createCombo({...data,startDate,endDate, voucherIds: selectedRowKeys})
      .then(ref.current?.reload)
      .then(() => props.reset())
      .then(() => setComboVisible(false))
      .then(()=>onCleanSelected())
      .catch((e) => {
        console.log(e);
        message.error({ content: e.toString() });
        return false;
      })
  }

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
    selectedRowKeys: selectedRowKeys,
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

  const uploadQRcode = async options => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "Authorization": `Bearer ${jwtToken}`,
     },
    };
    fmData.append("file", file);
    try {
      const res = await axios.post(
        options.action,
        fmData,
        config
      ).then (() => {
        ref.current?.reload();
        message.success("Tải lên thành công!");
        }
      )
    } catch (err) {
      message.error("Tải lên không thành công! ");
    }
  };

  let additionColumn = [];
  if(!providerId) {
    additionColumn = [
      {
        title: 'Hoa hồng nhận được',
        dataIndex: 'kpi',
        hideInForm:true,
        hideInSearch: true,
        render: (_,{kpi}) => <>{formatCurrency(kpi.commissionFee)}</>
      },
      {
        title: 'Hoa hồng cho CTV',
        dataIndex: 'kpi',
        hideInForm:true,
        hideInSearch: true,
        render: (_,{kpi}) => <>{formatCurrency(kpi.sellerCommissionFee)}</>
      },
      {
      title: 'Nhà cung cấp',
      dataIndex: 'provider',
      hideInForm: true,
      search: false,
      render: (_, {provider}) => (
        <ModalForm
          title="Nhà cung cấp"
          name="view-provider"
          key={`view-provider_${provider.id}`}
          modalProps={{
            destroyOnClose: true,
          }}
          submitter={{
            searchConfig: {
              submitText: 'Ok',
          },
          render: (props, doms) => {
            return [
            ];
          },
          }}
          initialValues={provider}
          width="20%"
          // visible={visible}
          trigger={<Button type="link">{provider.providerName}</Button>}
        >
          <ProviderForm readonly />
        </ModalForm>
      ),
    }];
  } else {
    additionColumn = [
      {
        title: 'Hoa hồng cho PQV',
        dataIndex: 'kpi',
        hideInForm:true,
        hideInSearch: true,
        render: (_,{kpi}) => <>{formatCurrency(kpi.commissionFee)}</>
      },
      {
      title: 'Tải lên',
      dataIndex: 'file',
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
          <Upload
            action={`${API_URL}/qrcodes/voucher/${voucher.id}/import`}
            showUploadList={false}
            style={{ width: 250 }}
            accept="*/*"
            customRequest={uploadQRcode}
            {...defaultPropsUploadQRCODE}
          >
            <Button>Tải lên QRCode</Button>
          </Upload>
        );
      },
    }]
  }


  const columns = [
    {
      title: 'Xem Doanh Số Trong Khoảng (mặc định tháng này):',
      sorter: true,
      dataIndex: 'revenueInRange',
      hideInTable: true,
      hideInForm: true,
      valueType: 'dateTimeRange',
      search: {
        transform: (value) => ({ kpiStartDate: value[0], kpiEndDate: value[1] }),
      },
    },
    ...voucherColumn,
    ...additionColumn,
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
        "New": {
          text: 'New',
        },
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
        (<EditOutlined key={`edit ${voucher.id}`} onClick={() => history.push(`/vouchers/${voucher.id}`)}/>),
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
          (providerId && <Button
            type="primary"
            onClick={() => {
              history.push('/vouchers/create');
            }}
            icon={<PlusOutlined />}
            key={selectedRowKeys[0]}
            // hidden={!(providerId !== undefined && providerId !== null)}
          >
            Thêm Voucher
          </Button>)
        ]}
        tableAlertOptionRender={({ _, __, onCleanSelected }) => [
          // (!providerId && <AsyncButton
          //   isNeedConfirm={false}
          //   btnProps={{ type: 'primary' }}
          //   onClick={() => disableListVouchers(selectedRowKeys).then(onCleanSelected)}
          //   title={`Tạo combo từ ${selectedRowKeys.length} vouchers`}
          //   key={3}
          //   style={{marginRight: '20px'}}
          // />),
          (!providerId && <ModalForm
            title="Tạo combo"
            modalProps={{
              destroyOnClose: true,
            }}
            name="create-combo"
            key="create-combo"
            visible={comboVisible}
            onFinish={createComboHandler}
            submitter={{
              render: (props, defaultDoms) => {
                return [
                  // ...defaultDoms,
                  <Button
                  key="cancel"
                  onClick={() => {
                    setComboVisible(false);
                  }}
                >
                  Hủy
                </Button>,
                  <Button
                    key="ok"
                    type='primary'
                    onClick={() => {
                      try {
                        props.form.validateFields().then((values) => {
                          console.log(`values`, values);
                          createComboHandler(values, props, onCleanSelected);
                        });
                      } catch (error) {
                        console.log(`error`, error);
                      }
                    }}
                  >
                    Tạo Combo
                  </Button>,
                ];
              },
            }}
            trigger={<Button icon={<PlusOutlined type="primary"/>} onClick={() =>setComboVisible(true)}>Tạo combo</Button>}
          >
            <ComboForm createV/>
          </ModalForm>),
           (providerId && <ModalForm
            title="Tạo thêm QRcode"
            modalProps={{
              destroyOnClose: true,
            }}
            onValuesChange={console.log}
            onFinishFailed={console.log}
            name="create-qrcode"
            key="create-qrcode"
            initialValues={{voucherIds: selectedRowKeys}}
            onFinish={generateQRCodeListVouchers}
            submitter={{
              render: (props, defaultDoms) => {
                return [
                  // ...defaultDoms,
                  <Button
                    key="ok"
                    type='primary'
                    onClick={() => {
                      try {
                        props.form.validateFields().then((values) => {
                          console.log(`values`, values);
                          const normalizedData = {
                            voucherIds: selectedRowKeys,
                            quantity: values.quantity
                          }
                          generateQRCodeListVouchers(normalizedData);
                          props.reset();
                        });
                      } catch (error) {
                        console.log(`error`, error);
                      }
                    }}
                  >
                    Tạo
                  </Button>,
                ];
              },
            }}
            trigger={<Button icon={<PlusOutlined type="primary"/>}>Tạo thêm QR code</Button>}
          >
            <Row width={200}>
            <Col xs={24} md={24}>
            <FormItem
                label="Số lượng"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: 'Số lượng QRcode không hợp lệ (> 0)',
                    validator: (_, value) => {
                      return (!isNaN(value) && value.match(/^\d+$/) && parseInt(value) > 0)
                        ? Promise.resolve()
                        : Promise.reject();
                    },
                  },
                ]}
              >
                <Input placeholder="Nhập số lượng phát sinh thêm" />
              </FormItem>
            </Col>
            </Row>
          </ModalForm>),
            <AsyncButton
            isNeedConfirm={{
              title: 'Xác nhận tắt voucher',
              content: `Bạn có muốn chuyển ${selectedRowKeys.length} voucher sang trạng thái không sẵn sàng không`,
              okText: 'Xác nhận',
              cancelText: 'Hủy',
            }}
            btnProps={{ danger: true, type: 'link' }}
            onClick={() => disableListVouchers(selectedRowKeys).then(onCleanSelected).then(ref.current?.reload())}
            title={`Tắt ${selectedRowKeys.length} vouchers`}
            key={2}
            style={{marginRight: '20px'}}

          />,
          <AsyncButton
            isNeedConfirm={{
              title: 'Xác nhận bật voucher',
              content: `Bạn có muốn chuyển ${selectedRowKeys.length} voucher sang trạng thái sẵn sàng không`,
              okText: 'Xác nhận',
              cancelText: 'Hủy',
            }}
            btnProps={{ type: 'link' }}
            onClick={() => enableListVouchers(selectedRowKeys).then(onCleanSelected).then(ref.current?.reload())}
            title={`Bật ${selectedRowKeys.length} vouchers`}
            key={1}
            style={{marginRight: '20px'}}

          />,
        ]}
        rowKey="id"
        resource="vouchers/admin"
        actionRef={ref}
        isShowSelection={true}
      />
    </PageContainer>
  );
};

export default VouchersPage;
