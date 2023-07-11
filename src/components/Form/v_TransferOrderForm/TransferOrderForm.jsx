import {
  SelectAssessor,
  SelectCustomer,
  SelectVehicle,
  SelectVehicleOwner,
  SelectWarehouse
} from '@/components/CommonSelect/CommonSelect';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import { normFile, normalizeImg } from '@/utils/utils';
import { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Col, DatePicker, Input, Row, Select, Switch } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
const { RangePicker } = DatePicker;


const TransferOrderForm = ({readonly = false, update = false, createPage = false,detailPage=false, onCreateIR}) => {

  return (
    <>
      <Row gutter={16}>
      {createPage && <Col xs={4}>
        <FormItem
          label="Trạng thái phiếu xuất kho"
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
      <Col xs={24}>
        <FormItem
          label="Chọn xe"
          name="vehicleIds"
          rules={[{ required: true, message: 'Vui lòng chọn xe' }]}
          disabled={update}
        >
          <SelectVehicle
            placeholder="Tìm kiếm bằng sđt chủ sở hữu..."
            fetchOnFirst
            style={{
              width: '100%',
            }}
            mode="multiple"
          />
        </FormItem>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col xs={12}>
        <FormItem
          label="Từ kho"
          name="fromLocationId"
          rules={[{ required: true, message: 'Vui lòng chọn kho xuất xe' }]}
          disabled={update}
        >
          <SelectWarehouse
            placeholder="Tìm kho bằng tên"
            fetchOnFirst
            style={{
              width: '100%',
            }}
          />
        </FormItem>
      </Col>
      <Col xs={12}>
        <FormItem
          label="Địa chỉ kho xuất"
          name="FromLocationAddress"
          rules={[{ required: true}]}
          disabled={update}
        >
          <TextArea placeholder='Nhập địa chỉ...'/>
        </FormItem>
      </Col>
    </Row>
    
    <Row gutter={16}>
      <Col xs={12}>
      <FormItem
          label="Đến kho(nếu có)"
          name="toLocationId"
          rules={[{ required: false}]}
          disabled={update}
      >
          <SelectWarehouse
            placeholder="Tìm kho bằng tên"
            fetchOnFirst
            style={{
              width: '100%',
            }}
          />
        </FormItem>
      </Col>
      <Col xs={12}>
        <FormItem
          label="Địa chỉ nhận"
          name="toLocationAddress"
          rules={[{ required: true}]}
          disabled={update}
        >
          <TextArea placeholder='Nhập địa chỉ...'/>
        </FormItem>
      </Col>
    </Row>
  </>
  );
};

export default TransferOrderForm;
