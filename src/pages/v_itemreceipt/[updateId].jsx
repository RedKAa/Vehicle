import AsyncButton from '@/components/AsyncButton';
import ItemreceiptForm from '@/components/Form/v_ItemreceiptForm/ItemreceiptForm';
import Select from '@/locales/vi-VN/select';
import { getItemreceiptById, getTransactionLineByTid } from '@/services/v_itemreceipt';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from '@umijs/hooks';
import {
  Affix,
  Alert, Button, Card,
  Col,
  DatePicker,
  Form,
  Row,
  Spin,
  Switch,
  Tag,
  Typography
} from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from 'umi';
const { RangePicker } = DatePicker;


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
  const { data: tdata, error: terror, loading: tloading } = useRequest(() => getTransactionLineByTid(updateId), {
    formatResult: (res) => {
      return res.data;
    },
  });

  useEffect(() => {
    if (idata !== undefined && tdata !== undefined) {
      let normalizedData = {
        ...idata,
        tdata : [...tdata],
      }
      console.log('datafull',normalizedData)
      normalizedData.status = normalizedData.status == 'Active' ? true: false;
      normalizedData.itemReceiptStatus = irs[`${normalizedData.itemReceiptStatus}`].text;



      setFullData({ ...normalizedData });
    }
  },[idata, tdata])

  return (
    <PageContainer>
      <Spin spinning={!fullData} style={{ width: '100%' }}>
      <Card bordered={false}>
        <Row justify="space-between">
          <Typography.Title level={3}>Chi tiết Phiếu nhập</Typography.Title>
          <Affix offsetTop={5}>
            <Button
            type="primary"
            onClick={() => {
              history.push('/itemreceipts/');
            }}
            >
              Quay lại
            </Button>
          </Affix>
        </Row>
        {fullData && <>
        <Row gutter={24}>
            <Col xs={8}>Trạng thái phiếu nhập: &nbsp;<Tag>{fullData.itemReceiptStatus}</Tag></Col>
            <Col xs={16}>
              Kích hoạt: &nbsp;
              <Switch  checked={fullData.status}/>
            </Col>
        </Row>
        <Row gutter={24}>
        <Col xs={12}>
          Chủ sở hữu
        </Col>
        <Col xs={12}>
         Thẩm định viên
        </Col>
      </Row>
          </>}
      </Card>
    </Spin>
    </PageContainer>
  );
};

export default UpdateItemreceipt;
