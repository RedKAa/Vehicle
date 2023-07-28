import { ClockCircleOutlined } from '@ant-design/icons';
import { Avatar, Col, Divider, Image, List, Row, Skeleton, Tag } from 'antd';
import Card from 'antd/lib/card/Card';
import Meta from 'antd/lib/card/Meta';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';


const UserCard = ({user, showPhone}) => {
   if(!user) {
      return <></>
   }

   const {address, name, phone, status, email, userName, avatarLink, role } = user;
   let n = name ? name : userName;

  return (
   <Card
      style={{
      width: 250,
      marginTop: 10,
      marginBottom: 10
      }}
   >
      <Meta
         avatar={<Avatar src={avatarLink} />}
         title={n}
         description={showPhone ? phone : email}
      />
   </Card>
    )
  ;
};

const VehicleCard = ({vehicle}) => {
   if(!vehicle) {
      return <></>
   }

  const {assessPrice,IRamount, SOamount, carModel, color, description, fuelType, gearType, imgs, manufacture, manufactureYear, newAt, soldPrice, usage, videos, vehicleImgs } = vehicle;

  let tmpimgs = [];
  console.log('imgs', vehicleImgs)
  if(vehicleImgs && vehicleImgs.length) {
   tmpimgs = [...vehicleImgs];
  }
  return (
   <Row gutter={24} style={{border: '1px solid gray', width:'100%', padding:'20px'}}>
      <Col xs={2.5}>
         <p>Màu sắc&nbsp;</p>
         <p>Nhiên liệu &nbsp;</p>
         <p>Số &nbsp;</p>
         <p>Sản xuất tại &nbsp;
         </p>
         <p>Đã đi &nbsp; </p>
      </Col>
      <Col xs={3}>
         <p><Tag color="green">{color}</Tag></p>
         <p><Tag color="green">{fuelType}</Tag></p>
         <p><Tag color="green">{gearType}</Tag></p>
         <p>
            <Tag color="green">
            {manufacture}</Tag>
         </p>
         <p><Tag color="green">{usage} (Km)</Tag></p>
      </Col>
      <Col xs={2.5}>
         <p>Mua mới &nbsp;
         </p>
         <p>Sản xuất năm &nbsp;
         </p>
         <p>Giá nhập &nbsp;</p>
         <p>Giá bán &nbsp;</p>
         {IRamount && <p>Nhân viên định giá &nbsp;</p>}
         {SOamount && <p>Nhân viên báo giá &nbsp;</p>}
      </Col>
      <Col xs={3}>
         <p>
            <Tag icon={<ClockCircleOutlined />} color="green">
            {newAt ? moment(newAt).format('HH:mm DD-MM-YYYY') : ''}</Tag>
         </p>
         <p>
            <Tag icon={<ClockCircleOutlined />} color="green">
            {manufactureYear ? moment(manufactureYear).format('HH:mm DD-MM-YYYY') : ''}</Tag>
         </p>
         <p><Tag color="green">{assessPrice}</Tag></p>
         <p><Tag color="green">{soldPrice}</Tag></p>
         {IRamount && <p><Tag color="green">{IRamount}</Tag></p>}
         {SOamount && <p><Tag color="green">{SOamount}</Tag></p>}

      </Col>
      <Col xs={12}>
      <div
         id="scrollableDiv"
         style={{
         height: 400,
         overflow: 'auto',
         padding: '0 16px',
         border: '1px solid rgba(140, 140, 140, 0.35)',
         }}
         >
         <InfiniteScroll
         dataLength={tmpimgs.length}
         loader={
            <Skeleton
               avatar
               paragraph={{
               rows: 1,
               }}
               active
            />
         }
         endMessage={<Divider plain>It is all...</Divider>}
         scrollableTarget="scrollableDiv"
         >
         <List
            dataSource={tmpimgs}
            renderItem={(item) => (
               <List.Item key={item}>
               <Image  width={500}
                     src={item}
                  />
               </List.Item>
            )}
         />
         </InfiniteScroll>
      </div>
      </Col>
   </Row>
    )
  ;
};

export {
   UserCard,
   VehicleCard
};
export default UserCard;