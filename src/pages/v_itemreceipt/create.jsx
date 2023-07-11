import AsyncButton from '@/components/AsyncButton';
import ItemreceiptForm from '@/components/Form/v_ItemreceiptForm/ItemreceiptForm';
import { createItemreceipt } from '@/services/v_itemreceipt';
import { getCurrentAdminId, getCurrentStaffId } from '@/utils/utils';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Affix,
  Alert,
  Card,
  DatePicker, Form,
  Row,
  Typography
} from 'antd';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useHistory } from 'umi';
const { RangePicker } = DatePicker;

const FormItem = Form.Item;

const CreateItemreceipt = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();

  const [createError, setError] = useState(null);

  const onCreateItemreceipt = () => {
    let staffId = getCurrentStaffId();
    let adminId = getCurrentAdminId();
    return form.validateFields()
    .then((itemreceipt) => {
      let tls = [];
      const normalizedData = { ...itemreceipt,
        status: itemreceipt.status ? 'Active' : 'Disable'
      };
      if(staffId) {normalizedData.staffId = staffId}
      return createItemreceipt(normalizedData);
    })
    .then(() => {
      history.replace('/itemreceipts/');
    })
    .catch((err) => {
      // setError(err);
      // console.log(createError);
      history.replace('/itemreceipts/');
    })
  };

  return (
    <PageContainer>
      {createError && <Alert message={'Dữ liệu không hợp lệ'} type="warning" closable />}
      <Card bordered={false}>
        <Form
          layout="vertical"
          onFinish={(values) => console.log('Create Itemreceipt', values)}
          name="create-itemreceipt-form"
          form={form}
          scrollToFirstError
        >
          <Row justify="space-between">
            <Typography.Title level={3}>Thông tin Phiếu nhập</Typography.Title>
            <Affix offsetTop={5}>
              <AsyncButton
                title="Tạo"
                onClick={onCreateItemreceipt}
                btnProps={{ type: "primary"}}
                htmlType="submit"
              />
            </Affix>
          </Row>
          <ItemreceiptForm createPage/>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default CreateItemreceipt;
