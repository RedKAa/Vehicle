import AsyncButton from '@/components/AsyncButton';
import TransferOrderForm from '@/components/Form/v_TransferOrderForm/TransferOrderForm';
import { createTransferorder } from '@/services/v_transferorder';
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

const CreateTransferOrderIR = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();

  const [createError, setError] = useState(null);

  const onCreateTransferOrder = () => {
    return form.validateFields()
    .then((transferorder) => {
      let tls = [];
      // for (let i = 0; i < transferorder.vehicleIds.length; i++) {
      //   tls.push({
      //     "status": "Active",
      //     "vehicleId": transferorder.vehicleIds[i],
      //     "wareHouseId": null,
      //     "picId": null,
      //     "amount": 0,
      //     "note": ""
      //   })
      // }

      const normalizedData = { ...transferorder,
        ToLocationAddress: null,
        fromLocationId: null,
        transferOrderType: "In",
        status: transferorder.status ? 'Active' : 'Disable',
        transaction: {
          transactionName: "Phiếu nhập kho",
          transactionType: "IR",
          totalAmount: 0,
          transactionLines: [
            ...tls
          ]
        }
      };
      return createTransferorder(normalizedData)
    })
    .then(() => {
      // history.replace('/transferorders/')
    })
    .catch((err) => {
      setError(err);
      console.log(createError);
      // history.replace('/transferorders/')
    })
  };

  return (
    <PageContainer>
      {createError && <Alert message={'Có lỗi xảy ra...'} type="warning" closable />}
      <Card bordered={false}>
        <Form
          layout="vertical"
          onFinish={(values) => console.log('Create TransferOrder', values)}
          name="create-transferorder-form"
          form={form}
          scrollToFirstError
        >
          <Row justify="space-between">
            <Typography.Title level={3}>Thông tin Phiếu nhập kho</Typography.Title>
            <Affix offsetTop={5}>
              <AsyncButton
                title="Tạo"
                onClick={onCreateTransferOrder}
                btnProps={{ type: "primary"}}
                htmlType="submit"
              />
            </Affix>
          </Row>
          <TransferOrderForm createPage IRmode/>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default CreateTransferOrderIR;
