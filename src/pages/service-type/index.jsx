import AsyncButton from '@/components/AsyncButton';
import ServiceTypeForm from '@/components/Form/ServiceTypeForm/ServiceTypeForm';
import ResoTable from '@/components/ResoTable/ResoTable';
import { createServiceType, deleteServiceType, updateServiceType, activationById } from '@/services/servicetype';
import { convertDateToStr, formatCurrency, getCurrentProviderId } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import { getTimeDistance } from '../DashboardAnalysis/utils/utils';
import { serviceTypeColumn } from './config';


const ServicesPage = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = React.useState(false);
  // const providerId = getCurrentProviderId();


  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
  };

  const activationHandler = (data) => {
    Promise.resolve(activationById(data.id, { ...data })).then(() => {
      ref.current?.reload();
    });
  };

  const deleteServiceTypeHandler = () => {
    return deleteServiceType(selectedRows[0]).then(() => ref.current?.reload());
  };

  const createHandler = async (values) => {
    console.log(`values`, values);
    const res = await createServiceType(values);
    ref.current?.reload();
    return true;
  };

  // let additionColumn = [];
  // if(!providerId) {
  //   additionColumn = [
  //     // {
  //     //   title: 'Hoa hồng cho CTV',
  //     //   dataIndex: 'kpi',
  //     //   hideInForm:true,
  //     //   hideInSearch: true,
  //     //   render: (_,{kpi}) => <>{formatCurrency(kpi.sellerCommissionFee)}</>
  //     // },
  //     {
  //       title: 'Số lượng voucher đã bán',
  //       dataIndex: 'kpi',
  //       hideInForm:true,
  //       hideInSearch: true,
  //       render: (_,{kpi}) => <>{kpi.qrCodeSold}</>
  //     },
  //     {
  //       title: 'Hoa hồng nhận được',
  //       dataIndex: 'kpi',
  //       hideInForm:true,
  //       hideInSearch: true,
  //       render: (_,{kpi}) => <>{formatCurrency(kpi.commissionFee)}</>
  //     },
  //   ];
  // }

  const dayFilter = getTimeDistance('month');

  let kpiStartDate = convertDateToStr(dayFilter[0], 'MM/DD/YYYY HH:mm');
  let kpiEndDate = convertDateToStr(dayFilter[1], 'MM/DD/YYYY HH:mm');
  let additionalParam = { orderBy: 'createAt-dec', kpiStartDate, kpiEndDate};

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
    ...serviceTypeColumn,
    // ...additionColumn,
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
      render: (_, servicetype) => {
        return (
          <Switch
            checked={servicetype.status == 'Active' ? true : false}
            onChange={(bool) => {
              let status = bool ? 'Active' : 'Disable';
              let id = servicetype.id;
              activationHandler({id, status})
            }}
          />
        );
      },
    },
    {
      title: 'Hành động',
      search: false,
      render: (_, servicetype) =>
        (<ModalForm
          title="Cập nhật loại dịch vụ"
          modalProps={{
            destroyOnClose: true,
          }}
          width="500px"
          name="upadte-servicetype"
          key={`upadte-servicetype${servicetype.id}`}
          initialValues={servicetype}
          onFinish={(values) =>
            updateServiceType(servicetype.id, values)
              .then(ref.current?.reload)
              .then(() => true)
          }
          trigger={<Button type="link">Cập nhật</Button>}
        >
          <ServiceTypeForm update/>
        </ModalForm>),
    }
  ];

  return (
    <PageContainer>
      <ResoTable
        additionParams={additionalParam}
        rowSelection={rowSelection}
        tableAlertOptionRender={({ _, __, onCleanSelected }) => [
          <AsyncButton
            isNeedConfirm={{
              title: 'Xác nhận xóa dịch vụ',
              content: 'Bạn có muốn xóa loại dịch vụ này không',
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            onClick={() => deleteServiceTypeHandler().then(onCleanSelected)}
            title={`Xóa ${selectedRows.length} loại dịch vụ`}
            key={selectedRows[0]}
          />,
        ]}
        columns={columns}
        scroll={{
          x: 650,
        }}
        toolBarRender={() => [
          <ModalForm
            title="Tạo loại dịch vụ"
            modalProps={{
              destroyOnClose: true,
            }}
            onValuesChange={console.log}
            onFinishFailed={console.log}
            name="create-service"
            key="create-service"
            onFinish={createHandler}
            submitter={{
              render: (props, defaultDoms) => {
                return [
                  // ...defaultDoms,
                  <Button
                    key="ok"
                    onClick={() => {
                      try {
                        props.form.validateFields().then((values) => {
                          console.log(`values`, values);
                          createHandler(values);
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
            trigger={<Button icon={<PlusOutlined />} type="primary">Thêm dịch vụ</Button>}
          >
            <ServiceTypeForm />
          </ModalForm>
        ]}
        rowKey="id"
        resource="servicetypes/admin"
        actionRef={ref}
        isShowSelection={false}
      />
    </PageContainer>
  );
};

export default ServicesPage;
