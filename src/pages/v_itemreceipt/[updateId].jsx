import UserCard, { VehicleCard } from '@/components/Card';
import { getItemreceiptById, getTransactionLineByTid, updateItemreceiptById } from '@/services/v_itemreceipt';
import { getCurrentAdminId } from '@/utils/utils';
import { ClockCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from '@umijs/hooks';
import {
  Affix,
  Button, Card,
  Col,
  Form,
  Image,
  List,
  Row,
  Spin,
  Switch,
  Tag,
  Typography
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useHistory } from 'umi';


const FormItem = Form.Item;

const UpdateItemreceipt = (props) => {
  const [form] = Form.useForm();
  const {
    match: {
      params: { updateId },
    },
  } = props;

  const [updateError, setError] = useState(null);
  const [fullData, setFullData] = useState(null);
  const adminId = getCurrentAdminId();
  const irs = {
    VehicleOwnerOpen: {
      text: 'Khởi tạo',
    },
    WaitingForAssessment: {
      text: 'Đợi thẩm định',
    },
    Submit: {
      text: 'Đợi kiểm duyệt',
    },
    Reject: {
      text: 'Không được duyệt',
    },
    Approved: {
      text: 'Đã duyệt',
    },
  }

  const history = useHistory();

  const { data: idata, error: ierror, loading: iloading} = useRequest(() => getItemreceiptById(updateId), {
    formatResult: (res) => {
      return res;
    },
  });

  useEffect(() => {
    if (idata !== undefined) {
      let normalizedData = {
        ...idata
      }
      console.log('datafull',normalizedData)
      normalizedData.status = normalizedData.status == 'Active' ? true: false;
      setFullData({ ...normalizedData });
    }
  },[idata])


  return (
    <PageContainer>
      <Spin spinning={!fullData} style={{ width: '100%' }}>
      <Card bordered={false}>
        <Row justify="space-between">
          <Typography.Title level={3}>Chi tiết phiếu nhập xe #{fullData?.id}</Typography.Title>
          <Affix offsetTop={5}>
            <>
             <Button
              type="link"
              onClick={() => {
                history.push('/itemreceipts/');
              }}
              >
                Quay lại
              </Button>
              {(adminId && fullData?.itemReceiptStatus =='Submit') && <><Button
              type="secondary"
              onClick={() =>updateItemreceiptById(fullData.id, {...fullData, itemReceiptStatus: 'Reject', status:fullData.status ? 'Active': 'Disable'})
              .then(() => history.push('/itemreceipts/'))}
              >
                Từ chối
              </Button>
              <Button
              type="primary"
              onClick={() =>updateItemreceiptById(fullData.id, {...fullData, itemReceiptStatus: 'Approved',status:fullData.status ? 'Active': 'Disable'})
              .then(() => history.push('/itemreceipts/'))}
              >
                Duyệt
              </Button>
              </>
              }
            </>
          </Affix>
        </Row>
        {fullData && <>
        <Row gutter={24} style={{marginBottom: '20px'}}>
            <Col xs={6}>Trạng thái phiếu nhập &nbsp;
              <Tag color="green">{irs[`${fullData.itemReceiptStatus}`].text}</Tag>
            </Col>
            <Col xs={6}>
              Kích hoạt: &nbsp;
              <Switch  checked={fullData.status}/>
            </Col>
            <Col xs={6}>
              Ngày tạo &nbsp;
              <Tag icon={<ClockCircleOutlined />} color="green">
              {moment(fullData.createAt).format('HH:mm DD-MM-YYYY')}
              </Tag>
            </Col>
            <Col xs={6}>
              Ngày cập nhật &nbsp;
              <Tag icon={<ClockCircleOutlined />} color="green">
              {fullData.updateAt ? moment(fullData.updateAt).format('HH:mm DD-MM-YYYY') : ''}
            </Tag>
            </Col>
        </Row>
      <hr/>
        <Row gutter={24}>
        <Col xs={6}>
         Nhân Viên
         <UserCard user={fullData.staff?.user}/>
        </Col>
        <Col xs={6}>
          Chủ sở hữu
          <UserCard user={fullData.vehicleOwner} showPhone/>
        </Col>
        <Col xs={6}>
         Thẩm định viên
         <UserCard user={fullData.assessor?.user}/>
        </Col>
        <Col xs={6}>
         Kiểm duyệt
         <UserCard user={fullData.approver}/>
        </Col>
        </Row>
      <hr/>
        <Row gutter={24}>
        <Col xs={4}>
          <Image width={150} src={fullData.img}/>
        </Col>
        <Col xs={20}>
          <p>Yêu cầu: {fullData.request}</p>
        </Col>
        </Row>
        <hr/>
        <Row gutter={24}>
        <Col xs={24}>
          <List
            dataSource={fullData.transaction?.transactionLines.map(t => t.vehicle ? {...t.vehicle, IRamount: t.amount} : {})}
            renderItem={(vehicle) => (
              <List.Item key={vehicle.id}>
                <VehicleCard vehicle={vehicle}/>
              </List.Item>
            )}
          />
        </Col>
        </Row>
          </>}
      </Card>
    </Spin>
    </PageContainer>
  );
};

export default UpdateItemreceipt;
