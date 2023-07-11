import AsyncButton from '@/components/AsyncButton';
import ProviderForm from '@/components/Form/ProviderForm/ProviderForm';
import ServiceForm from '@/components/Form/ServiceForm/ServiceForm';
import ResoTable from '@/components/ResoTable/ResoTable';
import { createService, deleteService, updateService, activationById } from '@/services/service';
import { convertDateToStr, formatCurrency, getCurrentProviderId } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import { getTimeDistance } from '../DashboardAnalysis/utils/utils';
import { serviceColumn } from './config';


const ServicesPage = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const providerId = getCurrentProviderId();

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
  };

  const deleteServiceHandler = () => {
    return deleteService(selectedRows[0]).then(() => ref.current?.reload());
  };

  const createHandler = async (values) => {
    console.log(`values`, values);
    const res = await createService(values);
    ref.current?.reload();
    return true;
  };

  const activationHandler = (data) => {
    Promise.resolve(activationById(data.id, { ...data })).then(() => {
      ref.current?.reload();
    });
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
        title: 'Doanh thu nhà cung cấp',
        dataIndex: 'kpi',
        hideInForm:true,
        hideInSearch: true,
        render: (_,{kpi}) => <>{formatCurrency(kpi.revenue)}</>
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
        title: 'Doanh thu',
        dataIndex: 'kpi',
        hideInForm:true,
        hideInSearch: true,
        render: (_,{kpi}) => <>{formatCurrency(kpi.revenue)}</>
      },
      {
        title: 'Hoa hồng cho PQV',
        dataIndex: 'kpi',
        hideInForm:true,
        hideInSearch: true,
        render: (_,{kpi}) => <>{formatCurrency(kpi.commissionFee)}</>
      },
    ]
  }

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
    ...serviceColumn,
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
      render: (_, service) => {
        return (
          <Switch
            checked={service.status == 'Active' ? true : false}
            onChange={(bool) => {
              let status = bool ? 'Active' : 'Disable';
              let id = service.id;
              activationHandler({id, status})
            }}
          />
        );
      },
    },
    {
      title: 'Hành động',
      search: false,
      render: (_, service) => 
        (<ModalForm
          title="Cập nhật dịch vụ"
          modalProps={{
            destroyOnClose: true,
          }}
          width="500px"
          name="upadte-service"
          key={`upadte-service${service.id}`}
          initialValues={service}
          onFinish={(values) => {
            let normalizedData = {
              ...values,
              providerId: getCurrentProviderId()
            }
            updateService(service.id, normalizedData)
              .then(ref.current?.reload)
              .then(() => true)
            }
          }
          trigger={<Button type="link">Cập nhật</Button>}
        >
          <ServiceForm update/>
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
              content: 'Bạn có muốn xóa dịch vụ này không',
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            onClick={() => deleteServiceHandler().then(onCleanSelected)}
            title={`Xóa ${selectedRows.length} dịch vụ`}
            key={selectedRows[0]}
          />,
        ]}
        columns={columns}
        scroll={{
          x: 650,
        }}
        toolBarRender={() => [
          <ModalForm
            title="Tạo dịch vụ"
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
                          let normalizedData = {
                            ...values,
                            providerId: getCurrentProviderId()
                          }
                          createHandler(normalizedData);
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
            <ServiceForm admin={!providerId}/>
          </ModalForm>
        ]}
        rowKey="id"
        resource="services/admin"
        actionRef={ref}
        isShowSelection={false}
      />
    </PageContainer>
  );
};

export default ServicesPage;
