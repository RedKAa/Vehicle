import SellerForm from '@/components/Form/SellerForm/SellerForm';
import ResoTable from '@/components/ResoTable/ResoTable';
import { ModalForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import { useRef } from 'react';
import { orderColumn } from './config';
import AccountForm from '@/components/Form/AccountForm/AccountForm';
import OrderItems from '@/components/OrderItems';
import { getAppToken } from '@/utils/utils';


const OrdersPage = ({ history }) => {
  const ref = useRef();
  const [visible, setVisible] = React.useState(false);

  console.log(getAppToken());

  const columns = [
    ...orderColumn,
    {
      title: 'Khách hàng',
      sorter: true,
      dataIndex: 'customer',
      hideInForm: true,
      hideInSearch: true,
      render: (_, { customer }) => (
        <ModalForm
          title="Tài khoản"
          name="account"
          key={`account_${customer.userInfo.userName}`}
          initialValues={customer.userInfo}
          submitter={{
            searchConfig: {
              submitText: 'Ok',
          },
          render: (props, doms) => {
            return [
              // <Button type="primary" key="ok" onClick={() => setVisible(false)}>
              //   Ok
              // </Button>,
            ];
          },
          }}
          trigger={<Button type="link">{customer.customerName}</Button>}
        >
          <AccountForm readonly />
        </ModalForm>
      ),
    },
    {
      title: 'CTV',
      sorter: true,
      dataIndex: 'assignedSeller',
      hideInForm: true,
      hideInSearch: true,
      render: (_, { seller }) => (
        seller && (<ModalForm
          title="CTV"
          name="seller"
          key={`seller_${seller.id}`}
          initialValues={seller}
          trigger={<Button type="link">{seller.sellerName}</Button>}
        >
            <SellerForm readonly />
        </ModalForm>)
      ),
    },
    // {
    //   title: 'Chi tiết đơn hàng',
    //   sorter: true,
    //   dataIndex: 'id',


    //   hideInForm: true,
    //   hideInSearch: true,
    //   render: (_, order) => (
    //     order && (<ModalForm
    //       title="Chi tiết đơn hàng"
    //       name="order"
    //       key={`order_${order.id}`}
    //       initialValues={order}
    //       submitter={{
    //         searchConfig: {
    //           submitText: 'Ok',
    //       }}}
    //       trigger={<Button type="link">Xem {order.orderItems.length} voucher</Button>}
    //     >
    //         <OrderItems orderId={order.id} />
    //     </ModalForm>)
    //   ),
    // },
  ];

  return (
    <PageContainer>
      <ResoTable
        columns={columns}
        scroll={{
          x: 650,
        }}
        rowKey="id"
        resource="orders"
        actionRef={ref}
        isShowSelection={false}
        additionParams={{orderBy: 'createAt-dec'}}
      />
    </PageContainer>
  );
};

export default OrdersPage;
