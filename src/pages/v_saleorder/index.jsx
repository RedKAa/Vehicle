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
import { updateSaleorderById } from '@/services/v_saleorder';



const SOsPage = ({ history }) => {
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
      title: 'Thành tiền',
      sorter: true,
      dataIndex: 'transaction',
      hideInForm: true,
      hideInTable: false,
      search: false,
      render: (_, { transaction }) => <Tag>{formatCurrency(transaction?.totalAmount)}</Tag>
    },
    {
      title: 'Khách hàng',
      sorter: true,
      dataIndex: 'customer',
      hideInForm: true,
      hideInTable: false,
      search: false,
      render: (_, { customer }) => customer ? (
        <ModalForm
          title="Khách hàng"
          name="upadte-account"
          key={`upadte-account_${customer.name}`}
          initialValues={customer}
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
          trigger={<Button type="link">{customer.name}</Button>}
        >
          <VehicleOwnerForm readonly/>
        </ModalForm>) : <></>
    },
    {
      title: 'Nhân viên bán hàng',
      sorter: true,
      dataIndex: 'seller',
      hideInForm: true,
      hideInTable: (role !== 'Admin'),
      search: false,
      render: (_, { seller }) => seller ? (
        <ModalForm
          title="Nhân viên bán hàng"
          name="upadte-account"
          key={`upadte-account_${seller.name}`}
          initialValues={seller.user}
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
          trigger={<Button type="link">{seller.name}</Button>}
        >
          <AccountForm updateMode/>
        </ModalForm>) : <></>
    },
    {
      title: 'Gửi Duyệt',
      hideInForm: true,
      hideInTable: (role !== 'Seller' && role !== 'Admin'),
      search: false,
      render: (_,  item ) => {
        if(item.approvalStatus == 'Open') {
          return (<>
          <Button type="primary" onClick={() =>updateSaleorderById(item.id, {...item, approvalStatus: 'PendingApproval'})
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
          <Button style={{marginRight: 20}} onClick={() =>updateSaleorderById(item.id, {...item, approvalStatus: 'Reject'})
          .then(ref.current?.reload)
          .then(() => true)}>Từ chối</Button>
          <Button type="primary" onClick={() =>updateSaleorderById(item.id, {...item, approvalStatus: 'Approved'})
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
        <EyeOutlined key={`edit ${item.id}`} onClick={() => history.push(`/saleorders/${item.id}`)} style={{marginLeft: 20}}/>
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
              history.push('/saleorders/create');
            }}
            icon={<PlusOutlined />}
            key={selectedRowKeys[0]}
          >
            Tạo mới
          </Button>
        ]}
        rowKey="id"
        resource="saleorders"
        actionRef={ref}
        isShowSelection={false}
      />
    </PageContainer>
  );
};

export default SOsPage;
