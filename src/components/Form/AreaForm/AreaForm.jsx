import MyMap from '@/components/MyMap';
import { getAccount } from '@/services/account';
import { STORE_TYPE } from '@/utils/constraints';
import ProForm, {
  ProFormDateTimeRangePicker,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-form';
import { Typography } from 'antd';
import React from 'react';

const AreaForm = ({ updateMode, lat, lon }) => {
  const [selectedLocaton, setSelectedLocaton] = React.useState(
    lat
      ? {
          lat: +lat,
          lng: +lon,
        }
      : null,
  );

  const handleSelectLocation = React.useCallback(async (location) => {
    setSelectedLocaton(location);
  }, []);

  return (
    <>
      <Typography.Title level={4}>Thông tin khu vực</Typography.Title>
      <ProForm.Group>
        <ProFormSelect
          request={() =>
            getAccount({ 'role-type': [ROLE_DATA.PROVIDER] }).then((res) => {
              console.log(`res`, res);
              return res.data?.map(({ staff_id, name }) => ({
                label: name,
                value: staff_id,
              }));
            })
          }
          name="manager_id"
          label="Nguời quản lý"
          width="s"
          disabled={updateMode}
        />
        <ProFormSwitch initialValue={false} name="is_available" label="Trạng thái" />
      </ProForm.Group>
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
          label="Tên khu vực"
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          disabled={updateMode}
          placeholder="Nhập Mã cửa hàng"
          name="store_code"
          label="Mã khu vực"
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText label="Địa chỉ" name="address" width="s" />
        <ProFormText hidden name="lat" width="s" />
        <ProFormText hidden name="lon" width="s" />
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

export default AreaForm;
