import UserCard, { VehicleCard } from '@/components/Card';
import { getSaleorderById, getTransactionLineByTid, updateSaleorderById } from '@/services/v_saleorder';
import { getCurrentAdminId } from '@/utils/utils';
import { ClockCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from '@umijs/hooks';
import {
  Affix,
  Button, Card,
  Col,
  Form,
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

const UpdateSaleorder = (props) => {
  const [form] = Form.useForm();
  const {
    match: {
      params: { updateId },
    },
  } = props;

  const [updateError, setError] = useState(null);
  const [fullData, setFullData] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  const adminId = getCurrentAdminId();
  const sos = {
    Open: {
      text: 'Khởi tạo',
    },
    PendingApproval: {
      text: 'Đợi duyệt',
    },
    Approved: {
      text: 'Đã duyệt',
    },
    Reject: {
      text: 'Không được duyệt',
    },
  }

  const history = useHistory();

  const { data: idata, error: ierror, loading: iloading} = useRequest(() => getSaleorderById(updateId), {
    formatResult: (res) => {
      return res;
    },
  });

  useEffect(() => {
    if (idata !== undefined) {
      let normalizedData = {
        ...idata,
      }
      console.log('datafull',normalizedData)
      normalizedData.status = normalizedData.status == 'Active' ? true: false;
      normalizedData.approvalStatus = sos[`${normalizedData.approvalStatus}`].text;


      setFullData({ ...normalizedData });
    }
  },[idata])


  return (
    <PageContainer>
      <Spin spinning={!fullData} style={{ width: '100%' }}>
      <Card bordered={false}>
        <Row justify="space-between">
          <Typography.Title level={3}>Chi tiết Phiếu bán hàng</Typography.Title>
          <Affix offsetTop={5}>
            <>
             <Button
              type="link"
              onClick={() => {
                history.push('/saleorders/');
              }}
              >
                Quay lại
              </Button>
              {(adminId && fullData?.approvalStatus =='PendingApproval') &&<><Button
              type="secondary"
              onClick={() => {
                updateSaleorderById(fullData.id, {...fullData, approvalStatus: 'Reject',status:fullData.status ? 'Active': 'Disable'}).then(() => {
                  history.push('/saleorders/');
                })
              }}
              >
                Từ chối
              </Button>
              <Button
              type="primary"
              onClick={() => {
                updateSaleorderById(fullData.id, {...fullData, approvalStatus: 'Approved',status:fullData.status ? 'Active': 'Disable'}).then(() => {
                  history.push('/saleorders/');
                })
              }}
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
            <Col xs={6}>Trạng thái phiếu bán hàng &nbsp;
              <Tag color="green">{fullData.approvalStatus}</Tag>
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
         Nhân Viên bán hàng
         <UserCard user={fullData.seller?.user}/>
        </Col>
        <Col xs={6}>
          Khách hàng
          <UserCard user={fullData.customer} showPhone/>
        </Col>
        <Col xs={6}>
         Kiểm duyệt
         <UserCard user={fullData.approver}/>
        </Col>
        </Row>
      <hr/>
        <Row gutter={24}>
        <Col xs={24}>
          <List
            dataSource={fullData.transaction?.transactionLines.map(t => t.vehicle ? {...t.vehicle, SOamount: t.amount} : {})}
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

export default UpdateSaleorder;
