import AsyncButton from '@/components/AsyncButton';
import AccountForm from '@/components/Form/AccountForm/AccountForm';
import ResoTable from '@/components/ResoTable/ResoTable';
import { updateAccount } from '@/services/account';
import { updateAssessor } from '@/services/v_assessor';
import { convertDateToStr } from '@/utils/utils';
import { ModalForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Switch } from 'antd';
import { useRef, useState } from 'react';
import { getTimeDistance } from '../DashboardAnalysis/utils/utils';
import { columns } from './config';
import StaffForm from '@/components/Form/AccountForm/StaffForm';

const AssessorsPage = ({ history }) => {
  const ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = React.useState(false);

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
    type: 'radio',
  };

  const activationHandler = (data) => {
    Promise.resolve(updateAssessor(data.id, { ...data })).then(() => {
      ref.current?.reload();
    });
  };


  const deleteAssessorHandler = () => {
    return updateAssessor(selectedRows[0], {
      status: 'Disable',
    })
      .then(ref.current?.reload)
      .then(() => true);
  };

  const dayFilter = getTimeDistance('month');

  let kpiStartDate = convertDateToStr(dayFilter[0], 'MM/DD/YYYY HH:mm');
  let kpiEndDate = convertDateToStr(dayFilter[1], 'MM/DD/YYYY HH:mm');
  let additionalParam = { orderBy: 'createAt-dec', kpiStartDate, kpiEndDate};

  const dcolumns = [
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
    ...columns,
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
          <AccountForm updateMode assessorMode/>
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
      render: (_, assessor) => 
        (<ModalForm
          title="Cập nhật thẩm định viên"
          modalProps={{
            destroyOnClose: true,
          }}
          name="upadte-assessor"
          key={`upadte-assessor${assessor.id}`}
          initialValues={assessor}
          onFinish={(values) =>
            updateAssessor(assessor.id, values)
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
              title: 'Xác nhận xóa thẩm định viên',
              content: 'Bạn có muốn xóa thẩm định viên này không',
              okText: 'Xác nhận',
              cancelText: 'Không',
            }}
            btnProps={{ danger: true, type: 'link' }}
            onClick={() => deleteAssessorHandler().then(onCleanSelected)}
            title={`Xóa ${selectedRows.length} thẩm định viên`}
            key={1}
          />,
        ]}
        columns={dcolumns}
        scroll={{
          x: 650,
        }}
        rowKey="id"
        resource="assessors"
        actionRef={ref}
        isShowSelection={false}
      />
    </PageContainer>
  );
};

export default AssessorsPage;
