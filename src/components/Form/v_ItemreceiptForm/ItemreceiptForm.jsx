import {
  SelectAssessor,
  SelectVehicle,
  SelectVehicleOwner
} from '@/components/CommonSelect/CommonSelect';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import { normFile, normalizeImg } from '@/utils/utils';
import { Col, DatePicker, Row, Select, Switch } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
const { RangePicker } = DatePicker;


const ItemreceiptForm = ({readonly = false, update = false, createPage = false,detailPage=false, onCreateIR}) => {

  return (
    <>
      <Row gutter={16}>
      {createPage && <Col xs={4}>
        <FormItem
          label="Trạng thái phiếu nhập"
          name="itemReceiptStatus"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
        >
          <Select placeholder="Chọn trạng thái" width={200}>
            <Option value="VehicleOwnerOpen">Tạo mới</Option>
            <Option value="WaitingForAssessment">Đợi thẩm định</Option>
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
    <Row gutter={16}>
      <Col xs={12}>
        <FormItem
          label="Chủ sở hữu"
          name="VehicleOwnerId"
          rules={[{ required: true, message: 'Vui lòng chọn chủ sở hữu' }]}
          disabled={update}
        >
          <SelectVehicleOwner
            placeholder="Tìm chủ sở hữu bằng SĐT"
            fetchOnFirst
            style={{
              width: '100%',
            }}
          />
        </FormItem>
      </Col>
      {(createPage || detailPage) && <Col xs={12}>
        <FormItem
          label="Thẩm định viên"
          name="assessorId"
          rules={[{ required: update ? true : false, message: 'Chọn thẩm định viên' }]}
          readonly={detailPage}
        >
          <SelectAssessor
            placeholder="Tìm kiếm địa chỉ"
            fetchOnFirst
            style={{
              width: '100%',
            }}
          />
        </FormItem>
      </Col>}
    </Row>
    {!createPage && <Row gutter={24}>
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
    </Row>}
    <Row gutter={16}>
      <Col xs={24}>
        <FormItem
          label="Yêu cầu"
          name="request"
          rules={[{ required: true, message: 'Vui lòng nhập yêu cầu khởi tạo' }]}
          disabled={update}
        >
          <TextArea placeholder='Nhập yêu cầu của chủ sở hữu...'/>
        </FormItem>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <FormItem
          name="img"
          label="Ảnh xe"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          normalize={normalizeImg}
        >
          <ImageUploader style={{ height: '100%' }} />
        </FormItem>
      </Col>
    </Row>
  </>
  );
};

export default ItemreceiptForm;
