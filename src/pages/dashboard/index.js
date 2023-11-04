import { PageContainer } from '@ant-design/pro-layout';
import {
  Typography,
  Form,
  Avatar,
  Card,
  Col,
  List,
  Skeleton,
  Row,
  Statistic,
  Radio,
  Space,
  Button,
  Divider,
} from 'antd';
import { Link, useHistory, useIntl } from 'umi';
import React, { useState, useEffect, useRef } from 'react';
import AsyncButton from '@/components/AsyncButton';
import { SelectStore } from '@/components/CommonSelect/CommonSelect';
import { getStore, syncProductOfStore, syncPromotionOfStore } from '@/services/store';
import { getCurrentStore } from '@/utils/utils';
import { ARTICLE_TYPE_DATA } from '@/utils/constraints';
import { changeArticleType } from '@/services/article';
import { PlusOutlined } from '@ant-design/icons';
import MyMap from '@/components/MyMap';
import { Marker } from 'react-google-maps';
import LocationInput from '@/components/LocationInput';

const PageHeaderContent = ({ currentUser, formatMessage }) => {
  const loading = currentUser && Object.keys(currentUser).length;

  const history = useHistory();

  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }

  return (
    <>
      <Row gutter={{ xs: 4, md: 8 }}>
        <Col>
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            src={currentUser.avatar}
          />
        </Col>
        <Col>
          <div>
            <Typography.Title level={3}>
              {formatMessage({ id: 'dashboard.hello' })}, {currentUser.name}!
            </Typography.Title>
          </div>
          <div>
            <Typography.Text type="secondary">
              {currentUser.title} | {currentUser.group}
            </Typography.Text>
          </div>
        </Col>
      </Row>
      <Space style={{ marginTop: 10 }} direction="horizontal">
        <Link to="/product/create">Thêm voucher</Link>
        <Divider type="vertical" />
        <Link to="blog-post/create">Thêm Bài viết</Link>
      </Space>
    </>
  );
};

const DashBoard = (props) => {
  const { formatMessage } = useIntl();
  const {
    currentUser = {
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      name: 'Admin',
      title: formatMessage({
        id: 'dashboard.position',
      }),
      group: 'FptBlog',
    },
  } = props;

  const [selectedLocations, setSelectedLocations] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState({
    latLng: {
      lat: 10.845444810788182,
      lng: 106.79242902627408,
    },
    address: '',
  });

  const currentStoreId = getCurrentStore();

  const [form] = Form.useForm();

  useEffect(() => {
    getStore({ param: { id: currentStoreId, useCache: false } }).then((res) => {
      if (Array.isArray(res?.data))
        form?.setFieldsValue({ articleType: res?.data[0]?.current_article_type });
    });
  }, [currentStoreId]);

  return <PageContainer></PageContainer>;
};

export default DashBoard;
