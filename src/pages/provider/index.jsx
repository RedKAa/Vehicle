import AsyncButton from '@/components/AsyncButton';
import AccountForm from '@/components/Form/AccountForm/AccountForm';
import ProviderForm from '@/components/Form/ProviderForm/ProviderForm';
import SellerForm from '@/components/Form/SellerForm/SellerForm';
import ResoTable from '@/components/ResoTable/ResoTable';
import { updateAccount } from '@/services/account';
import { updateProvider } from '@/services/provider';
import { convertDateToStr } from '@/utils/utils';
import { ModalForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Switch } from 'antd';
import { useRef, useState } from 'react';
import { getTimeDistance } from '../DashboardAnalysis/utils/utils';
import { providersColumn } from './config';

const ProvidersPage = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = React.useState(false);

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
  };

  const activationHandler = (data) => {
    Promise.resolve(updateProvider(data.id, { ...data })).then(() => {
      ref.current?.reload();
    });
  };

  const deleteProviderHandler = () => {
    return updateProvider(selectedRows[0], {
      providerName: null,
      taxCode: null,
      address: null,
      status: 'Disable',
    })
      .then(ref.current?.reload)
      .then(() => true);
  };

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
    ...providersColumn,
    {
      title: 'Tài khoản',
      sorter: true,
      dataIndex: 'userInfo',
      hideInForm: true,
      search: false,
      render: (_, { userInfo }) => (
        <ModalForm
          title="Cập nhật tài khoản"
          name="upadte-account"
          key={`upadte-account_${userInfo.userName}`}
          initialValues={userInfo}
          onFinish={(values) =>
            updateAccount(userInfo.id, values)
              .then(ref.current?.reload)
              .then(() => true)
          }
          trigger={<Button type="link">{userInfo.userName}</Button>}
        >
          <AccountForm updateMode providerMode />
        </ModalForm>
      ),
    },
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
      render: (_, data) => {
        return (
          <Switch
            checked={data.status == 'Active' ? true : false}
            onChange={(bool) => {
              data.status = bool ? 'Active' : 'Disable';
              activationHandler(data);
            }}
          />
        );
      },
    },
    {
      title: 'Hành động',
      search: false,
      render: (_, provider) => 
        (<ModalForm
          title="Cập nhật nhà cung cấp"
          modalProps={{
            destroyOnClose: true,
          }}
          name="upadte-provider"
          key={`upadte-provider${provider.id}`}
          initialValues={provider}
          onFinish={(values) =>
            updateProvider(provider.id, values)
              .then(ref.current?.reload)
              .then(() => true)
          }
          trigger={<Button type="link">Cập nhật</Button>}
        >
          <ProviderForm />
        </ModalForm>),
    },
  ];

  return (
    <PageContainer>
      <ResoTable
        additionParams={additionalParam}
        rowSelection={rowSelection}
        tableAlertOptionRender={({ _, __, onCleanSelected }) => [
          <AsyncButton
            isNeedConfirm={{
              title: 'Xác nhận xóa nhà cung cấp',
              content: 'Bạn có muốn xóa nhà cung cấp này không',
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            onClick={() => deleteProviderHandler().then(onCleanSelected)}
            title={`Xóa ${selectedRows.length} nhà cung cấp`}
            key={1}
          />,
        ]}
        columns={columns}
        scroll={{
          x: 650,
        }}
        rowKey="id"
        resource="providers/admin"
        actionRef={ref}
        isShowSelection={false}
      />
    </PageContainer>
  );
};

export default ProvidersPage;
