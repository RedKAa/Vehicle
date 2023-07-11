import AsyncButton from '@/components/AsyncButton';
import AccountForm from '@/components/Form/AccountForm/AccountForm';
import ProviderForm from '@/components/Form/ProviderForm/ProviderForm';
import ResoTable from '@/components/ResoTable/ResoTable';
import { updateAccount } from '@/services/account';
import { updateSeller } from '@/services/seller';
import { convertDateToStr } from '@/utils/utils';
import { ModalForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Switch } from 'antd';
import { useRef, useState } from 'react';
import { getTimeDistance } from '../DashboardAnalysis/utils/utils';
import { sellersColumn } from './config';
import StaffForm from '@/components/Form/AccountForm/StaffForm';

const SellersPage = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = React.useState(false);

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
  };

  const activationHandler = (data) => {
    Promise.resolve(updateSeller(data.id, { ...data })).then(() => {
      ref.current?.reload();
    });
  };


  const deleteSellerHandler = () => {
    return updateSeller(selectedRows[0], {
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
    ...sellersColumn,
    {
      title: 'Tài khoản',
      sorter: true,
      dataIndex: 'user',
      hideInForm: true,
      search: false,
      render: (_, { user }) => (
        <ModalForm
          title="Cập nhật tài khoản"
          name="upadte-account"
          key={`upadte-account_${user.userName}`}
          initialValues={user}
          onFinish={(values) =>
            updateAccount(user.id, values)
              .then(ref.current?.reload)
              .then(() => true)
          }
          trigger={<Button type="link">{user.userName}</Button>}
        >
          <AccountForm updateMode providerMode/>
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
      render: (_, seller) => 
        (<ModalForm
          title="Cập nhật nhân viên bán hàng"
          modalProps={{
            destroyOnClose: true,
          }}
          name="upadte-seller"
          key={`upadte-provider${seller.id}`}
          initialValues={seller}
          onFinish={(values) =>
            updateSeller(seller.id, values)
              .then(ref.current?.reload)
              .then(() => true)
          }
          trigger={<Button type="link">Cập nhật</Button>}
        >
          <StaffForm />
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
              title: 'Xác nhận xóa nhân viên bán hàng',
              content: 'Bạn có muốn xóa nhân viên bán hàng này không',
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            onClick={() => deleteSellerHandler().then(onCleanSelected)}
            title={`Xóa ${selectedRows.length} nhân viên bán hàng`}
            key={1}
          />,
        ]}
        columns={columns}
        scroll={{
          x: 650,
        }}
        rowKey="id"
        resource="sellers"
        actionRef={ref}
        isShowSelection={false}
      />
    </PageContainer>
  );
};

export default SellersPage;
