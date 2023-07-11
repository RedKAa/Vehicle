import AsyncButton from '@/components/AsyncButton';
import AccountForm from '@/components/Form/AccountForm/AccountForm';
import ResoTable from '@/components/ResoTable/ResoTable';
import { updateAccount } from '@/services/account';
import { convertDateToStr } from '@/utils/utils';
import { ModalForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Switch } from 'antd';
import { useRef, useState } from 'react';
import { getTimeDistance } from '../DashboardAnalysis/utils/utils';
import { staffsColumn } from './config';
import StaffForm from '@/components/Form/AccountForm/StaffForm';
import { updateStaff } from '@/services/v_staff';

const StaffsPage = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = React.useState(false);

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
  };

  const activationHandler = (data) => {
    Promise.resolve(updateStaff(data.id, { ...data })).then(() => {
      ref.current?.reload();
    });
  };


  const deleteStaffHandler = () => {
    return updateStaff(selectedRows[0], {
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
    ...staffsColumn,
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
          key={`upadte-account_${user?.userName}`}
          initialValues={user}
          onFinish={(values) =>
            updateAccount(user.id, values)
              .then(ref.current?.reload)
              .then(() => true)
          }
          trigger={<Button type="link">{user?.userName}</Button>}
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
      render: (_, staff) =>
        (<ModalForm
          title="Cập nhật nhân viên"
          modalProps={{
            destroyOnClose: true,
          }}
          name="upadte-staff"
          key={`upadte-provider${staff.id}`}
          initialValues={staff}
          onFinish={(values) =>
            updateStaff(staff.id, values)
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
              title: 'Xác nhận xóa nhân viên',
              content: 'Bạn có muốn xóa nhân viên này không',
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            onClick={() => deleteStaffHandler().then(onCleanSelected)}
            title={`Xóa ${selectedRows.length} nhân viên`}
            key={1}
          />,
        ]}
        columns={columns}
        scroll={{
          x: 650,
        }}
        rowKey="id"
        resource="staffs"
        actionRef={ref}
        isShowSelection={false}
      />
    </PageContainer>
  );
};

export default StaffsPage;
