import MyMap from '@/components/MyMap';
import request from '@/utils/requestServer';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { InfoWindow, Marker } from '@react-google-maps/api';
import { Typography } from 'antd';
import React from 'react';
import { getLatLng } from 'use-places-autocomplete';

const AreaForm = ({ updateMode = false, showMap = true }) => {
  const [selectedLocaton, setSelectedLocaton] = React.useState(null);

  const handleSelectLocation = React.useCallback(async (location) => {
    setSelectedLocaton(location);
  }, []);

  return (
    <>
      <ProForm.Group>
        <ProFormSelect
          width="md"
          name="c_id"
          disabled={updateMode}
          rules={[
            {
              required: true,
            },
          ]}
          label="Client"
          request={() =>
            request.get('/clients', { prefix: API_BATCH_URL, useCache: true }).then((res) =>
              res.data.map(({ id, name }) => ({
                label: name,
                value: id,
              })),
            )
          }
        />
        <ProFormText name="name" width="md" label="Area Name" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText hidden name="default_lat" width="xs" label="Latitude" />
        <ProFormText hidden name="default_long" width="xs" label="Longtitude" />
      </ProForm.Group>
      {showMap && (
        <ProForm.Item
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn địa chỉ',
            },
          ]}
          noStyle
          shouldUpdate
        >
          {(form, ...others) => {
            console.log('others', others);
            const name = form.getFieldValue('name');
            const error = form.getFieldError('default_lat');
            return (
              <MyMap
                onSelectAddress={(location) => {
                  form.setFields([
                    {
                      name: 'default_lat',
                      value: location.lat,
                    },
                    {
                      name: 'default_long',
                      value: location.lng,
                    },
                  ]);
                  handleSelectLocation(location);
                }}
              >
                {selectedLocaton && (
                  <>
                    <MyMap.MyMarker marker={selectedLocaton} />
                    <InfoWindow position={{ lat: selectedLocaton.lat, lng: selectedLocaton.lng }}>
                      <Typography.Text>{name}</Typography.Text>
                    </InfoWindow>
                  </>
                )}
              </MyMap>
            );
          }}
        </ProForm.Item>
      )}
    </>
  );
};

export default AreaForm;
