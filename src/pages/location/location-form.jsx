import MyMap from '@/components/MyMap';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import React from 'react';

const LocationForm = ({ location }) => {
  const [selectedLocaton, setSelectedLocaton] = React.useState(
    location
      ? {
          lat: +location?.lat,
          lng: +location?.long,
        }
      : null,
  );

  const handleSelectLocation = React.useCallback(async (location) => {
    setSelectedLocaton(location);
  }, []);

  return (
    <div>
      <ProForm.Group>
        <ProFormText
          name="code"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập code',
            },
          ]}
          label="Code"
          width="md"
        />
        <ProFormText
          name="address"
          label="Tên nơi nhận"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên địa chỉ',
            },
          ]}
          width="md"
        />
        <ProFormText hidden name="lat" placeholder="Kinh độ" width="xs" />
        <ProFormText hidden name="long" placeholder="Vĩ độ" width="xs" />
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
                    name: 'long',
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
                    name: 'long',
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
    </div>
  );
};

export default LocationForm;
