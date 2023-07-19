import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { deleteService } from '@/services/service';
import { activationById, updateListVouchersStatus } from '@/services/voucher';
import {
  formatCurrency,
  getAppToken,
  getCurrentAssessorId,
  getCurrentRole,
  getCurrentSellerId,
  getCurrentStaffId
} from '@/utils/utils';
import { EditOutlined, EyeOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Col, Row } from 'antd';
import { Form, Tag, message } from 'antd/lib';
import { useRef, useState } from 'react';
import { getTimeDistance } from '../DashboardAnalysis/utils/utils';
import { columns } from './config';
import VehicleOwnerForm from '@/components/Form/v_VehicleOwnerForm/VehicleOwnerForm';
import { ModalForm } from '@ant-design/pro-form';
import AccountForm from '@/components/Form/AccountForm/AccountForm';
import { SelectAssessor } from '@/components/CommonSelect/CommonSelect';
import FormItem from 'antd/es/form/FormItem';
import { updateTransferorderById } from '@/services/v_transferorder';



const TOsPage = ({ history }) => {
  const ref = useRef();
  const [form] = Form.useForm();
  // const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const staffId = getCurrentStaffId();
  const assessorId = getCurrentAssessorId();
  const sellerId = getCurrentSellerId();
  const jwtToken = getAppToken();
  const role = getCurrentRole();



  let additionalParam = { orderBy: 'createAt-dec'};

  if(staffId) {additionalParam.staffId = staffId};
  if(assessorId) {additionalParam.assessorId = assessorId};
  if(sellerId) {additionalParam.sellerId = sellerId};

  const rowSelection = {
    onChange: setSelectedRowKeys,
    type: 'checkbox',
  };


  const dcolumns = [
    ...columns,
    {
      title: 'Nhân viên',
      sorter: true,
      dataIndex: 'staff',
      hideInForm: true,
      hideInTable: false,
      search: false,
      render: (_, { staff }) => staff ? (
        <ModalForm
          title="Nhân viên"
          name="upadte-account"
          key={`upadte-account_${staff.name}`}
          initialValues={staff.user}
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
          trigger={<Button type="link">{staff.name}</Button>}
        >
          <AccountForm updateMode/>
        </ModalForm>) : <></>
    },
    {
      title: 'Gửi Duyệt',
      hideInForm: true,
      hideInTable: (role !== 'Staff' && role !== 'Admin'),
      search: false,
      render: (_,  item ) => {
        if(item.approvalStatus == 'Open') {
          return (<>
          <Button type="primary" onClick={() =>updateTransferorderById(item.id, {...item, approvalStatus: 'PendingApproval'})
          .then(ref.current?.reload)
          .then(() => true)}>Gửi</Button>
          </>)
        }
        return <></>
      }
    },
    {
      title: 'Kiểm Duyệt',
      hideInForm: true,
      hideInTable: (role !== 'Admin'),
      search: false,
      render: (_,  item ) => {
        if(item.approvalStatus == 'PendingApproval') {
          return (<>
          <Button style={{marginRight: 20}} onClick={() =>updateTransferorderById(item.id, {...item, approvalStatus: 'Reject'})
          .then(ref.current?.reload)
          .then(() => true)}>Từ chối</Button>
          <Button type="primary" onClick={() =>updateTransferorderById(item.id, {...item, approvalStatus: 'Approved'})
          .then(ref.current?.reload)
          .then(() => true)}>Chấp nhận</Button>
          </>)
        }
        return <></>
      }
    },
    {
      title: 'Chi tiết',
      search: false,
      render: (_, item) =>
        (
        <EyeOutlined key={`edit ${item.id}`} onClick={() => history.push(`/transferorders/${item.id}`)} style={{marginLeft: 20}}/>
       ),
    }
  ];

  return (
    <PageContainer>
      <ResoTable
        additionParams={additionalParam}
        columns={dcolumns}
        scroll={{
          x: 650,
        }}
        rowSelection={rowSelection}
        toolBarRender={() => [
            <Button
            type="primary"
            onClick={() => {
              history.push('/transferorders/create_ir');
            }}
            icon={<PlusOutlined />}
            key={selectedRowKeys[0]}
          >
            Tạo phiếu nhập kho
          </Button>,
          <Button
          type="primary"
          onClick={() => {
            history.push('/transferorders/create_so');
          }}
          icon={<PlusOutlined />}
          key={selectedRowKeys[0]}
        >
          Tạo phiếu xuất kho
        </Button>
        ]}
        rowKey="id"
        resource="transferorders"
        actionRef={ref}
        isShowSelection={false}
      />
    </PageContainer>
  );
};

export default TOsPage;
