import MyMap from '@/components/MyMap';
import { STORE_TYPE } from '@/utils/constraints';
import ProForm, {
  ProFormDateTimeRangePicker,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-form';
import { Typography } from 'antd';
import React from 'react';

const StoreForm = ({ title = 'Thông tin cửa hàng', store = {}, isUpdateMode }) => {
  const [selectedLocaton, setSelectedLocaton] = React.useState(
    store
      ? {
          lat: +store?.lat,
          lng: +store?.lon,
        }
      : null,
  );

  const handleSelectLocation = React.useCallback(async (location) => {
    setSelectedLocaton(location);
  }, []);

  return (
    <>
      <Typography.Title level={4}>{title}</Typography.Title>
      <ProFormSwitch initialValue={false} name="is_available" label="Trạng thái" />

      <ProForm.Group>
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          placeholder="Vui lòng nhập tên cửa hàng"
          name="name"
          width="s"
          label="Tên cửa hàng"
        />
        <ProFormText
          rules={[
            {
              required: true,
              max: 10,
              message: 'Mã cửa hàng dưới 10 ký tự',
            },
          ]}
          placeholder="Nhập Mã cửa hàng"
          name="store_code"
          label="Mã cửa hàng"
          disabled={isUpdateMode}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText label="Địa chỉ" name="address" width="s" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText name="lat" hidden />
        <ProFormText name="lon" hidden />
      </ProForm.Group>
      <ProForm.Item
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn địa chỉ từ bản đồ',
          },
        ]}
        noStyle
        shouldUpdate
      >
        {(form, ...others) => {
          return (
            <MyMap
              center={selectedLocaton}
              onSelectAddress={(location) => {
                form.setFields([
                  {
                    name: 'lat',
                    value: location.lat,
                  },
                  {
                    name: 'lon',
                    value: location.lng,
                  },
                ]);
                handleSelectLocation(location);
              }}
              onClick={(e) => {
                form.setFields([
                  {
                    name: 'lat',
                    value: e.latLng.lat(),
                  },
                  {
                    name: 'lon',
                    value: e.latLng.lng(),
                  },
                ]);
                handleSelectLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
              }}
            >
              {selectedLocaton && (
                <>
                  <MyMap.MyMarker marker={selectedLocaton} />
                </>
              )}
            </MyMap>
          );
        }}
      </ProForm.Item>
    </>
  );
};

export default StoreForm;
