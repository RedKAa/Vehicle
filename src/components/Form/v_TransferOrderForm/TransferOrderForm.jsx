import {
  SelectItemReceipt,
  SelectSaleOrder,
  SelectWarehouse
} from '@/components/CommonSelect/CommonSelect';
import { Col, DatePicker, Row, Select, Switch } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
const { RangePicker } = DatePicker;


const TransferOrderForm = ({readonly = false, update = false, createPage = false, detailPage=false, onCreateIR, IRmode, SOmode}) => {

  return (
    <>
      <Row gutter={16}>
      {createPage && IRmode && <Col xs={4}>
        <FormItem
          label="Trạng thái phiếu nhập kho"
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
      {IRmode && <Col xs={24}>
        <FormItem
          label="Chọn phiếu nhập xe"
          name="itemReceiptId"
          rules={[{ required: true, message: 'Vui lòng chọn phiếu nhập xe' }]}
          disabled={update}
        >
          <SelectItemReceipt
            placeholder="Tìm kiếm id..."
            fetchOnFirst
            style={{
              width: '100%',
            }}
          />
        </FormItem>
      </Col>
      }
      {SOmode && <Col xs={24}>
        <FormItem
          label="Chọn phiếu bán hàng"
          name="saleOrderId"
          rules={[{ required: true, message: 'Vui lòng chọn phiếu bán hàng' }]}
          disabled={update}
        >
          <SelectSaleOrder
            placeholder="Tìm kiếm id..."
            fetchOnFirst
            style={{
              width: '100%',
            }}
          />
        </FormItem>
      </Col>
      }
    </Row>
    {IRmode && <Row gutter={24}>
      <Col xs={12}>
        <FormItem
          label="Nhập từ địa chỉ"
          name="FromLocationAddress"
          rules={[{ required: false}]}
          disabled={update}
        >
          <TextArea placeholder='Nhập địa chỉ...'/>
        </FormItem>
      </Col>
     <Col xs={12}>
        <FormItem
            label="Đến kho"
            name="toLocationId"
            rules={[{ required: true, message: 'Vui lòng chọn kho nhập xe' }]}
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
      
    </Row>
    }
    {SOmode && <Row gutter={16}>
      <Col xs={12}>
        <FormItem
          label="Đến địa địa chỉ"
          name="toLocationAddress"
          rules={[{ required: false}]}
          disabled={update}
        >
          <TextArea placeholder='Nhập địa chỉ...'/>
        </FormItem>
      </Col>
      <Col xs={12}>
        <FormItem
            label="Từ kho"
            name="FromLocationId"
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
      
    </Row>
    }
  </>
  );
};

export default TransferOrderForm;
