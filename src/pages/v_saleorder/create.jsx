import AsyncButton from '@/components/AsyncButton';
import SaleOrderForm from '@/components/Form/v_SaleOrderForm/SaleOrderForm';
import { createSaleorder } from '@/services/v_saleorder';
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

const CreateSaleOrder = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();

  const [createError, setError] = useState(null);

  const onCreateSaleOrder = () => {
    let staffId = getCurrentStaffId();
    let adminId = getCurrentAdminId();
    return form.validateFields()
    .then((saleorder) => {
      let tls = [];
      for (let i = 0; i <saleorder.vehicleIds; i++) {
        tls.push({
          "status": "Active",
          "vehicleId": saleorder.vehicleIds[i],
          "wareHouseId": null,
          "picId": null,
          "amount": 0,
          "note": ""
        })
      }

      const normalizedData = { ...saleorder,
        status: saleorder.status ? 'Active' : 'Disable',
        transaction: {
          transactionName: "Phiếu bán hàng",
          transactionType: "SO",
          totalAmount: saleorder.totalAmount,
          transactionLines: [
            ...tls
          ]
        }
      };
      return createSaleorder(normalizedData);
    })
    .then(() => {
      history.replace('/saleorders/');
    })
    .catch((err) => {
      // setError(err);
      // console.log(createError);
      history.replace('/saleorders/');
    })
  };

  return (
    <PageContainer>
      {createError && <Alert message={'Dữ liệu không hợp lệ'} type="warning" closable />}
      <Card bordered={false}>
        <Form
          layout="vertical"
          onFinish={(values) => console.log('Create SaleOrder', values)}
          name="create-saleorder-form"
          form={form}
          scrollToFirstError
        >
          <Row justify="space-between">
            <Typography.Title level={3}>Thông tin Phiếu bán hàng</Typography.Title>
            <Affix offsetTop={5}>
              <AsyncButton
                title="Tạo"
                onClick={onCreateSaleOrder}
                btnProps={{ type: "primary"}}
                htmlType="submit"
              />
            </Affix>
          </Row>
          <SaleOrderForm createPage/>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default CreateSaleOrder;
