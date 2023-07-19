import AsyncButton from '@/components/AsyncButton';
import ResoTable from '@/components/ResoTable/ResoTable';
import { deleteService } from '@/services/service';
import { activationById, updateListVouchersStatus } from '@/services/voucher';
import {
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
import { updateItemreceiptById } from '@/services/v_itemreceipt';



const IRsPage = ({ history }) => {
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
      title: 'Chủ xe',
      sorter: true,
      dataIndex: 'vehicleOwner',
      hideInForm: true,
      hideInTable: false,
      search: false,
      render: (_, { vehicleOwner }) => vehicleOwner ? (
        <ModalForm
          title="Chủ xe"
          name="upadte-account"
          key={`upadte-account_${vehicleOwner.name}`}
          initialValues={vehicleOwner}
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
          trigger={<Button type="link">{vehicleOwner.name}</Button>}
        >
          <VehicleOwnerForm readonly/>
        </ModalForm>) : <></>
    },
    {
      title: 'Thẩm định viên',
      sorter: true,
      dataIndex: 'assessor',
      hideInForm: true,
      hideInTable: false,
      search: false,
      render: (_, { assessor }) => assessor ? (
        <ModalForm
          title="Thẩm định viên"
          name="upadte-account"
          key={`upadte-account_${assessor.name}`}
          initialValues={assessor.user}
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
          trigger={<Button type="link">{assessor.name}</Button>}
        >
          <AccountForm updateMode/>
        </ModalForm>) : <></>
    },
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
      title: 'Hành động',
      hideInForm: true,
      hideInTable: (role !== 'Staff' && role !== 'Admin'),
      search: false,
      render: (_,  item ) =>
        <ModalForm
        title="Cập nhật thẩm định viên"
        modalProps={{
          destroyOnClose: true,
        }}
        name="upadte"
        key={`upadte_${item?.id}`}
        initialValues={item.assessor}
        onFinish={(values) =>
          updateItemreceiptById(item.id, {...item,assessorId: values.id})
            .then(ref.current?.reload)
            .then(() => true)
        }
        trigger={<Button type="link">Cập nhật TĐV</Button>}
        >
        <Row gutter={24}>
          <Col xs={24}>
            <FormItem
              label="Thẩm định viên"
              name="id"
              rules={[{ required: true, message: 'Vui lòng chọn thẩm định viên' }]}
            >
              <SelectAssessor
                placeholder="Tìm theo khu vực..."
                fetchOnFirst
                style={{
                  width: '100%',
                }}
              />
            </FormItem>
          </Col>
          </Row>
        </ModalForm>
    },
    {
      title: 'Hành động',
      hideInForm: true,
      hideInTable: (role !== 'Assessor'),
      search: false,
      render: (_,  item ) => {
        if(item.itemReceiptStatus == 'WaitingForAssessment') {
          return (<>
          <Button type="primary" onClick={() =>updateItemreceiptById(item.id, {...item, itemReceiptStatus: 'Submit'})
          .then(ref.current?.reload)
          .then(() => true)}>Gửi duyệt</Button>
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
        if(item.itemReceiptStatus == 'Submit') {
          return (<>
          <Button style={{marginRight: 20}} onClick={() =>updateItemreceiptById(item.id, {...item, itemReceiptStatus: 'Reject'})
          .then(ref.current?.reload)
          .then(() => true)}>Từ chối</Button>
          <Button type="primary" onClick={() =>updateItemreceiptById(item.id, {...item, itemReceiptStatus: 'Approved'})
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
        <EyeOutlined key={`edit ${item.id}`} onClick={() => history.push(`/itemreceipts/${item.id}`)} style={{marginLeft: 20}}/>
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
              history.push('/itemreceipts/create');
            }}
            icon={<PlusOutlined />}
            key={selectedRowKeys[0]}
          >
            Tạo mới
          </Button>
        ]}
        rowKey="id"
        resource="itemreceipts"
        actionRef={ref}
        isShowSelection={false}
      />
    </PageContainer>
  );
};

export default IRsPage;
