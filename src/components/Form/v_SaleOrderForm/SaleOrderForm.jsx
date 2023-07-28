import {
  SelectAssessor,
  SelectCustomer,
  SelectVehicleOwner,
  SelectVehicleSO
} from '@/components/CommonSelect/CommonSelect';
import DynamicField from '@/components/DynamicField';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import { normFile, normalizeImg } from '@/utils/utils';
import { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Col, DatePicker, Input, Row, Select, Switch } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
const { RangePicker } = DatePicker;


const SaleOrderForm = ({readonly = false, update = false, createPage = false,detailPage=false, onCreateIR}) => {

  return (
    <>
      <Row gutter={16}>
      {createPage && <Col xs={4}>
        <FormItem
          label="Trạng thái phiếu bán hàng"
          name="approvalStatus"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
        >
          <Select placeholder="Chọn trạng thái" width={200}>
            <Option value="Open">Tạo mới</Option>
            <Option value="PendingApproval">Gửi duyệt</Option>
          </Select>
        </FormItem>
      </Col>
      }
      <Col xs={24} md={12}>
      <FormItem label="Kích hoạt" name="status" valuePropName="checked">
        <Switch />
      </FormItem>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col xs={12}>
        <FormItem
          label="Khách hàng"
          name="customerId"
          rules={[{ required: true, message: 'Vui lòng chọn khách hàng' }]}
          disabled={update}
        >
          <SelectCustomer
            placeholder="Tìm khách hàng bằng SĐT"
            fetchOnFirst
            style={{
              width: '100%',
            }}
          />
        </FormItem>
      </Col>
      <Col xs={12}>
        <ProFormText
          rules={[
            {
              required: true,
              message: "Tổng giá trị không hợp lệ",
              validator: (_, value) => {
                return (!isNaN(value) && value.match(/^\d+$/) && parseInt(value) >= 1)
                  ? Promise.resolve()
                  : Promise.reject();
              },
            },
          ]}
          label="Tổng giá trị"
          name="totalAmount"
          />
      </Col>
    </Row>
    <Row gutter={24}>
      {/* <Col xs={24}>
        <FormItem
          label="Chọn xe"
          name="vehicleIds"
          rules={[{ required: true, message: 'Vui lòng chọn xe' }]}
          disabled={update}
        >
          <SelectVehicleSO
            placeholder="Tìm kiếm bằng sđt chủ sở hữu..."
            fetchOnFirst
            style={{
              width: '100%',
            }}
            mode="multiple"
          />
        </FormItem>
      </Col> */}
          <Col xs={24}>
            <DynamicField SO={true}/>
          </Col>
    </Row>
    <Row gutter={16}>
      <Col xs={24}>
        <FormItem
          label="Ghi chú"
          name="note"
          rules={[{ required: false}]}
          disabled={update}
        >
          <TextArea placeholder='Nhập ghi chú...'/>
        </FormItem>
      </Col>
    </Row>
  </>
  );
};

export default SaleOrderForm;
